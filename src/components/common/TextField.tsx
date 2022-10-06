export default function TextField({ label, className, ...inputProps }: { label: string, className?: string } & JSX.IntrinsicElements["input"]) {
	return (
		<div className={`text-input${className ? " " + className : ""}`}>
			<label className="text-input__label">
				<span className="text-input__label-text">{label}</span>
				<input className="text-input__control" {...inputProps} />
			</label>
		</div>
	);
}