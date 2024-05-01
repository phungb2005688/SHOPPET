import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <h3 className='text-black text-uppercase text-center'>CHI TIẾT ĐƠN HÀNG</h3>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3 className='text-black'>Vận chuyển</h3>
              <Row>
              <Col>
                  <p>
                    <strong>Tên khách hàng:</strong>
                    {''} {cart.shippingAddress.name}{' '}
                  </p>
                  <p>
                    <strong>Mã bưu điện: </strong>
                    {cart.shippingAddress.postalCode}
                  </p>
                </Col>
                <Col>
                <p>
                    <strong>Số điện thoại: </strong>
                    {cart.shippingAddress.phone}
                  </p>
                  <p>
                    <strong>Địa chỉ:</strong>
                    {''} {cart.shippingAddress.address}{' '}
                  </p>
                </Col>
                
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <h3 className='text-black'>Phương thức thanh toán</h3>
              <strong>Phương thức: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h3 className='text-black'>Đơn đặt hàng</h3>
              {cart.cartItems.length === 0 ? (
                <Message>Giỏ của bạn trống</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            to={`/product/${item.product}`}
                            className='text-decoration-none'
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x{' '}
                          {item.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                          = {''}
                          {((item.qty * (item.price * 100)) / 100)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3 className='text-black'>ĐƠN HÀNG</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tổng tiền hàng</Col>
                  <Col>
                    {cart.itemsPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Phí vận chuyển</Col>
                  <Col>
                    {cart.shippingPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Thuế</Col>
                  <Col>
                    {cart.taxPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Thành tiền</Col>
                  <Col>
                    {cart.totalPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && (
                  <Message variant='danger'>{error.data.message}</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block button-link-custom w-100'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Đặt hàng
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
