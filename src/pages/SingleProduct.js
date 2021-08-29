import React, { useState, useContext } from 'react';

import useFetch from 'react-fetch-hook';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { AuthContext } from '../services/auth';

import { LikeButton } from '../components/like-button/LikeButton';

import { ext } from '../keys';

export function SingleProduct(props) {
  const context = useContext(AuthContext);
  const { user } = context;
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const id = props.match.params.id;
  const { isLoading, data } = useFetch(ext + '/api/products/' + id);
  async function onClick(e) {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    setLoading(true);

    if (!error) {
      const { id } = paymentMethod;
      try {
        const userId = context.user.user._id;
        if (userId) {
          const response = await axios.post(ext + '/api/checkout', {
            id,
            amount: data.price * 1000, //cents
            user_id: userId,
            product_id: data._id,
          });

          if (response.status === 200) {
            alert('Your payment has been successful');
          } else if (response.status === 500) {
            alert('Something went wrong, try again later');
          } else {
            alert('Something went wrong, try again later');
          }
          elements.getElement(CardElement).clear();
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  }
  console.log(context);
  if (data) {
    return (
      <div className="container p-1">
        <div className="row">
          <div className="col-sm">
            <img src={data.image} alt={data.name}></img>
          </div>

          <div className="col-sm p-3 ">
            <br />
            <br />
            <div className="border">
              <h2>{data.name}</h2>
              <p className="card-text" style={{ textAlign: 'justify' }}>
                {data.description}
              </p>
              <p className="text-success">Price:{data.price}$</p>
              <p className="text-success">Available in stock</p>
              <p>Category:{data.category}</p>

              <Link to="/">
                <button type="button" className="btn btn-info center">
                  Go back!
                </button>
              </Link>
            </div>
            <br />
            <div className="border">
              {user ? (
                <div>
                  <p>Your payment info</p>
                  <CardElement />
                  <br />
                  <button
                    className="btn btn-success"
                    onClick={onClick}
                    disabled={!stripe}
                  >
                    {loading ? (
                      <div className="spinner-border text-light" role="status">
                        <span className="sr-only"></span>
                      </div>
                    ) : (
                      'Buy'
                    )}
                  </button>
                  <br />
                  <p style={{ color: 'red' }}>
                    Example: 4242 4242 42424 4242 5/30 45131
                  </p>
                </div>
              ) : (
                <div className="form-group row">
                  <div className="col-sm">
                    <Link to="/users/signin">
                      <button type="submit" className="btn btn-primary m-2">
                        Sign up to continue
                      </button>
                      Or . . . .
                    </Link>
                    <Link to="/users/signin">
                      <button type="submit" className="btn btn-primary m-2">
                        Sign in
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <LikeButton user={context.user} product={data}></LikeButton>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <p>Loading</p>;
  }
  return <div></div>;
}
