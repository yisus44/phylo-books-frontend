import React, { useState } from 'react';
import axios from 'axios';
import { ext } from '../../keys';

export function LikeButton(props) {
  console.log(props);
  const [liked, setLiked] = useState(undefined);
  const token = localStorage.getItem('jwtToken');
  let reaction = undefined;
  async function onClick(e) {
    e.preventDefault();
    let response;
    if (liked.data) {
      //we send a put request
      response = await axios.put(
        ext + '/api/review',
        {
          user_id: props.user._id,
          product_id: props.product._id,
          reaction,
        },
        {
          headers: { 'x-access-token': token },
        }
      );
      console.log(response);
    } else {
      //we create a review
      console.log('creating');
      response = await axios.post(
        ext + '/api/review',
        {
          user_id: props.user._id,
          product_id: props.product._id,
          reaction,
        },
        {
          headers: { 'x-access-token': token },
        }
      );
      console.log(response);
    }
    setLiked(response);
  }
  axios
    .get(
      ext + `/api/review/products/${props.product._id}/${props.user._id}`,

      {
        headers: { 'x-access-token': token },
      }
    )
    .then((data) => {
      if (liked === undefined) {
        setLiked(data);

        console.log(data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  if (liked) {
    if (liked.data?.reaction === 'LIKE') {
      reaction = 'DISLIKE';
      return (
        <div>
          <br />
          <button className="btn btn-outline-warning" onClick={onClick}>
            Dislike
          </button>
        </div>
      );
    } else {
      reaction = 'LIKE';
      return (
        <div>
          <br />
          <button className="btn btn-warning" onClick={onClick}>
            Like
          </button>
        </div>
      );
    }
  }
  return <div></div>;
}
