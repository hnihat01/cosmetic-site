import React,{useState} from 'react';
import { Box, Typography } from '@mui/material';
import AddToFavorite from '../Homepage/AddToFavorite';

const ProductImages = ({ product, selectedImage, handleImageClick }) => {
  const name = product.pname;
  const isOnSale = product.category === 'Sale';
  const [likedProducts, setLikedProducts] = useState(new Set());

  const handleFavoriteChange = (productId, isFavorited) => {
    const updatedLikedProducts = new Set(likedProducts);

    if (isFavorited) {
      updatedLikedProducts.add(productId);
    } else {
      updatedLikedProducts.delete(productId);
    }

    setLikedProducts(updatedLikedProducts);
  };
  return (
    <>
      {/* Product image container */}
      <Box sx={{ flex: '0 0 auto', marginRight: '50px', position: 'relative' }}>
        {isOnSale && (
         <Typography
         variant="body2"
         sx={{
           position: 'absolute',
           top: 0,
           left: 0,
           backgroundColor: 'red',
           color: 'white',
           padding: '5px',
           fontSize: '16px',
           fontWeight:500,
           width: '60px',
           textAlign: 'center', // Center the text horizontally
           borderRadius: '5px', // Add border radius to the corners
           zIndex: 1,
         }}
       >
            Sale
          </Typography>
        )}
        <AddToFavorite
          productId={product._id}
          brand={product.brand}
          milliliters={product.milliliters}
          pname={product.pname}
          price={product.price}
          imageUrl={product.imageUrl}
          onFavoriteChange={handleFavoriteChange}
          favorite={likedProducts.has(product.productId)}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 2,
          }}
        />
        {/* Main large image */}
        <img
          src={`http://localhost:8080/images/${selectedImage}`}
          alt={name}
          style={{
            width: '35vw',
            height: '35vw',
            objectFit: 'contain', // Display entire image within the container
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onClick={() => handleImageClick(product.imageUrl)}
        />
      </Box>

      {/* Small images gallery below the main image */}
      <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '20%', marginRight: '5%' }}>
        {product.imageUrl && (
          <img
            key={product.imageUrl}
            src={`http://localhost:8080/images/${product.imageUrl}`}
            alt={product.pname}
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'contain',
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom: '10px',
            }}
            onClick={() => handleImageClick(product.imageUrl)}
          />
        )}
        {product.secondImage && (
          <img
            key={product.secondImage}
            src={`http://localhost:8080/images/${product.secondImage}`}
            alt={product.pname}
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'contain',
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom: '10px',
            }}
            onClick={() => handleImageClick(product.secondImage)}
          />
        )}
        {product.thirdImage && (
          <img
            key={product.thirdImage}
            src={`http://localhost:8080/images/${product.thirdImage}`}
            alt={product.pname}
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'contain',
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom: '10px',
            }}
            onClick={() => handleImageClick(product.thirdImage)}
          />
        )}
      </Box>
    </>
  );
};

export default ProductImages;
