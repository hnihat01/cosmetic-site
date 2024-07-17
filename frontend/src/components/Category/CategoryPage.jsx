import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCards from '../Homepage/ProductCards'; // Import the ProductCards component
import { Box, Typography } from '@mui/material';

function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/feed/posts/${category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        // Apply 20% sale if the category is 'sale'
        if (category === 'Sale') {
          data.forEach(product => {
            product.saleInfo = { discountPercentage: 20 };
          });
        }
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <Box sx={{ padding: '50px' }}>
      <Typography variant="h4" align="left" sx={{ marginBottom: '20px', marginTop: '20px' }}>
        {category} Products
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start', // Align products starting from the left
          gap: '1px', // Adjust the gap between products
        }}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <Box
              key={product._id}
              sx={{
                flex: '1 0 calc(20% - 4px)', // Adjusted flex basis to account for the gap and margin
                margin: '1px', // Adjusted margin between products to 1px
                boxSizing: 'border-box',
                maxWidth: 'calc(23% - 40px)', // Adjusted maxWidth to account for the gap and margin
                '@media (max-width: 1200px)': {
                  flex: '1 0 calc(23% - 2px)', // Adjusted flex basis for medium screens
                  maxWidth: 'calc(35% - 2px)', // Adjusted maxWidth for medium screens
                },
                '@media (max-width: 768px)': {
                  flex: '1 0 calc(45% - 2px)', // Adjusted flex basis for small screens
                  maxWidth: 'calc(55% - 2px)', // Adjusted maxWidth for small screens
                },
                '@media (max-width: 480px)': {
                  flex: '1 0 calc(10% - 1px)', // Adjusted flex basis for very small screens
                  maxWidth: 'calc(10% - 1px)', // Adjusted maxWidth for very small screens
                },
                '@media (max-width: 380px)': {
                  flex: '1 0 calc(10% - 1px)', // Adjusted flex basis for very small screens
                  maxWidth: 'calc(20% - 1px)', // Adjusted maxWidth for very small screens
                },
              }}
            >
              <ProductCards
                productId={product._id}
                imageUrl={`http://localhost:8080/images/${product.imageUrl}`}
                title={product.pname}
                brand={product.brand}
                salePrice={(product.price * 0.8).toFixed(2)}
                price={product.price}
                milliliters={product.milliliters}
                rating={product.rating}
                saleInfo={product.saleInfo} // Pass the saleInfo prop
                saleLabel={product.category === 'Sale'}
              />
            </Box>
          ))
        ) : (
          <Typography variant="body1">No products available</Typography>
        )}
      </Box>
    </Box>
  );
}

export default CategoryPage;
