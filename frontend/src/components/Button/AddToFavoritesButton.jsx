import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

const AddToFavoritesButton = ({ productId, price, brand, milliliters, pname, imageUrl, onFavoriteChange }) => {
  const [favorite, setFavorite] = useState(() => {
    const storedFavorite = localStorage.getItem(`favorite_${productId}`);
    return storedFavorite ? JSON.parse(storedFavorite) : false;
  });

  useEffect(() => {
    localStorage.setItem(`favorite_${productId}`, JSON.stringify(favorite));
  }, [productId, favorite]);

  const handleAddToFavorites = async () => {
    try {
      const response = await fetch('http://localhost:8080/favorite/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          price,
          brand,
          milliliters,
          pname,
          imageUrl,
          favorite: !favorite,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add product to favorites');
      }

      setFavorite(!favorite);
      onFavoriteChange(productId, !favorite);

    } catch (error) {
      console.error('Error adding product to favorites:', error.message);
    }
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={handleAddToFavorites}
      sx={{
        fontFamily: 'Vivaldi',
        color: '#745a50',
        borderColor: '#745a50',
        width: '45%',
        marginLeft: '20px',
        '&:hover': {
          backgroundColor: '#f5f1f0',
          borderColor: '#745a50',
        },
      }}
    >
      {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </Button>
  );
};

export default AddToFavoritesButton;
