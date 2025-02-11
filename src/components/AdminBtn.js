import { Link } from "react-router-dom";


function AdminBtn({ text, color, path, productId }) {
	function update() {
		/* updating title of product with id 1 */
		fetch('https://dummyjson.com/products/'+productId, {
			method: 'DELETE', /* or PATCH */
			// headers: { 'Content-Type': 'application/json' },
			// body: JSON.stringify({
				// title: 'iPhone Galaxy +1'
			// })
		})
		.then(res => res.json())
		.then(console.log);
	}

	return (
		// <Link to={ path } className={`btn btn-${color}`}>{ text }</Link>
		<button className="btn btn-success" onClick={update}>Update</button>
	);
}

export default AdminBtn;
