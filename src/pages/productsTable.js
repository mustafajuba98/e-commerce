import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminBtn from "../components/AdminBtn";

function ProductsTable() {
	const [productsList, setProductsList] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 10;
	const history = useHistory();

	useEffect(() => {
		const loginSession = JSON.parse(localStorage.getItem("loginSession"));
		if (!loginSession || !loginSession.isAdmin) {
			history.push("/login");
			return;
		}

		axios
			.get("https://salesprogrow.com/products/")
			.then((response) => setProductsList(response.data))
			.catch((err) => console.log(err));
	}, [history]);

	function handleProductDelete(productId) {
		setProductsList((prevList) => prevList.filter((product) => product.id !== productId));
	}

	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = productsList.slice(indexOfFirstProduct, indexOfLastProduct);

	const totalPages = Math.ceil(productsList.length / productsPerPage);
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div className="container p-5">
			<div className="row">
				<div className="table-responsive">
					<Link to="/products/create" className="btn btn-outline-primary mb-3">
						Add New Product
					</Link>
					<table className="table table-striped">
						<thead>
							<tr>
								<th scope="col">Name</th>
								<th scope="col">Price</th>
								<th scope="col">Category</th>
								<th scope="col">Update</th>
								<th scope="col">Delete</th>
							</tr>
						</thead>
						<tbody>
							{currentProducts.map((product) => (
								<tr key={product.id}>
									<td>
										<Link to={`/products/${product.id}`}>{product.title}</Link>
									</td>
									<td>{product.price}$</td>
									<td>{product.category}</td>
									<td>
										<AdminBtn text="Update" color="success" productId={product.id} />
									</td>
									<td>
										<AdminBtn text="Delete" color="danger" productId={product.id} onDelete={handleProductDelete} />
									</td>
								</tr>
							))}
						</tbody>
					</table>

					<nav>
						<ul className="pagination justify-content-center">
							<li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
								<button className="page-link" onClick={() => paginate(currentPage - 1)}>
									Previous
								</button>
							</li>
							{Array.from({ length: totalPages }, (_, i) => (
								<li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
									<button className="page-link" onClick={() => paginate(i + 1)}>
										{i + 1}
									</button>
								</li>
							))}
							<li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
								<button className="page-link" onClick={() => paginate(currentPage + 1)}>
									Next
								</button>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	);
}

export default ProductsTable;
