import React, { Fragment, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCards from '../Homepage/ProductCards';
import Title from '../Homepage/Title';
import { useParams } from 'react-router-dom';

const SimilarProducts = () => {
    const { productId } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/feed/posts/products/${productId}/similar`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        const similarProducts = data.products.slice(0, 5);
        setProducts(similarProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchSimilarProducts();
  }, [productId]);

  return (
    <Fragment>
      <Title title="YOU MAY ALSO LIKE" marginTop="4%" />
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {products.length > 0 ? (
          products.map(product => (
            <motion.div key={product._id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ margin: '10px' }}>
              <ProductCards
                imageUrl={`http://localhost:8080/images/${product.imageUrl}`}
                title={product.pname}
                brand={product.brand}
                salePrice={product.category === 'Sale' ? (product.price * 0.8).toFixed(2) : product.price} // Apply 20% discount if the category is 'Sale'
                price={product.price}                
                milliliters={product.milliliters}
                productId={product._id}
                rating={product.rating}
                saleLabel={product.category === 'Sale'} // Pass a prop to indicate if the product is on sale

              />
            </motion.div>
          ))
        ) : (
          <p>Loading similar products...</p>
        )}
      </div>
    </Fragment>
  );
};

export default SimilarProducts;
