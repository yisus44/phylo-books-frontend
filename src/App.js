import 'bootswatch/dist/litera/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SingleProduct } from './page/SingleProduct';
import './App.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { NavBar } from './components/navbar/NavBar';
import { ItemContainer } from './components/item-container/ItemContainer';
import { Footer } from './components/footer/Footer';

const stripePromise = loadStripe(
  'pk_test_51IQHtaIhuPxmQvYnZmMgskzbSXVYycj8njBkZY18LrMxiGmwKUfdm8NqWvbY4MUaPr8veRvBfE37VStBKgIWnjon00eJMvZrrl'
);

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Elements stripe={stripePromise}>
          <Route exact path="/" component={ItemContainer}></Route>
          <Route exact path="/products/:id" component={SingleProduct}></Route>
        </Elements>

        <Footer />
      </Router>
    </div>
  );
}
export default App;
