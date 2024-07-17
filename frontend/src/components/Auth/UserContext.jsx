import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children, userId }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return; // Early return if userId is not set

      try {
        const response = await fetch(`http://localhost:8080/user/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        console.log('User Data:', userData); // Add this line
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  console.log('user context', userData);

  return (
    <UserContext.Provider value={{ userData }}>
      {!loading ? <div>Loading...</div> : children}
      </UserContext.Provider>
  );
};

export default UserContext;
