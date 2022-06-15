import { createContext, useState } from 'react';

export const CartContext = createContext({
  cartOpen: true,
});

export const CartStateProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const value = {
    cartOpen,
    toggleCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
