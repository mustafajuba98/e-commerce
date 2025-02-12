import { Link } from "react-router-dom";


function AdminCard({ name, text, path }) {
	return (
		<div className="card mb-3" style={{width: "18rem"}}>
			<div className="card-body">
				<h5 className="card-title">Manage { name }</h5>
				<p className="card-text">{ text }</p>
				<Link to={ path } className="btn btn-primary">Manage</Link>
			</div>
		</div>
	);
}

export default AdminCard;
