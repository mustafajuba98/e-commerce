


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Container, Pagination, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, addToWishlist } from "../actions/actions";
import { FaShoppingCart, FaHeart, FaCheck } from "react-icons/fa";
import { Alert } from "react-bootstrap";


import { useSearch } from "../reducers/searchContext";

function ProductsCard() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);

  const [confirmationMessage, setConfirmationMessage] = useState(null);

  const productsPerPage = 8;
  const dispatch = useDispatch();
  const { searchTerm } = useSearch();

  useEffect(() => {
    axios
      .get("https://salesprogrow.com/products/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);


  const categories = ["All", ...new Set(products.map((product) => product.category))];

  const priceRanges = [
    { label: "Under $25", min: 0, max: 25 },
    { label: "$25 to $50", min: 25, max: 50 },
    { label: "$50 to $100", min: 50, max: 100 },
    { label: "Over $100", min: 100, max: Infinity },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    // 
    const matchesSearchTerm =
      product.title.toLowerCase().startsWith(searchTerm.toLowerCase());
    //
    const matchesPriceRange =
      selectedPriceRange === null ||
      (product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max);

    return matchesCategory && matchesSearchTerm && matchesPriceRange;
  });

  const showConfirmation = (message) => {
    setConfirmationMessage(message);
    setTimeout(() => setConfirmationMessage(null), 2000);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    showConfirmation(`${product.title} added to cart!`);
  };

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
    showConfirmation(`${product.title} added to wishlist!`);
  };

  // const filteredProducts = products.filter((product) =>
  //   product.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);


  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <Container className="my-5 mb-5">
//       <h2 className="text-center mb-4">Our Products</h2>


//       <div className="d-flex justify-content-center flex-wrap mb-4">
//         {categories.map((category, index) => (
//           <Button
//             key={index}
//             variant={selectedCategory === category ? "success" : "outline-success"}
//             className="me-4 mb-4 fs-5"
//             onClick={() => {
//               setSelectedCategory(category);
//               // setSelectedPriceRange(null); 
//             }}
//           >
//             {category}
//           </Button>

//       { confirmationMessage && (
//             <Alert variant="success" className="text-center">
//               {confirmationMessage}
//             </Alert>
//           )}

//         <Row className="g-4">
//           {currentProducts.map((product) => (
//             <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
//               <Card className="h-100 shadow-sm">
//                 <Card.Img
//                   variant="top"
//                   src={product.image}
//                   alt={product.title}
//                   style={{ height: "400px", objectFit: "contain" }}
//                 />
//                 <Card.Body className="d-flex flex-column">
//                   <Card.Title className="text-truncate">{product.title}</Card.Title>
//                   <Card.Text className="text-muted small text-truncate">
//                     {product.description}
//                   </Card.Text>
//                   <h5 className="text-primary">${product.price}</h5>
//                   <div className="d-flex justify-content-between">
//                     <Button variant="success" onClick={() => handleAddToCart(product)}>
//                       <FaShoppingCart />
//                     </Button>
//                     <Button variant="outline-danger" onClick={() => handleAddToWishlist(product)}>
//                       <FaHeart />
//                     </Button>
//                   </div>
//                   <Link to={`/products/${product.id}`}>
//                     <Button variant="primary" className="mt-2">
//                       View Details
//                     </Button>
//                   </Link>
//                 </Card.Body>
//               </Card>
//             </Col>

//           ))}
//       </div>


//       <Row>
//         <Col md={3}>
//           <h5>Filter by Price</h5>
//           {priceRanges.map((range, index) => (
//             <Form.Check
//               key={index}
//               type="radio"
//               id={`price-range-${index}`}
//               label={range.label}
//               className="custom-checkbox"
//               name="price-range"
//               checked={selectedPriceRange === range}
//               onChange={() => setSelectedPriceRange(range)}
//             />
//           ))}

//           <hr />
//           <Button
//             variant="outline-success success"
//             className="me-2 mb-2 fs-6"
//             onClick={() => setSelectedPriceRange(null)}
//           >
//             Clear Price Filter
//           </Button>
//         </Col>
//       </Row>
//       <Col md={9}>
//         <Row className="g-4">
//           {currentProducts.map((product) => (
//             <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
//               <Card className="h-100 shadow-sm">
//                 <Card.Img
//                   variant="top"
//                   src={product.image}
//                   alt={product.title}
//                   style={{ height: "400px", objectFit: "contain" }}
//                 />
//                 <Card.Body className="d-flex flex-column">
//                   <Card.Title className="text-truncate">
//                     {product.title}
//                   </Card.Title>
//                   <Card.Text className="text-muted small text-truncate">
//                     {product.description}
//                   </Card.Text>
//                   <h5 className="text-primary">${product.price}</h5>
//                   <div className="d-flex justify-content-between">
//                     <Button
//                       variant="success"
//                       onClick={() => dispatch(addToCart(product))}
//                     >
//                       <FaShoppingCart />
//                     </Button>
//                     <Button
//                       variant="outline-danger"
//                       onClick={() => dispatch(addToWishlist(product))}
//                     >
//                       <FaHeart />
//                     </Button>
//                   </div>
//                   <Link to={`/products/${product.id}`}>
//                     <Button variant="primary" className="mt-2">
//                       View Details
//                     </Button>
//                   </Link>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Col>
//     </Row>

      
//     totalPages > 1 && (
//       <Pagination className="justify-content-center mt-4">
//         <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
//           Previous
//         </Pagination.Prev>
//         {[...Array(totalPages)].map((_, index) => (
//           <Pagination.Item
//             key={index + 1}
//             active={index + 1 === currentPage}
//             onClick={() => paginate(index + 1)}
//           >
//             {index + 1}
//           </Pagination.Item>
//         ))}
//         <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
//           Next
//         </Pagination.Next>
//       </Pagination>
//     )
//   }
//     </Container >
//   );
// }

// export default ProductsCard;

return (
  <Container className="my-5 mb-5">
    <h2 className="text-center mb-4">Our Products</h2>

    <div className="d-flex justify-content-center flex-wrap mb-4">
      {categories.map((category, index) => (
        <Button
          key={index}
          variant={selectedCategory === category ? "success" : "outline-success"}
          className="me-4 mb-4 fs-5"
          onClick={() => {
            setSelectedCategory(category);
          }}
        >
          {category}
        </Button>
      ))}
    </div>
    <Row>
      <Col md={3}>
        <h5>Filter by Price</h5>
        {priceRanges.map((range, index) => (
          <Form.Check
            key={index}
            type="radio"
            id={`price-range-${index}`}
            label={range.label}
            className="custom-checkbox"
            name="price-range"
            checked={selectedPriceRange === range}
            onChange={() => setSelectedPriceRange(range)}
          />
        ))}

        <hr />
        <Button
          variant="outline-success"
          className="me-2 mb-2 fs-6"
          onClick={() => setSelectedPriceRange(null)}
        >
          Clear Price Filter
        </Button>
      </Col>
      </Row>

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

    
      {/* <Col md={9}>
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
      </Col> */}
    

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