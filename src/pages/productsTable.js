import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import AdminCard from "../components/AdminCard";
import AdminBtn from "../components/AdminBtn";


function ProductsTable() {
	const history = useHistory();
	const [productsList, setProductsList] = useState([])

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem("userData"));

		// if (!userData || !userData.isAdmin) {
		// 	history.push("/login");
		// }

	}, [history]);

	useEffect(() => {
		axios.get("https://dummyjson.com/products")
			.then((response) => setProductsList(response.data.products))
			.catch((err) => console.log(err))
	}, []);

	return (
		<>
			<div className="row">
				<div className="table-responsive">
					<table className="table table-striped">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Name</th>
								<th scope="col">Price</th>
								<th scope="col">Category</th>
								<th scope="col">Update</th>
								<th scope="col">Delete</th>
							</tr>
						</thead>
						<tbody>
							{
								productsList.map((product) => {
									return (
										<tr>
											<th scope="row">{product.id}</th>
											<td><Link to={`/products/${product.id}`}>{product.title}</Link></td>
											<td>{product.price}$</td>
											<td>{product.category}</td>
											<td><AdminBtn text="Update" color="success" path={`/products/${product.id}/edit`} productId={product.id} /></td>
											<td><AdminBtn text="Delete" color="danger" path={`/products/${product.id}/delete`} /></td>
										</tr>
									)

								})
							}
						</tbody>
					</table>
				</div>
				

			</div>
		</>
	);
}

export default ProductsTable;
