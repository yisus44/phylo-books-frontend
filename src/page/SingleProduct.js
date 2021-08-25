import React, { useState } from 'react';

import useFetch from 'react-fetch-hook';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Link } from 'react-router-dom';

import axios from 'axios';

const ext = 'https://flores-phylo-books.herokuapp.com';
export function SingleProduct(props) {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

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
        const response = await axios.post(ext + '/api/checkout', {
          id,
          amount: data.price * 1000, //cents
        });

        if (response.status === 200) {
          alert('Your payment has been successful');
        } else if (response.status === 500) {
          alert('Something went wrong, try again later');
        }
        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  }

  const id = props.match.params.id;
  const { isLoading, data } = useFetch(ext + '/api/products/' + id);
  if (data) {
    console.log(data);
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
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  'Buy'
                )}
              </button>
            </div>
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
