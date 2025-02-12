
function Feedback({ isValid, errorName, value }) {
	if (value === "" && isValid) {
		return null;
	}

	return (
		<div>
			<div className={`valid-feedback ${isValid ? "d-block" : "d-none"}`}>
				Looks good!
			</div>
			<div className={`invalid-feedback ${!isValid ? "d-block" : "d-none"}`}>
				{errorName}
			</div>
		</div>
	);
}

export default Feedback;

