// import React from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import ProductCards from './ProductCards'; // Assuming you have a ProductCards component

// const ProductCarousel = ({ products }) => {
//     const settings = {
//         dots: false,
//         infinite: true,
//         speed: 1500, // Adjust speed of scrolling (milliseconds)
//         autoplay: false, // Disable autoplay for manual control
//         slidesToShow: 4, // Number of products shown at once
//         slidesToScroll: 1,
//         variableWidth: true,
//         useTransform: true,
//         vertical: false, // Horizontal scrolling
//         nextArrow: <NextArrow />,
//         prevArrow: <PrevArrow />
//     };

//     const NextArrow = ({ onClick }) => (
//         <button className="slick-arrow slick-next" onClick={onClick}>
//             Next
//         </button>
//     );

//     const PrevArrow = ({ onClick }) => (
//         <button className="slick-arrow slick-prev" onClick={onClick}>
//             Previous
//         </button>
//     );

//     return (
//         <Slider {...settings}>
//             {products.map(product => (
//                 <div key={product._id} style={{ padding: '0 10px' }}>
//                     <ProductCards
//                         imageUrl={product.imageUrl}
//                         title={product.title}
//                         brand={product.brand}
//                         price={product.price}
//                     />
//                 </div>
//             ))}
//         </Slider>
//     );
// };

// export default ProductCarousel;
