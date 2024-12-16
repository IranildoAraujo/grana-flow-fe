import React from 'react';
import { Button } from 'antd';
import { useAuth } from '../../context/AuthContext';
import GranaFlow from '../Granaflow';

const Home: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Home Page</h1>
      <Button type="primary" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default Home;
