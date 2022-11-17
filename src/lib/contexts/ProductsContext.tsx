import type { ProductComponentType } from "src/types/shared";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";

import { HIGHEST_PRICE } from "@Lib/constants";

export interface filterStateType {
  gender: string;
  color: string[];
  size: number[];
  height: string[];
  price: [number, number];
  year: number[];
}
export type filterStateKeys = keyof filterStateType;

const _filterState: filterStateType = {
  gender: "",
  color: [],
  size: [],
  height: [],
  price: [0, HIGHEST_PRICE] as [number, number],
  year: [],
};

const ProductsState: {
  products: ProductComponentType[];
  filterState: filterStateType;
  sortBy: string;
  filterListings: (action: { [type: string]: unknown }) => void;
  sortListings: (sortBy: string) => void;
  clearFilters: () => void;
} = {
  products: [],
  filterState: _filterState,
  sortBy: "",
  filterListings: () => null,
  sortListings: () => null,
  clearFilters: () => null,
};

const getGenderPredicate =
  (gender: string) => (product: ProductComponentType) =>
    product.gender == gender;

const getColorPredicate =
  (colors: string[]) => (product: ProductComponentType) =>
    colors.includes(product.color);

const getSizesPredicate =
  (sizes: number[]) => (product: ProductComponentType) =>
    sizes.some((size) => product.sizes.includes(Number(size)));

const getHeightPredicate =
  (height: string[]) => (product: ProductComponentType) =>
    height.includes(product.type);

const getPricePredicate =
  ([minPrice, maxPrice]: [minPrice: number, maxPrice: number]) =>
  (product: ProductComponentType) => {
    if (maxPrice >= HIGHEST_PRICE) {
      return product.price >= minPrice;
    }
    return product.price >= minPrice && product.price <= maxPrice;
  };

const getYearPredicate = (years: number[]) => (product: ProductComponentType) =>
  years.includes(product.year ?? new Date().getFullYear());

interface FilterPredicateType<T> {
  (value: T, index: number, array: T[]): boolean | unknown;
}
const compose = <T extends unknown>(...predicates: FilterPredicateType<T>[]) =>
  predicates.reduceRight<FilterPredicateType<T>>(
    (acc, current) => (value, index, array) =>
      acc(value, index, array) && current(value, index, array),
    () => true
  );

const actions: { [type: string]: Function } = {
  gender: getGenderPredicate,
  color: getColorPredicate,
  size: getSizesPredicate,
  height: getHeightPredicate,
  price: getPricePredicate,
  year: getYearPredicate,
};

const ProductsContext = createContext(ProductsState);

export const useProductsState = () => useContext(ProductsContext);

function ProductsProvider(
  {
    products,
    children,
    preFilter = {},
  }: {
    products: ProductComponentType[];
    children: ReactNode;
    preFilter?: Partial<filterStateType>;
  },
  ref: any
) {
  const filterState = useRef<filterStateType>({
    ..._filterState,
    ...preFilter,
  });
  const sortByRef = useRef("");
  let params = new URLSearchParams();

  const getFilteredListings = () => {
    params = new URLSearchParams();
    const combinedPredicates = compose<ProductComponentType>(
      ...Object.keys(filterState.current).map((type) => {
        const value =
          filterState.current[type as keyof typeof filterState.current];
        if (type != "gender") {
          if (Array.isArray(value)) {
            if (type == "price") {
              params.append("min_price", value[0].toString());
              params.append("max_price", value[1].toString());
            } else
              value.forEach((value) => params.append(type, value.toString()));
          } else {
            params.append(type, (value as string).toString());
          }
        }
        if (value && value.length) {
          return actions[type](value);
        }
        return () => true;
      })
    );

    return products.filter(combinedPredicates);
  };

  const filterListings = (action: { [type: string]: unknown }) => {
    filterState.current = { ...filterState.current, ...action };
    setProductListing(getFilteredListings());

    window.history.replaceState(
      null,
      "",
      `/category/${filterState.current.gender.toLowerCase()}?${params.toString()}`
    );
  };

  const clearFilters = () => {
    filterState.current = _filterState;
    setProductListing(products);
    window.history.replaceState(
      null,
      "",
      `/category/${filterState.current.gender.toLowerCase()}`
    );
  };

  const sortListings = (sortBy: string) => {
    sortByRef.current = sortBy;

    let compare: (
      a: ProductComponentType,
      b: ProductComponentType
    ) => number = (aProduct, bProduct) =>
      new Date(bProduct.dateAdded).valueOf() -
      new Date(aProduct.dateAdded).valueOf();
    if (sortBy == "asc_price") {
      compare = (aProduct, bProduct) => aProduct.price - bProduct.price;
    } else if (sortBy == "price") {
      compare = (aProduct, bProduct) => bProduct.price - aProduct.price;
    } else if (sortBy == "asc_ratings") {
      compare = (aProduct, bProduct) => aProduct.ratings - bProduct.ratings;
    } else if (sortBy == "ratings") {
      compare = (aProduct, bProduct) => bProduct.ratings - aProduct.ratings;
    } else if (sortBy == "year_new") {
      compare = (aProduct, bProduct) =>
        (bProduct.year ?? 0) - (aProduct.year ?? 0);
    } else if (sortBy == "year_old") {
      compare = (aProduct, bProduct) =>
        (aProduct.year ?? 0) - (bProduct.year ?? 0);
    }

    setProductListing((listings) => [...listings].sort(compare));
  };

  const [productListing, setProductListing] = useState(getFilteredListings());

  useImperativeHandle(ref, () => ({
    updateFilterState: (preFilter: Partial<filterStateType>) => {
      filterState.current = {
        ..._filterState,
        ...preFilter,
      };
      sortByRef.current = "";
      setProductListing(getFilteredListings());
    },
  }));

  return (
    <ProductsContext.Provider
      value={{
        products: productListing,
        filterListings,
        sortListings,
        clearFilters,
        filterState: filterState.current,
        sortBy: sortByRef.current,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export default forwardRef(ProductsProvider);
