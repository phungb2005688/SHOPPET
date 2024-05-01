import { useState, useEffect } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState('Thanh toán khi nhận hàng');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h2 className='text-black'>PHƯƠNG THỨC THANH TOÁN</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Chọn phương thức Method</Form.Label>
          <Col>
            <Form.Check
              className='my-2'
              type='radio'
              label='Thanh toán khi nhận hàng'
              id='Home'
              name='paymentMethod'
              value='Thanh toán khi nhận hàng'
              checked={paymentMethod === 'Thanh toán khi nhận hàng'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              className='my-2'
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked={paymentMethod === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </Form.Group>
        <div className='text-end' >
          <Button type='submit' variant='primary' className='w-25 button-link-custom'>
            Tiếp theo
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
