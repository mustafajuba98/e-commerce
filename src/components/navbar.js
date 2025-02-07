import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom"; 

function NavScrollExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">E Commerce</Navbar.Brand> {/* ✅ تعديل */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">Home</Nav.Link> {/* ✅ تعديل */}
            <Nav.Link as={Link} to="/products">Products</Nav.Link> {/* ✅ تعديل */}

            <NavDropdown title="Categories" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/category/electronics">Electronics</NavDropdown.Item> {/* ✅ تعديل */}
              <NavDropdown.Item as={Link} to="/category/clothing">Clothing</NavDropdown.Item> {/* ✅ تعديل */}
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/offers">Special Offers</NavDropdown.Item> {/* ✅ تعديل */}
            </NavDropdown>
          </Nav>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
