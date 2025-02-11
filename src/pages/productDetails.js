import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";


function ProductDetails() {
	const history = useHistory();
	const params = useParams();
	const [product, setProduct] = useState([])
	useEffect(() => {
		// const userData = JSON.parse(localStorage.getItem("userData"));

		// if (!userData || !userData.isAdmin) {
		// 	history.push("/login");
		// }
	}, [history]);

	useEffect(() => {
		axios.get('https://dummyjson.com/products/'+params.productId)
			.then((response) => setProduct(response.data))
			.catch((err) => console.log(err))
	}, []);

	return (
		<>
			<div className="row">
				
				<div className="col-lg-8 col-md-10 col-sm-12">
					<div class="card">
						<img src={product.thumbnail} class="card-img-top" width="70" height="370" />
							<div class="card-body">
								<h5 class="card-title">{product.title}</h5>
								<p class="card-text">{product.description}</p>
							</div>
					</div>
				</div>

			</div>
		</>
	);
}

export default ProductDetails;
