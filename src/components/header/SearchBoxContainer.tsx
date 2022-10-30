import { useDialog } from "@Lib/contexts/UIContext";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { ProductComponentType } from "src/types/shared";
import { useDebounce } from "@Lib/hooks/useDebounce";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const SearchBox = dynamic(() => import("./SearchBox"), {
  suspense: true,
});

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

  if (!active) return null;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchBox
        searchTerm={searchTerm}
        products={products}
        setDialog={() => setDialog(null)}
        searchChangedHandler={searchChangedHandler}
      />
    </Suspense>
  );
}
