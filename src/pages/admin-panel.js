import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import AdminCard from "../components/AdminCard";


function AdminPanel() {
	const history = useHistory();
	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem("userData"));

		// if (!userData || !userData.isAdmin) {
		// 	history.push("/login");
		// }
	}, [history]);

	return (
		<>
			<div className="row">
				<div className="col-6">
					<AdminCard name="Products" text="View all available products and Update or Delete them" path="/products" />
				</div>

				<div className="col-6">
					<AdminCard name="Users" text="View all users and Update or Delete them" path="/users" />
				</div>

			</div>
		</>
	);
}

export default AdminPanel;
