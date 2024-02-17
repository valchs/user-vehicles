import React from 'react';

const homePageStyle = {
  display: 'flex',
  flexDirection: 'column' as 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f5f5f5',
  color: '#333',
  fontSize: '24px',
  padding: '20px',
};

const HomePage: React.FC = () => {
  return (
    <div style={homePageStyle}>
      <h1>Welcome to Our React App</h1>
      <p>This is a simple home page built with React and TypeScript.</p>
    </div>
  );
};

export default HomePage;
