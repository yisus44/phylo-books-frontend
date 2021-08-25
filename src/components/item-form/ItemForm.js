import 'bootswatch/dist/sketchy/bootstrap.min.css';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';

export function ItemForm({ product }) {
  const [readMore, setReadMore] = useState(false);
  let extraContent;
  let mainContent;

  if (product.description.length > 140) {
    console.log(extraContent);
    mainContent = product.description.substring(0, 140);
    extraContent = product.description.substring(
      140,
      product.description.length
    );
  } else {
    mainContent = product.description;
    extraContent = '';
  }

  return (
    <div className="card bg-light mb-1 m-1" style={{ maxWidth: '18rem' }}>
      <div className="card-header">{product.category}</div>
      <div className="card-body">
        <Link to={`/products/${product._id}`}>
          <h3 className="card-title text-info">{product.name}</h3>
        </Link>
        <h4>Price:{product.price}</h4>
        <p className="card-text">
          {mainContent}
          {!readMore && product.description.length > 140 && (
            <p
              class="text-info"
              onClick={() => {
                setReadMore(!readMore);
              }}
            >
              Read More...
            </p>
          )}
          {readMore && extraContent}
        </p>
        <Link to={`/products/${product._id}`}>
          <button type="button" class="btn btn-info">
            Shop now!
          </button>
        </Link>
      </div>
    </div>
  );
}
// <form className="card card-body">
//   <img className="img-fluid" alt={product.name} src={product.image}></img>
//   <h3 className="text-center">$</h3>
//   <div className="form-group"></div>

//   <button className="btn btn-success">Buy now!</button>
// </form>;
