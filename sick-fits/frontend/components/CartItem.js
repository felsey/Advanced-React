/* eslint-disable react/prop-types */

import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';
import RemoveFromCart from './RemoveFromCart';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
    width: 100px;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartItem = ({ product, quantity, cartItemId }) => {
  const { name, photo, price } = product;
  if (!product) return null;

  return (
    <CartItemStyles>
      <div>
        <img src={photo.image.publicUrlTransformed} alt={name} />
        <h3>{name}</h3>
        <p>
          {formatMoney(price * quantity)} (
          <em>
            {quantity} &times; {formatMoney(price)}
          </em>{' '}
          each)
        </p>
      </div>
      <RemoveFromCart cartItemId={cartItemId} />
    </CartItemStyles>
  );
};

export default CartItem;
