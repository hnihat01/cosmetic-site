import React from 'react';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const AddToCart = ({ productIds, style, isProductDetailsInfo }) => {
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    try {
      const response = await fetch('http://localhost:8080/cart/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productIds }), // Convert productIds to JSON format
      });

      if (!response.ok) {
        throw new Error('Failed to add products to cart');
      }

      const data = await response.json();
      console.log(data.message); // Log success message
      navigate('/cart');
    } catch (error) {
      console.error('Error adding products to cart:', error.message);
    }
  };

  const StyledIconButton = styled(IconButton)(({ theme }) => ({
    borderRadius: '50%',
    color: 'white',
    backgroundColor: '#745a50',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    margin: '0', // Ensure no additional margin
    padding: '10px', // Adjust padding for better visibility

    '&:hover': {
      backgroundColor: '#977568',
    },
    '&:focus': {
      backgroundColor: '#e7dbd7',
      color: '#745a50',
    },
    ...style, // Apply additional styles passed via props

    ...(isProductDetailsInfo && {
      borderRadius: '4px',
      fontFamily: 'Vivaldi',
      width: '80%',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      
    }),
  }));

  return (
    <StyledIconButton
      aria-label="Add to Cart"
      size="medium"
      onClick={handleAddToCart}
    > 
    <ShoppingCartIcon />
      {isProductDetailsInfo && <span style={{ marginRight: '5px' }}>Add To Cart</span>}
     
    </StyledIconButton>
  );
};

export default AddToCart;
