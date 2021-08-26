import React, { useState } from 'react';
import { ext } from '../keys';
import axios from 'axios';
import moment from 'moment';
export function UserOrders() {
  const token = localStorage.getItem('jwtToken');
  const [products, setproducts] = useState([]);

  axios
    .get(ext + '/api/orders/me', {
      headers: { 'x-access-token': token },
    })
    .then((data) => {
      if (products.length !== data.data.length) {
        setproducts(data.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return (
    <div className="container p-1 center">
      <div className="row">
        <h2>Your orders</h2>

        {products.map((product) => {
          return (
            <div className="center" key={product.order._id}>
              <div className="card border-success m-3">
                <div className="card-body">
                  <div className="card-header">
                    <h3>
                      Order of {product.product.name} (
                      {moment(product.order.createdAt).fromNow()})
                    </h3>
                  </div>
                  <h4 className="card-text">Your product info:</h4>

                  <h5 className="card-text">
                    Title:
                    <br />
                    {product.product.name}
                    <br />
                    Description:
                    <br />
                    {product.product.description}
                    <br />
                    Date:
                    <br />
                    {moment(product.order.createdAt).format('MM/DD/YYYY')}
                    <br />
                    Order id:
                    <br />
                    {product.order._id}
                  </h5>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
