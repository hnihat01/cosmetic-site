import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import {  IconButton } from '@mui/material';
import WhatsApp from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';

const ShareIcons = ({product}) => {
    const shareViaWhatsApp = () => {
        if (!product) {
          console.error('Product information not available.');
          return;
        }
      
        const { pname, brand, description, price, imageUrl } = product;
        const productName = encodeURIComponent(pname || '');
        const productBrand = encodeURIComponent(brand || '');
        const productDescription = description ? encodeURIComponent(description) : 'No description available';
        const productPrice = encodeURIComponent(price || '');
        const imageUrlEncoded = imageUrl ? encodeURIComponent(imageUrl) : '';
      
        const shareText = `
          Check out this amazing product:
          Brand: ${decodeURIComponent(productBrand)}
          Name: ${decodeURIComponent(productName)}
          Description: ${decodeURIComponent(productDescription)}
          Price: ${productPrice}$
        `;
      
        const whatsappLink = `whatsapp://send?text=${encodeURIComponent(shareText)} ${imageUrlEncoded}`;
        window.open(whatsappLink);
      };
      
      const shareViaFacebook = () => {
        if (!product) {
          console.error('Product information not available.');
          return;
        }
    
        const { pname, brand, description, price } = product;
        const productName = encodeURIComponent(pname || '');
        const productBrand = encodeURIComponent(brand || '');
        const productDescription = description ? encodeURIComponent(description) : 'No description available';
        const productPrice = encodeURIComponent(price || '');
        const productUrl = encodeURIComponent(window.location.href);
    
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${productUrl}&quote=${encodeURIComponent(
          `Check out this amazing product:\nBrand: ${productBrand}\nName: ${productName}\nDescription: ${productDescription}\nPrice: ${productPrice}$`
        )}`;
    
        window.open(shareUrl, '_blank');
      };
      
      
      const shareViaTwitter = () => {
        if (!product) {
          console.error('Product information not available.');
          return;
        }
      
        const { pname, brand, description, price } = product;
        const productName = encodeURIComponent(pname || '');
        const productBrand = encodeURIComponent(brand || '');
        const productDescription = description ? encodeURIComponent(description) : 'No description available';
        const productPrice = encodeURIComponent(price || '');
      
        const shareText = `
          Check out this amazing product:
          Brand: ${decodeURIComponent(productBrand)}
          Name: ${decodeURIComponent(productName)}
          Description: ${decodeURIComponent(productDescription)}
          Price: ${productPrice}$
        `;
      
        const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(window.location.href)}`;
        window.open(twitterShareUrl);
      };
          // Define styles for the h2 tag based on props

    return (
        <div style={{ display: 'flex', alignItems: 'center',marginTop:'5%', }}>
        <span style={{ fontFamily: 'Vivaldi', color: '#745a50', fontSize:'18px' }}>Share via:</span>
        <IconButton
          onClick={shareViaWhatsApp}
          sx={{
            fontFamily: 'Vivaldi',
            color: '#745a50',
            borderColor: '#745a50',
            '&:hover': {
              backgroundColor: '#f5f1f0',
            },
          }}
        >
          <WhatsApp fontSize="large" />
        </IconButton>
        <IconButton
          onClick={shareViaFacebook}
          sx={{
            fontFamily: 'Vivaldi',
            color: '#745a50',
            borderColor: '#745a50',
            '&:hover': {
              backgroundColor: '#f5f1f0',
            },
          }}
        >
          <FacebookIcon fontSize="large" />
        </IconButton>
        <IconButton
          onClick={shareViaTwitter}
          sx={{
            fontFamily: 'Vivaldi',
            color: '#745a50',
            borderColor: '#745a50',
            '&:hover': {
              backgroundColor: '#f5f1f0',
            },
          }}
        >
          <TwitterIcon fontSize="large" />
        </IconButton>
      </div>
    );
}

export default ShareIcons;
