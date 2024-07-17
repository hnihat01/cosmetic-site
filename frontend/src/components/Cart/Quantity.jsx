import React, { useState } from 'react';
import { StyledInputRoot, StyledInput } from './NumberInputStyles'; // Import styles from separate file

const NumberInput = ({ onQuantityChange, qty = '', productId }) => {
  const [value, setValue] = useState(qty);
  const [error, setError] = useState('');

  const handleValueChange = async (event) => {
    const newValue = parseInt(event.target.value, 10);

    if (newValue < 1) {
      setError('Minimum value is 1');
      return;
    }

    if (newValue > 5) {
      setError('Maximum value is 5');
      return;
    }

    setError(''); // Clear error if value is valid
    setValue(newValue);

    try {
      const response = await fetch(`http://localhost:8080/cart/products/qty/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newValue }),
      });

      if (!response.ok) {
        throw new Error('Failed to update product quantity');
      }

      const updatedProduct = await response.json();
      console.log('Updated product quantity:', updatedProduct);

      if (onQuantityChange) {
        onQuantityChange(newValue);
      }
    } catch (error) {
      console.error('Error updating product quantity:', error);
      // Handle error condition (e.g., show error message to user)
    }
  };

  return (
    <StyledInputRoot>
      <StyledInput
        type="number"
        value={value}
        onChange={(event) => handleValueChange(event)}
      />
      {error && <div style={{ color: '#a18377', fontSize: '0.8rem', marginTop: '4px'}}>{error}</div>}
    </StyledInputRoot>
  );
};

export default NumberInput;
