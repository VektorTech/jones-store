import { useState, ReactNode } from "react";
import { IoIosArrowUp } from "react-icons/io";

export default function FilterHeaderParam({
  type,
  children,
}: {
  type: string;
  children: ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="filter__param">
      <div
        className={
          "filter__param-section" +
          (collapsed ? " filter__param-section--collapsed" : "")
        }
      >
        <span
          onClick={() => setCollapsed(!collapsed)}
          className="filter__param-type"
        >
          <span>{type}</span>
          <IoIosArrowUp />
        </span>
        <div className="filter__param-body">{children}</div>
      </div>
    </div>
  );
}
