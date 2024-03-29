import useFetch from 'react-fetch-hook';
import { ItemForm } from '../item-form/ItemForm';

const ext = 'https://flores-phylo-books.herokuapp.com';

export function ItemContainer() {
  const { isLoading, data, error } = useFetch(ext + '/api/products');
  if (data) {
    return (
      <div className="container p-4">
        <div className="row">
          <h1>E-commerce app</h1>
          <h2>Most recent</h2>
          {data.map((product) => {
            return <ItemForm key={product._id} product={product} />;
          })}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <div>Something went wrong, try again later...</div>;
  }
  return <div></div>;
}
