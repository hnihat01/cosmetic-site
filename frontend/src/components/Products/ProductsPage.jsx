import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import ProductCards from '../Homepage/ProductCards'; // Import the ProductCards component

const ProductsPage = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/feed/products`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.posts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    searchQuery
      ? product.pname && product.pname.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );
  return (
    <Box sx={{ padding: '50px' }}>
      <Typography
        variant="h4"
        sx={{ marginTop: '7vh', marginLeft: '2%', color: '#745a50', fontFamily: 'Vivaldi' }}
      >
        All Products
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          gap: '1px',
        }}
      >
        {loading ? (
          <Typography variant="body1">Loading...</Typography>
        ) : (
          filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Box
                key={product._id}
                sx={{
                  flex: '1 0 calc(20% - 4px)',
                  margin: '1px',
                  boxSizing: 'border-box',
                  maxWidth: 'calc(23% - 40px)',
                  '@media (max-width: 1200px)': {
                    flex: '1 0 calc(23% - 2px)',
                    maxWidth: 'calc(35% - 2px)',
                  },
                  '@media (max-width: 768px)': {
                    flex: '1 0 calc(45% - 2px)',
                    maxWidth: 'calc(55% - 2px)',
                  },
                  '@media (max-width: 480px)': {
                    flex: '1 0 calc(10% - 1px)',
                    maxWidth: 'calc(10% - 1px)',
                  },
                  '@media (max-width: 380px)': {
                    flex: '1 0 calc(10% - 1px)',
                    maxWidth: 'calc(20% - 1px)',
                  },
                }}
              >
                <ProductCards
                  productId={product._id}
                  imageUrl={`http://localhost:8080/images/${product.imageUrl}`}
                  title={product.pname}
                  brand={product.brand}
                  salePrice={product.category === 'Sale' ? (product.price * 0.8).toFixed(2) : product.price}
                  price={product.price}
                  milliliters={product.milliliters}
                  rating={product.rating}
                  saleLabel={product.category === 'Sale'}
                />
              </Box>
            ))
          ) : (
            <Typography variant="body1">No products available</Typography>
          )
        )}
      </Box>
    </Box>
  );
};

export default ProductsPage;
