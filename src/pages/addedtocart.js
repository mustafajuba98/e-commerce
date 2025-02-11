import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Addedtocart() {
  const cartItems = useSelector((state) => state.cart);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty!</p>
      ) : (
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
                  <h5 className="text-primary">${product.price}</h5>
                  <Button variant="danger" className="mt-auto">
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <div className="text-center mt-4">
        <Link to="/products">
          <Button variant="primary">Continue Shopping</Button>
        </Link>
      </div>
    </Container>
  );
}

export default Addedtocart;
