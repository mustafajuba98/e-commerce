<<<<<<< HEAD



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, Button, Row, Col, Container, Pagination } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addToCart, addToWishlist } from "../actions/actions";
// import { FaShoppingCart, FaHeart } from "react-icons/fa";
// import { useSearch } from "../reducers/searchContext";

// function ProductsCard() {
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const productsPerPage = 8;
//   const dispatch = useDispatch();
//   const { searchTerm } = useSearch();

//   useEffect(() => {
//     axios
//       .get("https://salesprogrow.com/products/")
//       .then((response) => {
//         setProducts(response.data);
//       })
//       .catch((error) => console.error("Error fetching products:", error));
//   }, []);


//   const categories = ["All", ...new Set(products.map((product) => product.category))];


  // const filteredProducts =
  //   selectedCategory === "All"
  //     ? products
  //     : products.filter((product) => product.category === selectedCategory);

  //     const filteredProduct = products.filter((product) => {
  //           return product.title.toLowerCase().startsWith(searchTerm.toLowerCase()); 
  //         });


//   const filteredProducts = products.filter((product) => {
//     const matchesCategory =
//       selectedCategory === "All" || product.category === selectedCategory;
//     const matchesSearchTerm =
//       product.title.toLowerCase().startsWith(searchTerm.toLowerCase());

//     return matchesCategory && matchesSearchTerm;
//   });


//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

//             }}
//           >
//             {category}
//           </Button>

//         ))}
//       </div>

//       <Row className="g-4">
//         {currentProducts.map((product) => (
//           <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
//             <Card className="h-100 shadow-sm">
//               <Card.Img
//                 variant="top"
//                 src={product.image}
//                 alt={product.title}
//                 style={{ height: "400px", objectFit: "contain" }}
//               />
//               <Card.Body className="d-flex flex-column">
//                 <Card.Title className="text-truncate">
//                   {product.title}
//                 </Card.Title>
//                 <Card.Text className="text-muted small text-truncate">
//                   {product.description}
//                 </Card.Text>
//                 <h5 className="text-primary">${product.price}</h5>
//                 <div className="d-flex justify-content-between">
//                   <Button
//                     variant="success"
//                     onClick={() => dispatch(addToCart(product))}
//                   >
//                     <FaShoppingCart />
//                   </Button>
//                   <Button
//                     variant="outline-danger"
//                     onClick={() => dispatch(addToWishlist(product))}
//                   >
//                     <FaHeart />
//                   </Button>
//                 </div>
//                 <Link to={`/products/${product.id}`}>
//                   <Button variant="primary" className="mt-2">
//                     View Details
//                   </Button>
//                 </Link>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>


//       {totalPages > 1 && (
//         <Pagination className="justify-content-center mt-4">
//           <Pagination.Prev
//             onClick={() => paginate(currentPage - 1)}
//             disabled={currentPage === 1}
//           >
//             Previous
//           </Pagination.Prev>
//           {[...Array(totalPages)].map((_, index) => (
//             <Pagination.Item
//               key={index + 1}
//               active={index + 1 === currentPage}
//               onClick={() => paginate(index + 1)}
//             >
//               {index + 1}
//             </Pagination.Item>
//           ))}
//           <Pagination.Next
//             onClick={() => paginate(currentPage + 1)}
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </Pagination.Next>
//         </Pagination>
//       )}
//     </Container>
//   );
// }

// export default ProductsCard;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, Button, Row, Col, Container, Pagination, Form } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addToCart, addToWishlist } from "../actions/actions";
// import { FaShoppingCart, FaHeart } from "react-icons/fa";
// import { useSearch } from "../reducers/searchContext";

// function ProductsCard() {
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [priceRange, setPriceRange] = useState([]);
//   const productsPerPage = 8;
//   const dispatch = useDispatch();
//   const { searchTerm } = useSearch();

//   useEffect(() => {
//     axios
//       .get("https://salesprogrow.com/products/")
//       .then((response) => {
//         setProducts(response.data);
//       })
//       .catch((error) => console.error("Error fetching products:", error));
//   }, []);

//   const categories = ["All", ...new Set(products.map((product) => product.category))];

//   const handlePriceChange = (price) => {
//     setPriceRange((prev) =>
//       prev.includes(price)
//         ? prev.filter((item) => item !== price)  // Remove the price if already selected
//         : [...prev, price]  // Add the price if it's not selected
//     );
//   };

//   const filteredProducts = products.filter((product) => {
//     const matchesCategory =
//       selectedCategory === "All" || product.category === selectedCategory;
//     const matchesSearchTerm =
//       product.title.toLowerCase().startsWith(searchTerm.toLowerCase());

//     // Price range filtering
//     const matchesPrice =
//       priceRange.length === 0 ||
//       priceRange.some((range) => {
//         switch (range) {
//           case "0-50":
//             return product.price >= 0 && product.price <= 50;
//           case "51-100":
//             return product.price > 50 && product.price <= 100;
//           case "101-200":
//             return product.price > 100 && product.price <= 200;
//           case "200+":
//             return product.price > 200;
//           default:
//             return false;
//         }
//       });

