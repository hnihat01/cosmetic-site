import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Link } from '@mui/material';
import AddToCart from '../Homepage/AddToCart';
import { Link as RouterLink } from 'react-router-dom';

const FavouriteCard = ({ cartItem }) => {
  const pricePerMilliliter = cartItem.price / cartItem.milliliters;
  const pricePerLiter = pricePerMilliliter * 1000;

  const [quantity, setQuantity] = useState(cartItem.quantity);

  useEffect(() => {
    const total = (cartItem.price * quantity).toFixed(2);
  }, [pricePerMilliliter, quantity, cartItem.price]);

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', marginBottom: '10px', marginLeft: '15%' }}>
      <Card sx={{ width: '65vw', display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <CardMedia
          component="img"
          sx={{ marginLeft: '3%', width: 70, height: 170, objectFit: 'cover' }}
          image={cartItem.imageUrl}
          alt={cartItem.pname}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '16px', width: '90%' }}>
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
              <AddToCart productIds={[cartItem.productId]} />
            </div>
            <Typography variant="subtitle1">
              {cartItem.brand}
            </Typography>
            {/* Use RouterLink without underline */}
            <Link
              component={RouterLink}
              to={`/feed/posts/products/${cartItem.productId}`}
              sx={{ textDecoration: 'none', color: '#685148', fontFamily: 'Vivaldi', fontSize: '18px' }} // Remove underline
            >
              <Typography variant="h5" sx={{ textDecoration: 'none', color: '#685148', fontFamily: 'Vivaldi' }}>
                {cartItem.pname}, {cartItem.milliliters}ml
              </Typography>
            </Link>
            <Typography variant="subtitle2" color="text.secondary">
              <i>{cartItem.milliliters} ml (${pricePerLiter.toFixed(2)} for 1 liter)</i>
            </Typography>
            <Typography variant="subtitle2" color="black">
              <i>${cartItem.price} for 1pc</i>
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </div>
  );
};

export default FavouriteCard;
