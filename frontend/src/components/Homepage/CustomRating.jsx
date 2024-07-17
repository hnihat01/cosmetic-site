import React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

function CustomRating({ productId, initialValue }) {
  const [value, setValue] = React.useState(initialValue);

  const handleRatingChange = async (event, newValue) => {
    try {
      console.log('productId:', productId); // Verify productId
      console.log('newValue:', newValue); // Verify new rating value
  
  
      // Send rating update to server
      const response = await fetch(`http://localhost:8080/feed/posts/updateRating/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating: newValue })
      });
      console.log('Server response:', response);

      if (!response.ok) {
        const errorText = await response.text(); // Get error response body if available
        throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
      }
      

      // Update UI only if the server request succeeds
      setValue(newValue);
      console.log('Rating updated successfully');

    } catch (error) {
      console.error('Error updating rating:', error);
      // Handle error and possibly revert UI state on failure
      // For example, you can display an error message to the user
    }
  };

  return (
    <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
      <Rating
        name="custom-rating"
        size="large"
        value={value}
        precision={0.5}
        onChange={handleRatingChange}
      />
    </Box>
  );
}

export default CustomRating;
