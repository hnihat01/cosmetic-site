import React, { Fragment, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import ProductCards from '../Homepage/ProductCards';
import Title from '../Homepage/Title';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'; // Import Bootstrap Chevron icons

const Get = () => {
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

    const handleNext = () => {
        slider.slickNext();
    };

    const handlePrev = () => {
        slider.slickPrev();
    };

    let slider; // Reference to the Slider component
  

    return (
        <Fragment>
            <Title title="Trending Products" marginTop="4%" />
            <div style={{ position: 'relative' }}>
                <Slider ref={c => (slider = c)} {...settings}>
                    {products.map(product => (
                        <Link to={`/feed/posts/products/${product._id}`} key={product._id}>
                            {/* Wrap ProductCards component with Link to navigate to new product page */}
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <ProductCards
                                    imageUrl={product.imageUrl}
                                    title={product.pname}
                                    brand={product.brand}
                                    price={product.price}
                                />
                            </motion.div>
                        </Link>
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

export default Get;
