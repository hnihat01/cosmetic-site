import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import ProductImages from './ProductImages';
import ProductDetailsInfo from './ProductDetailsInfo';
import TabComponent from './TabComponent';
const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/feed/posts/products/${productId}`);
        const data = await response.json();
        setProduct(data.product);
        setSelectedImage(data.product.imageUrl); // Set initial selected image
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProductDetails();
  }, [productId]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleAddToCart = () => {
    console.log('Product added to cart:', product);
    // Implement logic to add product to cart
  };

  const handleAddToFavorites = () => {
    console.log('Product added to favorites:', product);
    // Implement logic to add product to favorites
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '80px',
      }}
    >
      {/* Product image container */}
      <ProductImages
        product={product}
        selectedImage={selectedImage}
        handleImageClick={handleImageClick}
      />

      {/* Product information container on the right */}
      <ProductDetailsInfo
        product={product}
        selectedImage={selectedImage}
        handleAddToCart={handleAddToCart}
        handleAddToFavorites={handleAddToFavorites}
      />
    </Box>
    <TabComponent product={product}/>
    </>
  );
};

export default ProductDetails;
