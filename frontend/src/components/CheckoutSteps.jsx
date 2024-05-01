import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login'>
            <Nav.Link>ĐĂNG NHẬP</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>ĐĂNG NHẬP</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link>VẬN CHUYỂN</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>VẬN CHUYỂN</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link>THANH TOÁN</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>THANH TOÁN</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link>ĐẶT HÀNG</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>ĐẶT HÀNG</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
