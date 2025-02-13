import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useSearch } from "../reducers/searchContext"; // استيراد الكونسيت
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";



function NavScrollExample() {
  const { searchTerm, setSearchTerm } = useSearch();
  const [query, setQuery] = useState("");
  let history = useHistory();
  let location = useLocation();

  const username = JSON.parse(localStorage.getItem("loginSession"))?.username || "guest";

  const cartItems = useSelector((state) => state.cart[username] || []);
  const cartItemCount = cartItems.length;

  const wishlistItems = useSelector((state) => state.wishlist[username] || []);
  const wishlistItemsCount = wishlistItems.length;

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    setSearchTerm(query);
  };

  function checkLogin() {
    return !!localStorage.getItem('loginSession');
  }

  function logOut() {
    localStorage.removeItem('loginSession');
    history.push('/login');
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} className="fw-bold fs-4" to="/">
          E-Commerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="mx-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link as={Link} className="active fs-5" to="/">
              Home
            </Nav.Link>

            <Nav.Link as={Link} className="active fs-5" to="/products">
              Products
            </Nav.Link>

            {checkLogin() && (
              <Nav.Link as={Link} className="active fs-5" to="/cart">
                MyCart{" "}
                <span className="badge text-bg-secondary">
                  {cartItemCount}
                </span>
              </Nav.Link>
            )}

            <Nav.Link as={Link} className="active fs-5" to="/wishlist">
              Wishlist{" "}
              <span className="badge text-bg-secondary">
                {wishlistItemsCount}
              </span>
            </Nav.Link>

            {location.pathname === "/products" && (
              <NavDropdown title="Categories" id="navbarScrollingDropdown" className="active fs-5">
                <NavDropdown.Item as={Link} to="/category/electronics" className="active fs-5">
                  Electronics
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/category/clothing" className="active fs-5">
                  Clothing
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/offers" className="active fs-5">
                  Special Offers
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>

          {location.pathname === "/products" && (
            <Form className="d-flex me-3">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={query}
                onChange={handleSearchChange}
              />
              <Button variant="outline-success" className="fs-5" onClick={handleSearchClick}>
                Search
              </Button>
            </Form>
          )}

          <div className="d-flex gap-2">
            {checkLogin() ? (
              <Button onClick={logOut} variant="outline-danger" className="fs-5">
                Logout
              </Button>
            ) : (
              <>
                <Button as={Link} to="/login" variant="outline-primary" className="fs-5">
                  Login
                </Button>
                <Button as={Link} to="/register" variant="outline-dark" className="fs-5">
                  Register
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
