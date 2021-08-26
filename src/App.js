import 'bootswatch/dist/litera/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SingleProduct } from './pages/SingleProduct';
import { SignIn } from './pages/SignIn';
import './App.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { NavBar } from './components/navbar/NavBar';
import { ItemContainer } from './components/item-container/ItemContainer';
import { Footer } from './components/footer/Footer';
import { SignUp } from './pages/SignUp';
import { Me } from './pages/Me';
import { AuthProvider } from './services/auth';

const stripePromise = loadStripe(
  'pk_test_51IQHtaIhuPxmQvYnZmMgskzbSXVYycj8njBkZY18LrMxiGmwKUfdm8NqWvbY4MUaPr8veRvBfE37VStBKgIWnjon00eJMvZrrl'
);
function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <NavBar />
          <Elements stripe={stripePromise}>
            <Route exact path="/" component={ItemContainer}></Route>
            <Route exact path="/products/:id" component={SingleProduct}></Route>
            <Route exact path="/users/signin" component={SignIn}></Route>
            <Route exact path="/users/signup" component={SignUp}></Route>
            <Route exact path="/users/me" component={Me}></Route>
          </Elements>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}
export default App;
