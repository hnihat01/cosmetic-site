import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Link, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download'; // Import an appropriate icon
import jsPDF from 'jspdf';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: '100px', // Set width to 40px
  borderRadius: '5px', // Set border radius to 5px
  color: 'white',
  backgroundColor: '#745a50',
  transition: 'background-color 0.3s ease, color 0.3s ease',
  margin: '0', // Ensure no additional margin
  padding: '10px', // Adjust padding for better visibility
  '&:hover': {
    backgroundColor: '#977568',
  },
  '&:focus': {
    backgroundColor: '#e7dbd7',
    color: '#745a50',
  },
}));

const OrderItem = ({ order }) => {
  const { _id, products, totalAmount, createdAt } = order;

  
  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`Order ID: ${_id}`, 10, 10);
    doc.text(`Created At: ${new Date(createdAt).toLocaleString()}`, 10, 20);
    doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, 10, 30);

    doc.setFontSize(14);
    doc.text('Products:', 10, 40);

    products.forEach((product, index) => {
      const productDetails = `
        Product ID: ${product._id}
        Quantity: ${product.quantity}
        Price: $${product.price.toFixed(2)}
        Total Price: $${(product.quantity * product.price).toFixed(2)}
      `;

      const positionY = 50 + (index * 50);
      doc.text(`Product ${index + 1}:`, 5, positionY);
      doc.text(productDetails, 10, positionY + 10);
    });

    doc.save(`order_${_id}.pdf`);
  };

  return (
    <Box sx={{ marginBottom: '20px', marginLeft: '-5%', width: '70vw' }}>
      <Card sx={{ padding: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <Typography variant="h6" sx={{ textDecoration: 'none', color: 'grey', fontSize: '16px', fontFamily: 'Vivaldi' }}>
              Order ID
            </Typography>
            <Typography variant="h6" sx={{ textDecoration: 'none', color: 'grey', fontSize: '16px', fontFamily: 'Vivaldi' }}>
              Created At
            </Typography>
            <Typography variant="h6" sx={{ textDecoration: 'none', color: 'grey', fontSize: '16px', fontFamily: 'Vivaldi' }}>
              Total Amount
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <Typography variant="h6" sx={{ textDecoration: 'none', color: '#685148', fontFamily: 'Vivaldi' }}>
              {_id}
            </Typography>
            <Typography variant="h6" sx={{ textDecoration: 'none', color: '#685148', fontFamily: 'Vivaldi', marginRight: '8%' }}>
              {new Date(createdAt).toLocaleString()}
            </Typography>
            <Typography variant="h6" sx={{ textDecoration: 'none', color: '#685148', fontFamily: 'Vivaldi', marginRight: '3%' }}>
              ${totalAmount.toFixed(2)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
            {products.map((product, index) => (
              <Card key={index} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px', padding: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <CardMedia
                  component="img"
                  sx={{ width: 50, height: 100, objectFit: 'cover', marginRight: '10px' }}
                  image={`http://localhost:8080/images/${product.imageUrl}`}
                  alt={product.pname}
                />
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography variant="subtitle1">{product.brand}</Typography>
                  <Link
                    component={RouterLink}
                    to={`/feed/posts/products/${product.productId}`}
                    sx={{ textDecoration: 'none', color: '#685148', fontFamily: 'Vivaldi', fontSize: '18px' }}
                  >
                    <Typography variant="h5" sx={{ textDecoration: 'none', color: '#685148', fontFamily: 'Vivaldi' }}>
                      {product.pname}, {product.milliliters}ml
                    </Typography>
                  </Link>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ marginRight: '10px' }}>
                      {product.quantity}pc x ${product.price.toFixed(2)}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ marginLeft: '75%' }}>
                      Total price ${ (product.quantity * product.price).toFixed(2) }
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <StyledIconButton onClick={handleDownload}>
              <DownloadIcon />
            </StyledIconButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderItem;
