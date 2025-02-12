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
        <Navbar.Brand as={Link} className="fw-bold fs-4" to="/">
          E-Commerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="mx-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link as={Link} className=" active fs-5 " to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} className=" active fs-5" to="/products">
              Products
            </Nav.Link>
            {/* مش لاقي الايقونة هعملها كدة مؤقتا */}
            <Nav.Link as={Link}  className=" active fs-5" to="/Addedtocart">
              MyCart 🛒{" "}
            </Nav.Link>
            <NavDropdown title="Categories" id="navbarScrollingDropdown" className=" active fs-5">
              <NavDropdown.Item as={Link} to="/category/electronics" className=" active fs-5">
                Electronics
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/clothing" className=" active fs-5">
                Clothing
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/offers" className=" active fs-5">
                Special Offers
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Form className="d-flex me-3">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" className="  fs-5">Search</Button>
          </Form>

          <div className="d-flex gap-2">
            <Button as={Link} to="/Login" variant="outline-primary" className="  fs-5">
              Login
            </Button>
            <Button as={Link} to="/logout" variant="outline-danger" className="  fs-5">
              Logout
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
