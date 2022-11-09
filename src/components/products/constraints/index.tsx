import { useRouter } from "next/router";
import BreadCrumbs from "../BreadCrumbs";
import ConstraintButtons from "./ConstraintButtons";

export default function Constraints({
  allProductsCount,
  currentProductsCount,
  isSearch
}: {
  allProductsCount: number;
  currentProductsCount: number;
  isSearch?: boolean;
}) {
  const router = useRouter();
  const {
    categoryId,
    search,
    offset = 0,
    colorways,
    sizes,
    height,
    price,
  } = router.query;

  return (
    <div className="constraints">
      <div className="constraints__container">
        { !isSearch ? <BreadCrumbs /> : null }
        <hr className="constraints__hr" />
        <h1 className="constraints__title">{isSearch ? <>&ldquo;{search}&rdquo;</> : categoryId}</h1>
        {currentProductsCount ? (
          <p className="constraints__summary">
            Showing <strong>{Number(offset) + 1}</strong> &mdash;{" "}
            <strong>{Number(offset) + currentProductsCount}</strong> of{" "}
            <strong>{allProductsCount}</strong> results
          </p>
        ) : (
          <p>
            <strong>Nothing Found!</strong>
          </p>
        )}
        <div className="constraints__filters">
          <ConstraintButtons
            paramName="Colorway"
            items={Array.isArray(colorways) ? colorways : [colorways || ""]}
          />
          <ConstraintButtons
            paramName="Size"
            items={Array.isArray(sizes) ? sizes : [sizes || ""]}
          />
        </div>
      </div>
    </div>
  );
}
