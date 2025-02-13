import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


function AdminBtn({ text, color, productId, onDelete }) {
	const [showModal, setShowModal] = useState(false);

	function confirmDelete() {
		axios
			.delete(`https://salesprogrow.com/products/${productId}`)
			.then(() => {
				if (onDelete) onDelete(productId);
				setShowModal(false);
			})
			.catch((err) => console.log(err));
	}

	return (
		<>
			{text === "Update" ? (
				<Link to={`/products/update/${productId}`} className={`btn btn-${color}`}>
					{text}
				</Link>
			) : (
				<>
					<button className={`btn btn-${color}`} onClick={() => setShowModal(true)}>
						{text}
					</button>

					<div className={`modal fade ${showModal ? "show d-block" : ""}`} tabIndex="-1" role="dialog">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title">Confirm Deletion</h5>
									<button type="button" className="close" onClick={() => setShowModal(false)}>
										<span>&times;</span>
									</button>
								</div>
								<div className="modal-body">
									<p>Are you sure you want to delete this product?</p>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
										Cancel
									</button>
									<button type="button" className="btn btn-danger" onClick={confirmDelete}>
										Delete
									</button>
								</div>
							</div>
						</div>
					</div>
					{showModal && <div className="modal-backdrop fade show"></div>}
				</>
			)}
		</>
	);
}

export default AdminBtn;
