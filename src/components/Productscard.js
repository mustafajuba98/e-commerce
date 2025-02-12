import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Container, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, addToWishlist } from "../actions/actions";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

function ProductsCard() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://salesprogrow.com/products/")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="my-5 mb-5">
      <h2 className="text-center mb-4">Our Products</h2>
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
                <Card.Title className="text-truncate">
                  {product.title}
                </Card.Title>
                <Card.Text className="text-muted small text-truncate">
                  {product.description}
                </Card.Text>
                <h5 className="text-primary">${product.price}</h5>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="success"
                    onClick={() => dispatch(addToCart(product))}
                  >
                    <FaShoppingCart />
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => dispatch(addToWishlist(product))}
                  >
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


{/* حتة البجينيشن لازم بعد الكارد علشان تظهر تحت خالص في اخر الصفحة */}

{totalPages > 1 && (
        <Pagination className="justify-content-center mt-4">
          <Pagination.Prev
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
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
          <Pagination.Next
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Pagination.Next>
        </Pagination>
      )}

     
    </Container>
  );
}

export default ProductsCard;
