import './App.css';
import AdminPanel from './pages/admin-panel';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductsTable from './pages/productsTable';
import ProductDetails from './pages/productDetails';
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Category from "./pages/Category";
import Offers from "./pages/Offers";
import NotFound from "./pages/notfound";
import Footer from './components/footer'
import addedtocart from "./pages/addedtocart";
import LoginForm from "./pages/Login";
import RegisterForm from './pages/register'
import ProductCreate from './pages/productCreate';
import ProductUpdate from './pages/productUpdate';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className='container pt-3 pb-3'>
        <Switch>
          
          <Route exact path="/" component={Home} />
          <Route path="/admin" component={AdminPanel} exact />
          <Route path="/admin/products" component={ProductsTable} exact />
          <Route exact path="/products" component={Products} />
          <Route exact path="/products/create" component={ProductCreate} />
          <Route path="/products/update/:id" component={ProductUpdate} />
          <Route exact path="/products/:id" component={ProductDetails} />
          <Route exact path="/category/:categoryName" component={Category} />
          <Route exact path="/Login" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />

          <Route exact path="/offers" component={Offers} />
          <Route exact path="/addedtocart" component={addedtocart} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
