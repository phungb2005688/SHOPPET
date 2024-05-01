import { useEffect, useState } from 'react';
import { Form, Button, Col, Row, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../slices/cartSlice';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [name, setName] = useState(shippingAddress.name || '');
  const [phone, setPhone] = useState(shippingAddress.phone || '');

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setName(userInfo.name);
    setAddress(userInfo.address);
    setPhone(userInfo.phone);

  }, [userInfo]); 
  
  const validatePhone = (phone) => {
    const regex = /^\+?(\d{10,12})$/; // Adjust regex according to your country standards
    return regex.test(phone);
  };

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
    if (!validatePhone(newPhone)) {
      setError('Số điện thoại không hợp lệ.');
    } else {
      setError(''); // Clear error message when phone is valid
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (name.length < 4) {
      setError('Tên khách hàng phải có ít nhất 4 ký tự.');
      return;
    }
    if (!validatePhone(phone)) {
      setError('Số điện thoại không hợp lệ.');
      return;
    }
    setError(''); 
    dispatch(saveShippingAddress({ name, phone, address, postalCode }));
    navigate('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h3 className='text-center text-black'>THÔNG TIN VẬN CHUYỂN</h3>
      {error && <Alert variant='danger'>{error}</Alert>}

      <Form onSubmit={submitHandler}>
        
        <Form.Group className='my-2' controlId='name'>
          <Row>
            <Col xs={12} md={3}>
              <Form.Label className='item-value text-black pb-3'>Tên khách hàng</Form.Label>
            </Col>
            <Col xs={12} md={9}>
              <Form.Control
                type='text'
                placeholder='Nhập tên của bạn'
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className='my-2' controlId='phone'>
          <Row>
            <Col xs={12} md={3}>
              <Form.Label className='item-value text-black pb-3'>Số điện thoại</Form.Label>
            </Col>
            <Col xs={12} md={9}>
              <Form.Control
                type='tel'
                placeholder='Nhập số điện thoại của bạn'
                value={phone}
                required
                onChange={handlePhoneChange}
              ></Form.Control>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className='my-2' controlId='address'>
          <Row>
            <Col xs={12} md={3}>
              <Form.Label className='item-value text-black pb-3'>Địa chỉ</Form.Label>
            </Col>
            <Col xs={12} md={9}>
              <Form.Control
                type='text'
                placeholder='Nhập địa chỉ của bạn'
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className='my-2' controlId='postalCode'>
          <Row>
            <Col xs={12} md={3}>
              <Form.Label className='item-value text-black pb-3'>Mã bưu điện</Form.Label>
            </Col>
            <Col xs={12} md={9}>
              <Form.Control
                type='text'
                placeholder='Nhập mã bưu điện (*Không bắt buộc )'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              ></Form.Control>
            </Col>
          </Row>
        </Form.Group>

        <div style={{ justifyContent: 'center', textAlign: 'center' }}>
          <Button
            type='submit'
            variant='primary'
            style={{ width: '200px' }}
            className='button-link-custom'
          >
            Tiếp tục
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
