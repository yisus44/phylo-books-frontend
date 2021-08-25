import React from 'react';
/*

const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    setLoading(true);
    if (!error) {
      //id is the transctions
      const { id } = paymentMethod;
      try {
        const { response } = await axios.post(ext + '/api/checkout', {
          id,
          amount: data.price,
        });
        console.log(response);
        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(Error);
      }
    } else {
      console.log(error);
    }
    setLoading(false);
*/
export function ModalPay() {
  return <div></div>;
}
