import { useContext } from 'react';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import useUser from './User';
import CartItem from './CartItem';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';
import { CartContext } from '../lib/cartState';
import CloseButton from './styles/CloseButton';

const Cart = () => {
  const me = useUser();
  const { cartOpen, toggleCart } = useContext(CartContext);

  if (!me) return null;

  const renderedCartItems = me.cart.map((item) => (
    <CartItem
      key={item.id}
      cartItemId={item.id}
      product={item.product}
      quantity={item.quantity}
    />
  ));

  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{`${me.name}'s cart`.toUpperCase()}</Supreme>
      </header>
      <CloseButton type="button" onClick={toggleCart}>
        &times;
      </CloseButton>
      <ul>{renderedCartItems}</ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
      </footer>
    </CartStyles>
  );
};

export default Cart;
