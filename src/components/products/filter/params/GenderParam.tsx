import Link from "next/link";
import FilterHeaderParam from "../FilterHeaderParam";

export default function GenderParam({ current }: { current?: string; }) {
  return (
    <FilterHeaderParam type="Gender">
      {["men", "women", "kids", "baby", "unisex"].map((gender) => (
        <p
          className={
            "filter-param__link" +
            (gender == current ? " filter-param__link--active" : "")
          }
          key={gender}
        >
          <Link href={`/category/${gender}`}>
            <a>{gender.toUpperCase()}</a>
          </Link>
        </p>
      ))}
    </FilterHeaderParam>
  );
}
