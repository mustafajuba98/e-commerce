import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Container, Pagination, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, addToWishlist } from "../actions/actions";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useSearch } from "../reducers/searchContext";

function ProductsCard() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmationMessage, setConfirmationMessage] = useState(null); // State for messages
  const productsPerPage = 8;
  const dispatch = useDispatch();
  const { searchTerm } = useSearch();

  useEffect(() => {
    axios
      .get("https://salesprogrow.com/products/")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const showConfirmation = (message) => {
    setConfirmationMessage(message);
    setTimeout(() => setConfirmationMessage(null), 2000); // Hide after 2 seconds
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    showConfirmation(`${product.title} added to cart!`);
  };

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
    showConfirmation(`${product.title} added to wishlist!`);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="my-5 mb-5">
      <h2 className="text-center mb-4">Our Products</h2>

      {confirmationMessage && (
        <Alert variant="success" className="text-center">
          {confirmationMessage}
        </Alert>
      )}

      <Row className="g-4">
        {currentProducts.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.title}
                style={{ height: "400px", objectFit: "contain" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-truncate">{product.title}</Card.Title>
                <Card.Text className="text-muted small text-truncate">
                  {product.description}
                </Card.Text>
                <h5 className="text-primary">${product.price}</h5>
                <div className="d-flex justify-content-between">
                  <Button variant="success" onClick={() => handleAddToCart(product)}>
                    <FaShoppingCart />
                  </Button>
                  <Button variant="outline-danger" onClick={() => handleAddToWishlist(product)}>
                    <FaHeart />
                  </Button>
                </div>
                <Link to={`/products/${product.id}`}>
                  <Button variant="primary" className="mt-2">
                    View Details
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-4">
          <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </Pagination.Prev>
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </Pagination.Next>
        </Pagination>
      )}
    </Container>
  );
}

export default ProductsCard;
