import React from 'react';
import { useNavigate } from 'react-router-dom';

const Empty: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div></div>
  );
};

export default Empty;