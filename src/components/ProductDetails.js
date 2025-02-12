import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";

function ProductDetails() {
  const { id } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://salesprogrow.com/products/${id}`)
      .then((response) => {
        if (response.data) {
          setProduct(response.data);
        } else {
          setError("No product found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setError("Error fetching product details");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Container className="my-5">Loading...</Container>;
  }

  if (error) {
    return <Container className="my-5">{error}</Container>;
  }

  if (!product) {
    return <Container className="my-5">No product found.</Container>;
  }

  return (
    <Container className="my-5">
      <Card>
        <Card.Header as="h5">{product.title}</Card.Header>
        <Card.Body>
          <Card.Img
            src={product.image}
            alt={product.title}
            style={{ height: "400px", objectFit: "contain" }}
          />
          <Card.Text className="mt-3">
            <strong>Description:</strong> {product.description}
          </Card.Text>
          <Card.Text>
            <strong>Price:</strong> ${product.price}
          </Card.Text>
          <Button variant="secondary" onClick={() => history.goBack()}>
            Back
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductDetails;
