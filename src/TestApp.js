import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Category from "./pages/Category";
import Offers from "./pages/Offers";
import NotFound from "./pages/notfound";
import Footer from "./components/footer";
import ProductDetails from "./components/ProductDetails";
import addedtocart from "./pages/addedtocart";
function TestApp() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/category/:categoryName" component={Category} />
        <Route exact path="/offers" component={Offers} />
        <Route exact path="/addedtocart" component={addedtocart} />
        <Route component={NotFound} />
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default TestApp;
