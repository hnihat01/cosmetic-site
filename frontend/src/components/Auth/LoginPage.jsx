import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import leftImage from '../Data/background.png';
import Lottie from 'react-lottie';
import animationData from '../Data/lottie.json';
import { useNavigate } from 'react-router-dom';
// import  UserProvider  from '../Auth/UserContext'; 

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setUserId(data.userId);
      console.log('login data', userId)
      if (res.ok) {
        // Handle successful login
        setMessage('Login successful!');
        navigate('/');
      } else {
        setMessage(data.msg || 'Login failed.');
      }
    } catch (err) {
      setMessage('Login failed.');
    }
  };

  return (
    <Box sx={{ paddingTop: '100px', paddingBottom: '50px', display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '60%', height: '80vh', display: 'flex' }}>
        <Box sx={{ flex: 1, display: 'flex' }}>
          <img src={leftImage} alt="Left" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
        <Box sx={{ flex: 1, padding: 4, backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 2, fontWeight: 'bold', marginTop: '10%', color: '#745a50', fontFamily: 'Vivaldi' }}>
            <Lottie options={defaultOptions} height={70} width={70} />
            Login
          </Typography>
          <form onSubmit={onSubmit}>
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
              sx={{ '&:hover': { '& input': { color: '#977568 !important' } }, '&:focus': { '& input': { color: '#977568 !important' } } }}
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
              sx={{ '&:hover': { '& input': { color: '#977568 !important' } }, '&:focus': { '& input': { color: '#977568 !important' } } }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ marginTop: 2, backgroundColor: '#745a50', '&:hover': { backgroundColor: '#977568' } }}
            >
              Login
            </Button>
            <Typography variant="body2" sx={{ marginTop: 1, textAlign: 'center', color: '#745a50', fontFamily: 'Vivaldi', fontSize: '17px' }}>
              New user? <Link href="/register" sx={{ fontWeight: 'bold', color: '#745a50', fontFamily: 'Vivaldi', textDecoration: 'none' }}>Create account</Link>
            </Typography>
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

export default Login;
