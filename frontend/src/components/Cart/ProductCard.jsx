import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import Quantity from './Quantity';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductCard = ({ cartItem, onDelete }) => {
  const pricePerMilliliter = cartItem.price / cartItem.milliliters; // Calculate price per milliliter
  const pricePerLiter = pricePerMilliliter * 1000; // Calculate price for 1 liter

  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [totalPrice, setTotalPrice] = useState();
  // const [total, setTotal]=useState(cartItem.)
 
  useEffect(() => {
    // Update the total price whenever the quantity or price changes
  //  const newTotalPrice = pricePerMilliliter * quantity;
    const total= (cartItem.price * quantity).toFixed(2);
    setTotalPrice(total);
   
  }, [pricePerMilliliter, quantity, cartItem.price, cartItem.quantity]);

  // const handleQuantityChange = (newQuantity) => {
  //   setQuantity(newQuantity); // Update the local state with the new quantity
  //   window.location.reload();
  // };

  const handleQuantityChange = async (newQuantity) => {
    setQuantity(newQuantity); // Update the local state with the new quantity
    
    try {
      const response = await fetch(`http://localhost:8080/cart/products/qty/${cartItem._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update product quantity');
      }
  
      const updatedProduct = await response.json();
      console.log('Updated product quantity:', updatedProduct);
  
      // Perform silent reload
      window.location.reload(false);
    } catch (error) {
      console.error('Error updating product quantity:', error);
      // Handle error condition (e.g., show error message to user)
    }
  };
  
  const handleDeleteClick = async () => {
    try {
      // Make an HTTP DELETE request to your backend API
      const response = await fetch(`http://localhost:8080/cart/products/${cartItem._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      // Call the onDelete callback provided by the parent component
      if (onDelete) {
        onDelete(cartItem._id); // Pass the deleted product ID to parent component
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
 // console.log(`${cartItem.imageUrl}`);

  // const totalFormatted = (totalPrice).toFixed(2); // Format total price with 2 decimal places

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', marginBottom: '10px', marginLeft: '15%' }}>
      <Card sx={{ width: '65vw', display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <IconButton
          aria-label="delete"
          style={{ position: 'absolute', top: '8px', right: '8px', zIndex: 1 }}
          onClick={handleDeleteClick}
        >
          <DeleteIcon />
        </IconButton>
        <CardMedia
          component="img"
          sx={{ marginLeft: '3%', width: 70, height: 170, objectFit: 'cover' }}
          image={`http://localhost:8080/images/${cartItem.imageUrl}`}
          alt={cartItem.pname}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '16px', width: '90%' }}>
          <CardContent>
            <Typography variant="subtitle1">
              {cartItem.brand}
            </Typography>
            <Typography variant="h5">
              {cartItem.pname}, {cartItem.milliliters}ml
            </Typography>      
            <Typography variant="subtitle2" color="text.secondary">
              <i>{cartItem.milliliters} ml (${pricePerLiter.toFixed(2)} for 1 liter)</i>
            </Typography>
            <Typography variant="subtitle2" color="black">
              <i> ${cartItem.price} for 1pc</i>
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <Quantity qty={quantity} productId={cartItem._id} onQuantityChange={handleQuantityChange}/>
              <Typography variant="subtitle1" color="text.secondary" style={{ marginLeft: '20px', flex: 1, textAlign: 'right' }}>
                Total Price ${totalPrice}
              </Typography>
            </div>
          </CardContent>
        </Box>
      </Card>
    </div>
  );
};

export default ProductCard;
