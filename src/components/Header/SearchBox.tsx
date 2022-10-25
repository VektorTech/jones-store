import { VscChromeClose } from "react-icons/vsc";
import { FiSearch } from "react-icons/fi";
import Product from "@Components/common/Product";
import { ProductComponentType } from "src/types/shared";
import { ChangeEventHandler } from "react";

export default function SearchBox({
  setDialog,
  searchTerm,
  searchChangedHandler,
  products,
}: {
  setDialog: () => void;
  searchTerm: string;
  searchChangedHandler: ChangeEventHandler<HTMLInputElement>;
  products: ProductComponentType[];
}) {
  return (
    <div className="search">
      <button className="search__close" onClick={() => setDialog()}>
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
              placeholder="Search Jones Store for..."
              onChange={searchChangedHandler}
              value={searchTerm}
            />
            <label htmlFor="search-input" className="input__placeholder">
              Search Jones Store for...
            </label>
            <button className="input__submit" type="submit">
              <FiSearch className="input__submit-icon" />
            </button>
          </form>
        </div>
        <div className="search__trends">
          <span className="search__trends-title">Popular Searches:</span>
          <button className="search__trends-tag">og high</button>
          <button className="search__trends-tag">shadow</button>
          <button className="search__trends-tag">black toe</button>
        </div>
        <h3 className="search__results-info">5 Jordans Found</h3>
        <div className="search__results">
          {products.map((product) => (
            <Product key={product.id} small {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
