import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

const AddToFavorite = ({ productId, price, brand, milliliters, pname,imageUrl, onFavoriteChange, userId }) => {
  const [favorite, setFavorite] = useState(() => {
    // Initialize favorite state from local storage or default to false
    const storedFavorite = localStorage.getItem(`favorite_${productId}`);
    return storedFavorite ? JSON.parse(storedFavorite) : false;
  });

  useEffect(() => {
    // Store favorite state in local storage whenever it changes
    localStorage.setItem(`favorite_${productId}`, JSON.stringify(favorite));
  }, [productId, favorite]);
  const handleAddToFavorites = async () => {
    try {
      const response = await fetch('http://localhost:8080/favorite/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId, // Custom header for userId

        },
        credentials: 'include',
        body: JSON.stringify({
          productId,
          price,
          brand,
          milliliters,
          pname,
          imageUrl,
          favorite: !favorite,
          userId
        }),
      });
      const data = await response.json();
      console.log('addToCart', data)
      if (!response.ok) {
        throw new Error('Failed to add product to favorites');
      }

      setFavorite(!favorite);
      onFavoriteChange(productId, true);
      console.log(favorite);
    } catch (error) {
      console.error('Error adding product to favorites:', error.message);
    }
  };


  return (
    <IconButton
      aria-label="Like minimal photography"
      size="medium"
      onClick={handleAddToFavorites}
      sx={{
        position: 'absolute',
        zIndex: 2,
        right: '.2rem',
        top: '.5%',
        transform: 'translateY(50%)',
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: '#a18377',
          color: '#eae3e1',
        },
        '&:focus': {
          backgroundColor: '#e7dbd7',
          color: '#745a50',
        },
        color: favorite ? 'red' : 'inherit', // Set color based on favorite status
      }}
    >
      <FavoriteIcon />
    </IconButton>
  );
};

export default AddToFavorite;
