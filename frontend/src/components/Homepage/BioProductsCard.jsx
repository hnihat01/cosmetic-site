import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';
import Title from './Title';
import organic from '../Data/Animation6.json';
import newJson from '../Data/New-icon.json'; // Import another animation JSON file
import Lottie from 'react-lottie';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

// Function to generate Lottie animation options based on animation data
function generateLottieOptions(animationData) {
  return {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
}

export default function BioProductsCard() {
  const limitedItemData = itemData.slice(0, 4); // Get only the first 4 items

  const handleGoToProduct = (productId) => {
    window.location.href = `/feed/posts/products/${productId}`;
  };

  return (
    <React.Fragment>
      <Title title='Discover The Secret Of Natural Beauty' marginTop='4%'/>
      <div style={{ 
         width: '100%', height: '100%'  }}>
        <ImageList sx={{ width: '70%', height: '40%', marginTop: '3%', marginRight: '15%', marginLeft: '15%', marginBottom: '1%' }} variant="quilted" cols={4} rowHeight={120}>
          {limitedItemData.map((item, index) => (
            <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <img
                  {...srcset(item.img, 121, item.rows || 1, item.cols || 1)}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '97%',
                    borderRadius: '30px',
                    border: `2px solid rgba(151, 117, 104, 0.2)`, // #df6238 with 20% opacity
                    boxSizing: 'border-box', // Ensure border width is included in width/height
                  }}
                />
                <div style={{ position: 'absolute', top: 10, right: 0, display: 'flex', alignItems: 'center' }}>
                  {/* First Lottie component */}
                  <Lottie
                    options={generateLottieOptions(newJson)}
                    height={40}
                    width={50}
                  />
                  {/* Second Lottie component */}
                  <Lottie
                    options={generateLottieOptions(organic)}
                    height={40}
                    width={50}
                  />
                </div>
                <div style={{ position: 'absolute', bottom: 20, right: 15, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <h5 style={{ marginBottom: 3, right: 15, fontFamily: 'Vivaldi', fontStyle: 'italic' }}>
                    {item.title} </h5>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#977568', color: 'white', minWidth: 100, borderRadius:'15px', fontFamily: 'Vivaldi'}} // Apply custom background color
                    onClick={() => handleGoToProduct(item.id)} // Pass the product ID to the handler
                  >
                    GO
                  </Button>
                </div>
              </div>
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </React.Fragment>
  );
}

const itemData = [
  {
    img: 'alteya1.png',
    title: 'Alteya Organic liquid soap',
    rows: 4,
    cols: 2,
    id: '665b747fb4ffa66be324c278'
  },
  {
    img: 'alteya6.png',
    title: 'Alteya Organic grape oil',
    rows: 2,
    cols: 1,
    id: '665b75dfb4ffa66be324c27a'
  },
  {
    img: 'alverde7.png',
    title: 'Alverde Foundation',
    rows: 2,
    cols: 1,
    id: '665b7798b4ffa66be324c286'
  },
  {
    img: 'alverde6.png',
    title: 'Alverde Vital organic night cream',
    rows: 2,
    cols: 2,
    id: '665b7a06b4ffa66be324c288'
  },
];
