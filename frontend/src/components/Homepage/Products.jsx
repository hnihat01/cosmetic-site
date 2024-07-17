import React, { Fragment, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductCards from './ProductCards';
import Title from './Title';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'; // Import Bootstrap Chevron icons

const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        // Fetch products from backend API when component mounts
        fetch('http://localhost:8080/feed/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                return response.json();
            })
            .then(data => {
                // Update state with fetched products
                setProducts(data.posts);
             //   console.log(data.posts);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []); // Empty dependency array ensures useEffect runs only once on component mount

    const settings = {
        infinite: true,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 1,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
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

    const handleNext = () => {
        slider.slickNext();
    };

    const handlePrev = () => {
        slider.slickPrev();
    };

    let slider; // Reference to the Slider component
  
//  <Link to={`/feed/posts/products/${product._id}`}>

    return (
        <Fragment>
            <Title title="Trending Products" marginTop="4%"  />
            <div style={{ position: 'relative' }}>
                <Slider ref={c => (slider = c)} {...settings}>
                {products.map(product => (
            <motion.div key={product._id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <ProductCards
                productId={product._id}
                  imageUrl={`http://localhost:8080/images/${product.imageUrl}`}
                  title={product.pname}
                  brand={product.brand}
                  salePrice={product.category === 'Sale' ? (product.price * 0.8).toFixed(2) : product.price} // Apply 20% discount if the category is 'Sale'
                  price={product.price}
                  milliliters={product.milliliters}
                  rating={product.rating}
                  saleInfo={product.saleInfo} // Pass the saleInfo prop
                  saleLabel={product.category === 'Sale'}
                />
            </motion.div>
          ))}
                </Slider>
                <motion.div
                    className="arrow-container"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        left: 0,
                        right: 0,
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0 20px'
                    }}
                >
                    <motion.div
                        className="arrow-button"
                        onClick={handlePrev}
                        whileTap={{ scale: 0.8 }}
                        style={{
                            borderRadius: '50%',
                            background: 'rgba(0, 0, 0, 0.5)',
                            padding: '10px',
                            cursor: 'pointer'
                        }}
                    >
                        <BsChevronLeft style={{ fontSize: '2rem', color: '#fff' }} />
                    </motion.div>
                    <motion.div
                        className="arrow-button"
                        onClick={handleNext}
                        whileTap={{ scale: 0.8 }}
                        style={{
                            borderRadius: '50%',
                            background: 'rgba(0, 0, 0, 0.5)',
                            padding: '10px',
                            cursor: 'pointer'
                        }}
                    >
                        <BsChevronRight style={{ fontSize: '2rem', color: '#fff' }} />
                    </motion.div>
                </motion.div>
            </div>
        </Fragment>
    );
};

export default Products;
