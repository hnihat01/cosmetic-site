import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, Box } from '@mui/material';
import FavouriteCard from './FavouriteCard';

const FavouritePage = () => {
  const [cartItems, setCartItems] = useState([]);


  // UseEffect to fetch cart data when component mounts
  useEffect(() => {
    // Fetch cart data from backend when component mounts
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const response = await fetch('http://localhost:8080/favorite/products');
      if (!response.ok) {
        throw new Error('Failed to fetch cart data');
      }
      const data = await response.json();
  
      // Check if 'items' array exists in the response
      if (data && data.items) {
        setCartItems(data.items); // Set 'items' array to cartItems
      } else {
        console.error('No items found in API response');
      }
    } catch (error) {
      console.error('Error fetching cart data:', error.message);
    }
  };
  return (
    <Box sx={{ display: 'flex', alignItems: 'right', padding: '80px' }}>
      <div style={{ marginTop: '50px' }}>
      <Typography variant="h4" sx={{ marginTop: '1px', marginLeft:'16%',  color: '#745a50', fontFamily: 'Vivaldi'}}>
          Favourites
        </Typography>
        <List>
        {cartItems && cartItems.map((item) => (
          <ListItem key={item.productId}>
            <FavouriteCard key={item._id} cartItem={item} />
          </ListItem>
        ))}

        </List>
      </div>
    </Box>
  );
};

export default FavouritePage;
