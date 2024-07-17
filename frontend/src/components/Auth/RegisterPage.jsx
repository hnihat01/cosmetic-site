import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import leftImage from '../Data/background.png'; // Import your image here

const Register = () => {


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    birthday: '',
    gender: ''
  });

  const [message, setMessage] = useState('');

  const { username, email, password, phoneNumber, birthday, gender } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Registration successful!');
      } else {
        setMessage(data.msg || 'Registration failed.');
      }
    } catch (err) {
      setMessage('Registration failed.');
    }
  };

  return (
    <Box sx={{ paddingTop: '100px', paddingBottom: '50px', display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '80%', display: 'flex' }}>
        {/* Box for the image */}
        <Box sx={{ flex: 1, display: 'flex' }}>
          <img src={leftImage} alt="Left" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
        {/* Box for the form */}
        <Box sx={{ flex: 1, padding: 4, backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
         
          <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 2, fontWeight: 'bold', color: '#745a50', fontFamily: 'Vivaldi' }}>
                Register
      </Typography>
      <form onSubmit={onSubmit}>
        <TextField
          fullWidth
          id="username"
          name="username"
          label="Username"
          value={username}
          onChange={onChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          type="email"
          value={email}
          onChange={onChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={onChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          id="phoneNumber"
          name="phoneNumber"
          label="Phone Number"
          type="tel"
          value={phoneNumber}
          onChange={onChange}
          margin="normal"
        />
        <TextField
          fullWidth
          id="birthday"
          name="birthday"
          label="Birthday"
          type="date"
          value={birthday}
          onChange={onChange}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <TextField
          fullWidth
          id="gender"
          name="gender"
          label="Gender"
          select
          value={gender}
          onChange={onChange}
          SelectProps={{
            shrink: true,
          }}
          margin="normal"
        >
         
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </TextField>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ marginTop: 2, backgroundColor: '#745a50', '&:hover': { backgroundColor: '#977568' } }}
        >
          Register
        </Button>
      </form>
      {message && (
        <Typography variant="body2" sx={{ marginTop: 2, textAlign: 'center', color: message.includes('successful') ? 'green' : 'red' }}>
          {message}
        </Typography>
      )}
     </Box>
    </Box>
    </Box>
  );
};

export default Register;
