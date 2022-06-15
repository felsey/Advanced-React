/* eslint-disable react/prop-types */
import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProject';
import AddToCart from './AddToCart';

const Product = ({ product }) => {
  const { name, description, photo, price, id, status } = product;

  return (
    <ItemStyles>
      <Link href={`/product/${product.id}`}>
        <div>
          <img src={photo.image.publicUrlTransformed} alt={name} />
          <Title>
            <Link href={`/product/${product.id}`}>{name}</Link>
          </Title>
          <PriceTag>{formatMoney(price)}</PriceTag>
          <p>{description}</p>{' '}
        </div>
      </Link>
      <div className="buttonList">
        <Link
          href={{
            pathname: '/update',
            query: {
              id: product.id,
            },
          }}
        >
          Edit ✏️
        </Link>
        <DeleteProduct product={product}>Delete product</DeleteProduct>
        <AddToCart id={product.id} />
      </div>
    </ItemStyles>
  );
};

export default Product;
