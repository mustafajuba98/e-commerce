import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { REMOVE_FROM_WISHLIST, CLEAR_WISHLIST } from "../actions/actions";

function Wishlist() {
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);
	const [showClearModal, setShowClearModal] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	const username = JSON.parse(localStorage.getItem("loginSession"))?.username || "guest";
	const wishlistItems = useSelector((state) => state.wishlist[username] || []);

	useEffect(() => {
		const storedWishlist = JSON.parse(localStorage.getItem(`wishlist_${username}`)) || [];
		if (storedWishlist.length > 0 && wishlistItems.length === 0) {
			dispatch({ type: "LOAD_WISHLIST", payload: { username, items: storedWishlist } });
		}
	}, [dispatch, username, wishlistItems.length]);

	const handleRemoveClick = (product) => {
		setSelectedItem(product);
		setShowModal(true);
	};

	const handleConfirmRemove = () => {
		if (selectedItem) {
			dispatch({ type: REMOVE_FROM_WISHLIST, payload: { username, id: selectedItem.id } });

			const updatedWishlist = wishlistItems.filter((item) => item.id !== selectedItem.id);
			localStorage.setItem(`wishlist_${username}`, JSON.stringify(updatedWishlist));
		}
		setShowModal(false);
	};

	const handleClearWishlist = () => {
		setShowClearModal(true);
	};

	const handleConfirmClearWishlist = () => {
		dispatch({ type: CLEAR_WISHLIST, payload: username });
		localStorage.setItem(`wishlist_${username}`, JSON.stringify([]));
		setShowClearModal(false);
	};

	return (
		<Container className="my-5">
			<h2 className="text-center mb-4">Wishlist</h2>
			{wishlistItems.length === 0 ? (
				<p className="text-center">Your wishlist is empty!</p>
			) : (
				<>
					<Row className="g-4">
						{wishlistItems.map((product) => (
							<Col key={product.id} xs={12} sm={6} md={4} lg={3}>
								<Card className="h-100 shadow-sm">
									<Card.Img
										variant="top"
										src={product.image}
										alt={product.title}
										style={{ height: "200px", objectFit: "contain" }}
									/>
									<Card.Body className="d-flex flex-column">
										<Card.Title className="text-truncate">{product.title}</Card.Title>
										<h5 className="text-primary">${Number(product.price).toFixed(2)}</h5>
										<Button
											variant="danger"
											className="mt-auto"
											onClick={() => handleRemoveClick(product)}
										>
											Remove
										</Button>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>

					<div className="text-center mt-4">
						<Button variant="warning" onClick={handleClearWishlist}>Clear Wishlist</Button>
					</div>
				</>
			)}

			<div className="text-center mt-4">
				<Link to="/products">
					<Button variant="primary">Continue Shopping</Button>
				</Link>
			</div>

			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Remove Item</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are you sure you want to remove this item from your wishlist?</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
					<Button variant="danger" onClick={handleConfirmRemove}>Remove</Button>
				</Modal.Footer>
			</Modal>

			{/* Clear Wishlist Confirmation Modal */}
			<Modal show={showClearModal} onHide={() => setShowClearModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Clear Wishlist</Modal.Title>
				</Modal.Header>
				<Modal.Body>Are you sure you want to clear your entire wishlist?</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowClearModal(false)}>Cancel</Button>
					<Button variant="danger" onClick={handleConfirmClearWishlist}>Clear Wishlist</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
}

export default Wishlist;
