import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

// Define the styled button with custom styles
const StyledButton = styled(Button)({
  borderRadius: '5%',
  color: 'white',
  width:'150%',
  backgroundColor: '#745a50',
  transition: 'background-color 0.3s ease, color 0.3s ease',
  margin: '0',
  padding: '10px',
  '&:hover': {
    backgroundColor: '#977568',
  },
  '&:focus': {
    backgroundColor: '#e7dbd7',
    color: '#745a50',
  },
});

const OrderButton = ({ products }) => {
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      const response = await fetch('http://localhost:8080/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products }), // Send the products data in the request body
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const data = await response.json();
      console.log(data.message); // Log success message
      navigate('/orders'); // Navigate to order confirmation page
    } catch (error) {
      console.error('Error placing order:', error.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <StyledButton
        variant="contained"
        color="primary"
        onClick={handlePlaceOrder}
      >
        Place Order
      </StyledButton>
    </div>
  );
};

export default OrderButton;
