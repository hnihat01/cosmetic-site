import React, { Fragment, useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductCards from './ProductCards';
import Title from './Title';

const Proba = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from backend API when component mounts
    fetch('http://localhost:8080/feed/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then(data => {
        // Update state with fetched products
        setProducts(data.posts);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 10,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  return (
    <Fragment>
      <Title title="Trending Products" marginTop="4%" />
      <div style={{ position: 'relative' }}>
        
          {products.map(product => (
            <div key={product._id}>
              <ProductCards
                imageUrl={product.imageUrl}
                title={product.pname}
                brand={product.brand}
                price={product.price}
                milliliters={product.milliliters}
                rating={product.rating}
                productId={product._id}
              />
            </div>
          ))}
        
      </div>
    </Fragment>
  );
};

export default Proba;
