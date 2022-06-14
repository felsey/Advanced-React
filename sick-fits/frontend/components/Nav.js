import Link from 'next/link';
import SignOut from './SignOut';
import SignUp from './SignUp';
import NavStyles from './styles/NavStyles';
import useUser from './User';

const Nav = () => {
  const user = useUser();

  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
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
