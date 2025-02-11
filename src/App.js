import './App.css';
import AdminPanel from './pages/admin-panel';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductsTable from './pages/productsTable';
import ProductDetails from './pages/productDetails';


function App() {
  return (
    <BrowserRouter>
      <div className='container pt-3 pb-3'>
        <Switch>
          <Route path="/admin" component={AdminPanel} exact />
          <Route path="/products" component={ProductsTable} exact />
          <Route path="/products/:productId" component={ProductDetails} exact />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
