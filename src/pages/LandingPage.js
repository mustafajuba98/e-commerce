import React from "react";
import { Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom"; 
import image from "../Images/1.jpg";

function LandingPageOverlay() {
  const history = useHistory();

  const backgroundStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    color: "#f5f5f5",
    position: "relative",
    fontFamily: "'Poppins', sans-serif",
  };

  const overlayStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "40px",
    borderRadius: "10px",
  };

  const headingStyle = {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#A8E6CF", 
  };

  const textStyle = {
    fontSize: "1.2rem",
    color: "#E0E0E0",
  };

  return (
    <div style={backgroundStyle}>
      <Container style={overlayStyle}>
        <h1 style={headingStyle}>E Commercia</h1>
        <p className="lead" style={textStyle}>Your Ultimate Online Shopping Destination</p>
        <p style={textStyle}>
          Discover the latest trends, high-quality products, and unbeatable 
          prices—all in one place. Whether you're looking for fashion, 
          electronics, home essentials, or more, we've got you covered.
        </p>
        <p style={textStyle}>
          Enjoy a seamless shopping experience with secure payments, fast 
          shipping, and 24/7 customer support. Shop with confidence and 
          convenience, anytime, anywhere!
        </p>
        <p style={textStyle}>
          Join thousands of satisfied customers and explore a world of exclusive 
          deals, seasonal discounts, and handpicked collections. Don't miss out!
        </p>
        <Button variant="info" size="lg" onClick={() => history.push("/products")}>
          Start Shopping Now
        </Button>
      </Container>
    </div>
  );
}

export default LandingPageOverlay;
