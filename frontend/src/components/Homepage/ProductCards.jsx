import * as React from 'react';
import { useState, useContext } from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import CustomRating from './CustomRating';
import ImageDisplay from './ImageDisplay';
import { Link as RouterLink } from 'react-router-dom';
import AddToCart from './AddToCart';
import AddToFavorite from './AddToFavorite';
import { IconButton } from '@mui/material';
 import UserContext from '../Auth/UserContext';

export default function ProductCards(props) {
  const { productId, imageUrl, title, brand, price, milliliters, rating, saleInfo, saleLabel, salePrice } = props;
  const [likedProducts, setLikedProducts] = useState(new Set());
  const { userId } = useContext(UserContext);

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
    <Card
      variant="elevation"
      borderradius="10px"
      sx={{
        width: '60%',
        marginTop: '1%',
        marginBottom: '3%',
        marginLeft: '1%',
        color: '#745a50',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {saleLabel && (
        <IconButton
          size="small"
          sx={{
            position: 'absolute',
            left: '5px',
            zIndex: '999',
            top: '5px',
            backgroundColor: '#FF0000',
            borderRadius: '4px',
            width: '65px',
            height: '25px'
          }}
        >
          <Typography variant="body2" sx={{ color: '#FFFFFF' }}>Sale</Typography>
        </IconButton>
      )}

      <CardOverflow sx={{ flex: '1', position: 'relative' }}>
        <Link
          component={RouterLink}
          to={`http://localhost:3000/feed/posts/products/${productId}`}
          sx={{ color: '#685148', fontFamily: 'Vivaldi', fontSize: '18px' }}
        >
          <ImageDisplay imageUrl={imageUrl} />
        </Link>
        <AddToFavorite
          productId={productId}
          brand={brand}
          milliliters={milliliters}
          pname={title}
          price={price}
          imageUrl={imageUrl}
          onFavoriteChange={handleFavoriteChange}
          favorite={likedProducts.has(productId)}
          userId={userId}
        />
        <div style={{ position: 'absolute', top: '90%', right: '10px' }}>
          <AddToCart productIds={[productId]} />
        </div>
      </CardOverflow>
      <CardContent sx={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography variant="body-sm" sx={{ marginBottom: '-3%' }}>
          <Link
            component={RouterLink}
            to={`http://localhost:3000/feed/posts/products/${productId}`}
            sx={{ color: '#685148', fontFamily: 'Vivaldi', fontSize: '18px', fontWeight: 'bold', textDecoration: 'none' }}
          >
            {salePrice && saleLabel ? (
              <>
                <span style={{ marginRight: '5px' }}>${salePrice} | </span>
                <span style={{ textDecoration: 'line-through', marginLeft: '3px', color: 'gray' }}> ${price}</span>
              </>
            ) : (
              `$${price}`
            )}
          </Link>
        </Typography>
        <Typography variant="subtitle1">
          <Link href="#multiple-actions" underline="none" sx={{ color: '#4B4D4E', fontFamily: 'Vivaldi', fontSize: '12px' }}>
            {brand}
          </Link>
        </Typography>
        <Typography variant="body1" sx={{ flex: '1', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          <Link
            component={RouterLink}
            to={`http://localhost:3000/feed/posts/products/${productId}`}
            sx={{ color: '#685148', fontFamily: 'Vivaldi', fontSize: '18px', textDecoration: 'none' }}
          >
            {title}, {milliliters}ml
          </Link>
        </Typography>
        <Typography variant="subtitle1">
          <Link href="#multiple-actions" underline="none" sx={{ color: '#4B4D4E', fontFamily: 'Vivaldi', fontSize: '12px', textDecoration: 'none' }}>
            1 pc ({price}$ for {milliliters}ml)
          </Link>
        </Typography>
        <CustomRating productId={productId} initialValue={rating} />
      </CardContent>
    </Card>
  );
}




// import * as React from 'react';
// import { useState } from 'react';
// import Card from '@mui/joy/Card';
// import CardContent from '@mui/joy/CardContent';
// import CardOverflow from '@mui/joy/CardOverflow';
// import Typography from '@mui/joy/Typography';
// import Link from '@mui/joy/Link';
// import CustomRating from './CustomRating';
// import ImageDisplay from './ImageDisplay';
// import { Link as RouterLink } from 'react-router-dom';
// import AddToCart from './AddToCart';
// import AddToFavorite from './AddToFavorite';
// import { IconButton } from '@mui/material';

// export default function ProductCards(props) {
//   const { productId, imageUrl, title, brand, price, milliliters, rating, saleInfo, saleLabel, salePrice} = props;
//   const [likedProducts, setLikedProducts] = useState(new Set());
//   //const salePrice = saleInfo ? (price - (price * saleInfo.discountPercentage) / 100).toFixed(2) : null;

//   const handleFavoriteChange = (productId, isFavorited) => {
//     const updatedLikedProducts = new Set(likedProducts);

//     if (isFavorited) {
//       updatedLikedProducts.add(productId);
//     } else {
//       updatedLikedProducts.delete(productId);
//     }

//     setLikedProducts(updatedLikedProducts);
//   };

//   return (
//     <Card
//       variant="elevation"
//       borderradius="10px"
//       sx={{
//         width: '60%',
//         marginTop: '1%',
//         marginBottom: '3%',
//         marginLeft: '1%',
//         color: '#745a50',
//         display: 'flex',
//         flexDirection: 'column',
//         overflow: 'hidden',
//         position: 'relative',
//       }}
//     >
      
//       {saleLabel && (
//         <IconButton
//           size="small"
//           sx={{
//             position: 'absolute',
//             left: '5px',
//             zIndex: '999',
//             top: '5px', 
//             backgroundColor: '#FF0000',
//             borderRadius: '4px',
//             width:'65px',
//             height:'25px'
//           }}
//         >
//           <Typography variant="body2" sx={{ color: '#FFFFFF' }}>Sale</Typography>
//         </IconButton>
//       )}

//       <CardOverflow sx={{ flex: '1', position: 'relative' }}>
//         <Link
//           component={RouterLink}
//           to={`http://localhost:3000/feed/posts/products/${productId}`}
//           sx={{ color: '#685148', fontFamily: 'Vivaldi', fontSize: '18px' }}
//         >
//           <ImageDisplay imageUrl={imageUrl} />
//         </Link>
//         <AddToFavorite
//           productId={productId}
//           brand={brand}
//           milliliters={milliliters}
//           pname={title}
//           price={price}
//           imageUrl={imageUrl}
//           onFavoriteChange={handleFavoriteChange}
//           favorite={likedProducts.has(productId)}
         
//         />
//         <div style={{ position: 'absolute', top: '90%', right: '10px' }}>
//           <AddToCart productIds={[productId]} />
//         </div>
//       </CardOverflow>
//       <CardContent sx={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
//         <Typography variant="body-sm" sx={{ marginBottom: '-3%' }}>
//           <Link
//             component={RouterLink}
//             to={`http://localhost:3000/feed/posts/products/${productId}`}
//             sx={{ color: '#685148', fontFamily: 'Vivaldi', fontSize: '18px', fontWeight: 'bold',  textDecoration: 'none' }}
//           >
//             {salePrice && saleLabel ? (
//               <>
//                 <span style={{ marginRight: '5px'}}>${salePrice}  | </span>
//                 <span style={{ textDecoration: 'line-through', marginLeft: '3px', color:'gray' }}>  ${price}</span>
//               </>
//             ) : (
//               `$${price}`
//             )}
//           </Link>
//         </Typography>
//         <Typography variant="subtitle1">
//           <Link href="#multiple-actions" underline="none" sx={{ color: '#4B4D4E', fontFamily: 'Vivaldi', fontSize: '12px' }}>
//             {brand}
//           </Link>
//         </Typography>
//         <Typography variant="body1" sx={{ flex: '1', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//           <Link
//             component={RouterLink}
//             to={`http://localhost:3000/feed/posts/products/${productId}`}
//             sx={{ color: '#685148', fontFamily: 'Vivaldi', fontSize: '18px', textDecoration: 'none'}}
//           >
//             {title}, {milliliters}ml
//           </Link>
//         </Typography>
//         <Typography variant="subtitle1">
//           <Link href="#multiple-actions" underline="none" sx={{ color: '#4B4D4E', fontFamily: 'Vivaldi', fontSize: '12px',  textDecoration: 'none' }}>
//             1 pc ({price}$ for {milliliters}ml)
//           </Link>
//         </Typography>
//         <CustomRating productId={productId} initialValue={rating} />
//       </CardContent>
//     </Card>
//   );
// }
