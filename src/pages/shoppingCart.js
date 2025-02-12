import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { REMOVE_FROM_CART } from "../actions/actions";

function ShoppingCart() {
  const dispatch = useDispatch();
  const username = JSON.parse(localStorage.getItem("loginSession"))?.username;
  const cartItems = useSelector((state) => state.cart[username] || []);

  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => Number(total) + Number(item.price), 0);
  const taxRate = 0.14;
  const taxAmount = totalPrice * taxRate;
  const totalPriceWithTax = totalPrice + taxAmount;

  // Show confirmation modal before removing
  const handleRemoveClick = (product) => {
    setSelectedItem(product);
    setShowRemoveModal(true);
  };

  // Remove item from cart
  const handleConfirmRemove = () => {
    if (selectedItem) {
      dispatch({ type: REMOVE_FROM_CART, payload: selectedItem.id });
    }
    setShowRemoveModal(false);
  };

  // Handle Buy Now confirmation
  const handleBuyNow = () => {
    setShowBuyModal(true);
  };

  // Confirm purchase and clear cart
  const handleConfirmPurchase = () => {
    cartItems.forEach((product) => {
      dispatch({ type: REMOVE_FROM_CART, payload: product.id });
    });
    setShowBuyModal(false);
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty!</p>
      ) : (
        <>
          <Row className="g-4">
            {cartItems.map((product) => (
              
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

          <div className="mt-4 text-center">
            <h5>Subtotal: ${Number(totalPrice).toFixed(2)}</h5>
            <h6>Tax (14%): ${Number(taxAmount).toFixed(2)}</h6>
            <h4 className="text-success">Total: ${Number(totalPriceWithTax).toFixed(2)}</h4>
          </div>

          <div className="text-center mt-3">
            <Button variant="info" className="px-4" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>
        </>
      )}

      <div className="text-center mt-4">
        <Link to="/products">
          <Button variant="primary">Continue Shopping</Button>
        </Link>
      </div>

      <Modal show={showRemoveModal} onHide={() => setShowRemoveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove this item from your cart?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRemoveModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmRemove}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showBuyModal} onHide={() => setShowBuyModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Purchase</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your total is <strong>${Number(totalPriceWithTax).toFixed(2)}</strong>. Do you want to proceed with the purchase?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBuyModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleConfirmPurchase}>
            Confirm Purchase
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ShoppingCart;
