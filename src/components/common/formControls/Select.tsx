import { useState } from "react";

export default function Select({
	label = "Select Option",
	options,
	className,
	...inputProps
  }: { options: string[]; label?: string } & JSX.IntrinsicElements["input"]) {
	const [value, setValue] = useState("");
	const [collapsed, setCollapsed] = useState(true);

	return (
		<div className="select">
			<input {...inputProps} onClick={(e) => {
				e.preventDefault();
				setCollapsed(!collapsed);
			}} type="text" value={value} placeholder={label} />

			<div className={`select__options${ collapsed ? " select__options--collapsed" : ""}`}>
				<ul className="select__list">
					{
						options.map(option =>
							<li
								onClick={() => setValue(option)}
								key={option}
								className="select__item"
								>
								{option}
							</li>
						)
					}
				</ul>
			</div>
		</div>
	);
}