//     return matchesCategory && matchesSearchTerm && matchesPrice;
//   });

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <Container className="my-5 mb-5">
//       <h2 className="text-center mb-4">Our Products</h2>

//       {/* Category Filter - Top of the Page */}
//       <div className="d-flex justify-content-center flex-wrap mb-4">
//         {categories.map((category, index) => (
//           <Button
//             key={index}
//             variant={selectedCategory === category ? "success" : "outline-success"}
//             className="me-4 mb-4 fs-5"
//             onClick={() => setSelectedCategory(category)}
//           >
//             {category}
//           </Button>
//         ))}
//       </div>

//       <Row>
//         <Col md={3}>
//           {/* Sidebar for Price Filter */}
//           <h5>Price Range</h5>
//           <Form>
//             <Form.Check
//               type="checkbox"
//               label="$0 - $50"
//               onChange={() => handlePriceChange("0-50")}
//               checked={priceRange.includes("0-50")}
//             />
//             <Form.Check
//               type="checkbox"
//               label="$51 - $100"
//               onChange={() => handlePriceChange("51-100")}
//               checked={priceRange.includes("51-100")}
//             />
//             <Form.Check
//               type="checkbox"
//               label="$101 - $200"
//               onChange={() => handlePriceChange("101-200")}
//               checked={priceRange.includes("101-200")}
//             />
//             <Form.Check
//               type="checkbox"
//               label="$200+"
//               onChange={() => handlePriceChange("200+")}
//               checked={priceRange.includes("200+")}
//             />
//           </Form>
//         </Col>

//         <Col md={9}>
//           <Row className="g-4">
//             {currentProducts.map((product) => (
//               <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
//                 <Card className="h-100 shadow-sm">
//                   <Card.Img
//                     variant="top"
//                     src={product.image}
//                     alt={product.title}
//                     style={{ height: "400px", objectFit: "contain" }}
//                   />
//                   <Card.Body className="d-flex flex-column">
//                     <Card.Title className="text-truncate">
//                       {product.title}
//                     </Card.Title>
//                     <Card.Text className="text-muted small text-truncate">
//                       {product.description}
//                     </Card.Text>
//                     <h5 className="text-primary">${product.price}</h5>
//                     <div className="d-flex justify-content-between">
//                       <Button
//                         variant="success"
//                         onClick={() => dispatch(addToCart(product))}
//                       >
//                         <FaShoppingCart />
//                       </Button>
//                       <Button
//                         variant="outline-danger"
//                         onClick={() => dispatch(addToWishlist(product))}
//                       >
//                         <FaHeart />
//                       </Button>
//                     </div>
//                     <Link to={`/products/${product.id}`}>
//                       <Button variant="primary" className="mt-2">
//                         View Details
//                       </Button>
//                     </Link>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>

//           {totalPages > 1 && (
//             <Pagination className="justify-content-center mt-4">
//               <Pagination.Prev
//                 onClick={() => paginate(currentPage - 1)}
//                 disabled={currentPage === 1}
//               >
//                 Previous
//               </Pagination.Prev>
//               {[...Array(totalPages)].map((_, index) => (
//                 <Pagination.Item
//                   key={index + 1}
//                   active={index + 1 === currentPage}
//                   onClick={() => paginate(index + 1)}
//                 >
//                   {index + 1}
//                 </Pagination.Item>
//               ))}
//               <Pagination.Next
//                 onClick={() => paginate(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//               >
//                 Next
//               </Pagination.Next>
//             </Pagination>
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default ProductsCard;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Container, Pagination, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, addToWishlist } from "../actions/actions";
import { FaShoppingCart, FaHeart, FaCheck} from "react-icons/fa";
=======
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Container, Pagination, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, addToWishlist } from "../actions/actions";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
>>>>>>> main
import { useSearch } from "../reducers/searchContext";

function ProductsCard() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
<<<<<<< HEAD
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
=======
  const [confirmationMessage, setConfirmationMessage] = useState(null); // State for messages
>>>>>>> main
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

<<<<<<< HEAD
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
=======
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
>>>>>>> main

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
<<<<<<< HEAD
=======

>>>>>>> main
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="my-5 mb-5">
      <h2 className="text-center mb-4">Our Products</h2>

<<<<<<< HEAD
      <div className="d-flex justify-content-center flex-wrap mb-4">
        {categories.map((category, index) => (
          <Button
            key={index}
            variant={selectedCategory === category ? "success" : "outline-success"}
            className="me-4 mb-4 fs-5"
            onClick={() => {
              setSelectedCategory(category);
              // setSelectedPriceRange(null); 
            }}
          >
            {category}
          </Button>
=======
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
>>>>>>> main
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
          
          <hr/>
          <Button
            variant="outline-success success"
            className="me-2 mb-2 fs-6"
            onClick={() => setSelectedPriceRange(null)}
          >
            Clear Price Filter
          </Button>
        </Col>

        <Col md={9}>
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
        </Col>
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