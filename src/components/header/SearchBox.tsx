import { useDialog } from "@Lib/contexts/UIContext";
import { useEffect, useRef, useState } from "react";
import { ProductComponentType } from "src/types/shared";
import { useDebounce } from "@Lib/hooks/useDebounce";
import { FiSearch } from "react-icons/fi";
import { VscChromeClose } from "react-icons/vsc";
import Product from "@Components/common/Product";

export default function SearchBoxContainer() {
  const { currentDialog, setDialog } = useDialog();
  const active = currentDialog == "SEARCH_BOX";

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<
    ProductComponentType[] | Array<never>
  >([]);
  const address = useRef(typeof location == "object" ? location.href : null);

  const searchChangedHandler = (value: string) => {
    setSearchTerm(value);
  };

  useDebounce(
    () => {
      if (active) {
        fetch(`${location.origin}/api/products/search?q=${searchTerm}&limit=5`)
          .then((res) => res.json())
          .then((res) => setProducts(res.data || []))
          .catch(console.log);
      }
    },
    500,
    [active, searchTerm]
  );

  useEffect(() => {
    if (active) {
      window.history.replaceState(null, "", `/search?q=${searchTerm}`);
    } else {
      window.history.replaceState(null, "", address.current);
    }
  }, [searchTerm, active]);

  return (
    <div className={"search" + (active ? " search--active" : "")}>
      <button className="search__close" onClick={() => setDialog(null)}>
        <VscChromeClose className="search__close-icon" />
      </button>
      <div className="search__container">
        <h3 className="search__title">What are you looking for?</h3>

        <div className="search__input input input--bottom">
          <form action={`?q=${searchTerm}`}>
            <input
              id="search-input"
              className="input__box"
              type="text"
              name="search"
              placeholder="Searching for..."
              onChange={(e) => searchChangedHandler(e.currentTarget.value)}
              value={searchTerm}
            />
            <label htmlFor="search-input" className="input__placeholder">
              Searching for...
            </label>
            <button className="input__submit" type="submit">
              <FiSearch className="input__submit-icon" />
            </button>
          </form>
        </div>
        <div className="search__trends">
          <span className="search__trends-title">Popular Searches:</span>
          <button
            onClick={() => searchChangedHandler("mocha")}
            className="search__trends-tag"
          >
            mocha
          </button>
          <button
            onClick={() => searchChangedHandler("bred")}
            className="search__trends-tag"
          >
            bred
          </button>
          <button
            onClick={() => searchChangedHandler("retro")}
            className="search__trends-tag"
          >
            retro
          </button>
        </div>
        <h3 className="search__results-info">{products.length} Jordans Found</h3>
        <div className="search__results">
          {products.map((product) => (
            <Product key={product.id} small {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
