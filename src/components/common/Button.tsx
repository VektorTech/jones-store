import { ReactElement } from "react";

export default function Button({ children }: { children: ReactElement }) {
	return (
		<div className="button">
			<button className="button__element">{children}</button>
		</div>
	);
}