// LoginLayout.js
import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

const LoginLayout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default LoginLayout;
