import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import CustomRating from '../Homepage/CustomRating';
import ShareIcons from './ShareIcons';
import AddToCart from '../Homepage/AddToCart';

const ProductDetailsInfo = ({ product, selectedImage, handleAddToCart, handleAddToFavorites }) => {
  return (
    <Box sx={{ marginTop: '3%' }}>
      <Typography variant="body1" sx={{ fontSize: '18px', fontWeight: 'italic', color: '#4B4D4E', fontFamily: 'Vivaldi' }}>
        {product.brand}
      </Typography>
      <Typography variant="h6" sx={{ fontSize: '44px', fontWeight: 'italic', marginBottom: '5px', color: '#685148', fontFamily: 'Vivaldi' }}>
        {product.pname}, {product.milliliters}ml
      </Typography>
      <Typography sx={{marginBottom:'5px'}}>
        <CustomRating productId={product.id} initialValue={product.rating} />
      </Typography>
      {product.description && (
        <Typography variant="body1" sx={{ fontSize: '22px', color: '#4B4D4E', marginTop: '5px', fontFamily: 'Vivaldi' }}>
          {product.description}
        </Typography>
      )}
         <ShareIcons product={product} />
         <Typography variant="body1" sx={{ fontSize: '20px', color: '#685148', fontFamily: 'Vivaldi', marginTop: '1%' }}>
        <italic>1 pc ({product.price}$ for {product.milliliters}ml)</italic>
      </Typography>
      <Typography variant="body1" sx={{ fontSize: '30px', color: '#685148', fontFamily: 'Vivaldi', marginTop: '3%' }}>
        {product.category === 'Sale' ? (
          <>
            <strong>${(product.price * 0.8).toFixed(2)} | </strong>
            <strong style={{ textDecoration: 'line-through', marginRight: '10px', color: 'gray' }}>
              ${product.price}
            </strong>
          </>
        ) : (
          <strong>{product.price} $</strong>
        )}
      </Typography>
    

      <Box sx={{ marginTop: '30px', display: 'flex', justifyContent: 'center', width: '35vw' }}>
        <AddToCart productIds={[product._id]} isProductDetailsInfo={true} />
      </Box>
    </Box>
  );
};

export default ProductDetailsInfo;
