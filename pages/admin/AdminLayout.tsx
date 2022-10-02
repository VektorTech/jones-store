import Link from "next/link";
import { ReactElement } from "react";

export default function AdminLayout({ children }: { children: ReactElement }) {
	return (
		<div className="admin__dashboard">
			<div className="admin__sidebar">
				<nav>
					<ul>
						<li>
							<Link href="/admin/add-jordan-one"><a>Add Jordan</a></Link>
						</li>
					</ul>
				</nav>
			</div>
			<div className="admin__panel">{children}</div>
		</div>
	);
}