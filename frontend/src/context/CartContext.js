import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const addToCart = (product, quantity, rentalStartDate, rentalEndDate) => {
    const existingItem = cartItems.find(item => 
      item.product._id === product._id &&
      item.rentalStartDate === rentalStartDate &&
      item.rentalEndDate === rentalEndDate
    );

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.product._id === product._id &&
        item.rentalStartDate === rentalStartDate &&
        item.rentalEndDate === rentalEndDate
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        product,
        quantity,
        rentalStartDate,
        rentalEndDate
      }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.product._id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId, quantity) => {
    setCartItems(cartItems.map(item =>
      item.product._id === productId
        ? { ...item, quantity }
        : item
    ));
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Get cart total
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      // Calculate rental duration
      const start = new Date(item.rentalStartDate);
      const end = new Date(item.rentalEndDate);
      const durationInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      
      let pricePerUnit = 0;
      let duration = 1;
      
      if (durationInDays < 1) {
        const hours = Math.ceil((end - start) / (1000 * 60 * 60));
        pricePerUnit = item.product.rentalPricing?.hourly || 0;
        duration = hours;
      } else if (durationInDays < 7) {
        pricePerUnit = item.product.rentalPricing?.daily || 0;
        duration = durationInDays;
      } else {
        const weeks = Math.ceil(durationInDays / 7);
        pricePerUnit = item.product.rentalPricing?.weekly || 0;
        duration = weeks;
      }
      
      return total + (pricePerUnit * item.quantity * duration);
    }, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    cartCount: cartItems.length
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
