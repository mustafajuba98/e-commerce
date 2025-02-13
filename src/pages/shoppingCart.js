import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { REMOVE_FROM_CART } from "../actions/actions";
import axios from "axios";


function ShoppingCart() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("loginSession")) {
      history.push("/login");
    }
  }, [history]);

  const username = JSON.parse(localStorage.getItem("loginSession"))?.username;
  const cartItems = useSelector((state) => state.cart[username] || []);
  const [showModal, setShowModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})
  );

  const handleQuantityChange = (id, stock, value) => {
    const newQuantity = Math.max(1, Math.min(stock, Number(value)));
    setQuantities((prev) => ({ ...prev, [id]: newQuantity }));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price) * (quantities[item.id] || 1),
    0
  );
  const taxRate = 0.14;
  const taxAmount = totalPrice * taxRate;
  const totalPriceWithTax = totalPrice + taxAmount;

  const handleRemoveClick = (product) => {
    setSelectedItem(product);
    setShowModal(true);
  };

  const handleConfirmRemove = () => {
    if (selectedItem) {
      dispatch({ type: REMOVE_FROM_CART, payload: selectedItem.id });
    }
    setShowModal(false);
  };

  const handleBuyNow = () => {
    setShowBuyModal(true);
  };

  const handleConfirmPurchase = () => {
    if (cartItems.length === 0) return;

    cartItems.forEach((item) => {
      axios.patch(`https://salesprogrow.com/products/${item.id}`, {
        stock: item.stock - (quantities[item.id] || 1),
      })
    });

    dispatch({ type: "CLEAR_CART", payload: username });
    localStorage.removeItem(`cart_${username}`);
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
                    <h6><span className="badge text-bg-warning w-25 mb-3">{product.stock}</span> Left in stock</h6>

                    <Form.Group>
                      <Form.Label>Quantity:</Form.Label>
                      <Form.Control
                        type="number"
                        value={quantities[product.id] || 1}
                        onChange={(e) => handleQuantityChange(product.id, product.stock, e.target.value)}
                        min="1"
                        max={product.stock}
                        className="mb-3"
                      />
                    </Form.Group>
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
            <h4>Subtotal: ${totalPrice.toFixed(2)}</h4>
            <h5>Tax (14%): ${taxAmount.toFixed(2)}</h5>
            <h3>Total: ${totalPriceWithTax.toFixed(2)}</h3>
            <Button variant="info" className="mt-3" onClick={handleBuyNow}>Buy Now</Button>
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
        <Modal.Body>Are you sure you want to remove this item from your cart?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
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
        <Modal.Body>Are you sure you want to complete this purchase?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBuyModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleConfirmPurchase}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ShoppingCart;
