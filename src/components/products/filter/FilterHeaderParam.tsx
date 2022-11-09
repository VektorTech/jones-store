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
    <div className="filter-param">
      <div
        className={
          "filter-param__section" +
          (collapsed ? " filter-param__section--collapsed" : "")
        }
      >
        <span
          onClick={() => setCollapsed(!collapsed)}
          className="filter-param__type"
        >
          <span>{type}</span>
          <IoIosArrowUp />
        </span>
        <div className="filter-param__body">{children}</div>
      </div>
    </div>
  );
}
