import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

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
      setError(''); // Clear error when the email is valid
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
    } else {
      setError(''); // Clear error when the password length is sufficient
    }
  };
  
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name && !email && !password && !confirmPassword) {
      setError('Vui lòng nhập đầy đủ tất cả các trường.');
      return;
    }
    if (!name) {
      setError('Bạn chưa nhập tên!');
      return;
    }
    if (name.length < 4) {
      setError('Tên phải có ít nhất 4 ký tự.');
      return;
    }
    if (!email) {
      setError('Bạn chưa nhập Email!');
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
    if (password !== confirmPassword) {
      toast.error('Mật khẩu không trùng khớp');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("Đăng ký thành công");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <div style={{ paddingTop: '20px' }}></div>
      <FormContainer className='FormContainer pt-5'>
        <Form className='Form1' onSubmit={submitHandler} style={{marginLeft: '20px'}}>
        <h3 className='text-black text-center'>ĐĂNG KÝ</h3>
        {error && <Alert variant='danger'>{error}</Alert>}

          <Form.Group className='my-2' controlId='name'>
            <Row>
              <Col xs={12} md={4}>
                <Form.Label className='item-value'>Tên của bạn</Form.Label>
              </Col>
              <Col xs={12} md={8}>
                <Form.Control
                  type='name'
                  placeholder='Nhập tên của bạn'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className='my-2 pt-3 ' controlId='email'>
            <Row>
              <Col xs={12} md={4}>
                <Form.Label className='item-value'>Địa chỉ Email</Form.Label>
              </Col>
              <Col xs={12} md={8}>
                <Form.Control
                  type='email'
                  placeholder='Nhập địa chỉ email'
                  value={email}
                  onChange={handleEmailChange}
                ></Form.Control>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className='my-2 pt-3 ' controlId='password'>
            <Row>
              <Col xs={12} md={4}>
                <Form.Label className='item-value'>Mật khẩu</Form.Label>
              </Col>
              <Col xs={12} md={8}>
                <Form.Control
                  type='password'
                  placeholder='Nhập mật khẩu'
                  value={password}
                  onChange={handlePasswordChange}
                ></Form.Control>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className='my-1 pt-3' controlId='confirmPassword'>
            <Row>
              <Col xs={12} md={4}>
                <Form.Label className='item-value'>
                  Xác nhận mật khẩu
                </Form.Label>
              </Col>
              <Col xs={12} md={8}>
                <Form.Control
                  type='password'
                  placeholder='Nhập lại mật khẩu'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Col>
            </Row>
          </Form.Group>
          <div className='d-flex justify-content-center'>
            <Button
              disabled={isLoading}
              type='submit'
              variant='primary'
              className='button-link-custom'
              style={{ width: '150px' }}
            >
              <b>Đăng ký</b>
            </Button>
          </div>
          {isLoading && <Loader />}
        </Form>
      </FormContainer>
    </>
  );
};

export default RegisterScreen;
