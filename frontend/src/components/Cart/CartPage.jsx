import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, Box } from '@mui/material';
import ProductCard from './ProductCard';
import OrderButton from '../Orders/OrderButton';
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleDeleteCartItem = (deletedItemId) => {
    // Filter out the deleted item from the cartItems array
    const updatedCartItems = cartItems.filter(item => item._id !== deletedItemId);
    setCartItems(updatedCartItems);
  };

  // UseEffect to fetch cart data when component mounts
  useEffect(() => {
    // Fetch cart data from backend when component mounts
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const response = await fetch('http://localhost:8080/cart/products'); // Adjust URL to your backend API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch cart data');
      }
      const data = await response.json();
      setCartItems(data.cartItems); // Assuming backend response includes cartItems array
    } catch (error) {
      console.error('Error fetching cart data:', error.message);
    }
  };
 // Function to calculate the total amount
 const calculateTotalAmount = () => {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
};
  return (
    <Box sx={{ display: 'flex', alignItems: 'right', padding: '80px' }}>
      <div style={{ marginTop: '10px' }}>
        <Typography variant="h4" sx={{ marginTop: '1px', marginLeft:'16%',  color: '#745a50', fontFamily: 'Vivaldi'}}>
          Shopping Cart
        </Typography>
        <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: '16%',
          width: '100%',
          maxWidth: 940,
          marginTop: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '10px',
        }}
      >
  <div>
    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#745a50', fontFamily: 'Vivaldi' }}>
      Total Amount
    </Typography>
    <Typography  sx={{ fontWeight: 'bold', color: 'gray', fontFamily: 'Vivaldi' }}>
      Including VAT
    </Typography>
  </div>
  <div style={{ marginLeft: 'auto' }}>
  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#745a50', fontFamily: 'Vivaldi', marginLeft:'10px' }}>
      ${calculateTotalAmount()}
    </Typography>
    <OrderButton products={cartItems} />
  </div>
</Box>



        <List>
          {cartItems.map((item) => (
            <ListItem key={item.productId}>
             <ProductCard key={item._id} cartItem={item} onDelete={handleDeleteCartItem} />
            </ListItem>
          ))}
        </List>
      </div>
      
    </Box>
  );
};

export default CartPage;
