import Feedback from "./Feedback";


function TextInput({ handleForm, label, name, error, value, placeholder, type, formType }) {
	return (
		<>
			<div className="mb-3">
				<label htmlFor={name} className="form-label">{label}</label>
				{	
					type === "textArea" ?
						<textarea
							className="form-control"
							id={name}
							name={name}
							value={value}
							onChange={handleForm}
							rows="3"
						/>
					:
					<input
						type={type === "text" ? "text" : "number"}
						className="form-control"
						id={name}
						name={name}
						value={value}
						onChange={handleForm}
						placeholder={placeholder}
					/>
				}

				<Feedback isValid={!error} errorName={error} value={value} />
			</div>
		</>
	);
}


export default TextInput;
