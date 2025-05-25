import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.product === product.product);
      if (existing) {
        const updatedItems = prevItems.map((item) =>
          item.product === product.product
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedItems));
        return updatedItems;
      }
      const newItems = [...prevItems, product];
      localStorage.setItem("cart", JSON.stringify(newItems));
      return newItems;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter(
        (item) => item.product !== productId
      );
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const updateCartItem = (productId, quantity) => {
    const qty = Number(quantity);
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.product === productId ? { ...item, quantity: qty } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
