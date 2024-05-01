import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaHandPointRight } from 'react-icons/fa';

import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const LoginScreen = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

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
      setError(''); // Clear error message when email is valid
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
      return; // Stop the function if the condition is not met
    }
    setError('');
    try {
      const res = await login({ email, password }).unwrap();
      toast.success("Đăng nhập thành công");
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
    <div style={{paddingTop: '20px'}}></div>
      <FormContainer className='FormContainer pt-5'>
        <Form className='Form' onSubmit={submitHandler} style={{marginLeft: '20PX'}}>
          <h3 className='text-black text-center'>ĐĂNG NHẬP</h3>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form.Group className='my-2' controlId='email'>
            <Row>
              <Col xs={12} md={3}>
                <Form.Label className='item-value text-black'>Email</Form.Label>
              </Col>
              <Col xs={12} md={9}>
                <Form.Control
                  type='email'
                  placeholder='Nhập email của bạn'
                  value={email}
                  onChange={handleEmailChange}
                ></Form.Control>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className='my-2 pt-2 pb-2' controlId='password'>
            <Row>
              <Col xs={12} md={3}>
                <Form.Label className='item-value text-black'>Mật khẩu</Form.Label>
              </Col>
              <Col xs={12} md={9}>
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
              className=' button-link-custom '
              style={{ width: '150px' }}
            >
              <b>Đăng nhập</b>
            </Button>
          </div>

          {isLoading && <Loader />}
        </Form>

        <Row className='py-3'>
          <Col style={{ marginLeft: '320px', fontSize: '17px', color: 'black' }}>
            Người mới?{' '}
            <FaHandPointRight
              className='blink'
              style={{ color: '#080', fontSize: '20px' }}
            ></FaHandPointRight>
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
              className='text-decoration-none'
            >
              <b> Đăng ký</b>
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
