import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error1, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!validateEmail(newEmail)) {
      setError('Email không hợp lệ.');
    } else {
      setError(''); 
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword.length >= 6) {
      setError('');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email && !password) {
      setError('Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }
    if (!email) {
      setError('Bạn chưa nhập email!');
      return;
    }
    if (!validateEmail(email)) {
      setError('Email không hợp lệ.');
      return;
    }
    if (!password) {
      setError('Bạn chưa nhập mật khẩu!');
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return; 
    }
    setError('');
    try {
      const user = await login({ email, password }).unwrap();
      toast.success('Đăng nhập thành công');
      dispatch(setCredentials({ ...user }));
      navigate(redirect);
    } catch (error) {
      const errorMessage = error?.data?.message || error.error || 'Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.';
      // toast.error(errorMessage);
      setError(errorMessage); 
    }
  };

  return (
    <div className='animated-background'>
      <Container style={{ marginTop: '100px' }}>
        <div className='login-form-container'>
          <h2 className='pt-2 pb-4 text-black text-center'>ĐĂNG NHẬP</h2>
          <Form className='login-form' onSubmit={submitHandler}>
            {error1 && <Alert style={{ backgroundColor: 'black', color: 'white' }}>{error1}</Alert>}
            <Form.Group className='my-2' controlId='email'>
              <Row>
                <Col xs={12} md={1}></Col>
                <Col xs={12} md={3}>
                  <Form.Label className='item-value text-black fw-bold'>
                    Email
                  </Form.Label>
                </Col>
                <Col xs={12} md={7}>
                  <Form.Control
                    type='email'
                    placeholder='Nhập email của bạn'
                    value={email}
                    onChange={handleEmailChange}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className='my-3' controlId='password'>
              <Row>
                <Col xs={12} md={1}></Col>
                <Col xs={12} md={3}>
                  <Form.Label className='item-value text-black fw-bold'>
                    Mật khẩu
                  </Form.Label>
                </Col>
                <Col xs={12} md={7}>
                  <Form.Control
                    type='password'
                    placeholder='Nhập mật khẩu'
                    value={password}
                    onChange={handlePasswordChange}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <div className='d-flex justify-content-center'>
              <Button
                disabled={isLoading}
                type='submit'
                variant='primary'
                className=' button-link-custom mt-3'
                style={{ width: '150px' }}
              >
                <b>Đăng nhập</b>
              </Button>
            </div>
            {isLoading && <Loader />}
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default LoginScreen;
