import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from '../lib/cartState';
import CartCount from './CartCount';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import useUser from './User';

const Nav = () => {
  const { toggleCart } = useContext(CartContext);
  const user = useUser();
  const cartCount = user?.cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
          <button type="button" onClick={toggleCart}>
            My cart <CartCount count={cartCount} />
          </button>
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign in</Link>
          <Link href="/signup">Sign up</Link>
        </>
      )}
    </NavStyles>
  );
};

export default Nav;
