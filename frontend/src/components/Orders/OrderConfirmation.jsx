import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import OrderItem from './OrderItem'; // Import OrderItem component

const OrderConfirmation = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8080/orders/products');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data.orders); // Assuming backend response includes orders array
    } catch (error) {
      console.error('Error fetching orders:', error.message);
    }
  };
console.log(orders);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px' }}>
      <Typography variant="h4" sx={{ marginTop: '10px', marginRight: '64%', color: '#745a50', fontFamily: 'Vivaldi' }}>
        All Orders
      </Typography>
      <Box sx={{ width: '100%', maxWidth: 900 }}>
        {orders.map((order) => (
          <OrderItem key={order._id} order={order} />
        ))}
      </Box>
    </Box>
  );
};

export default OrderConfirmation;
