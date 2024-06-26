import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from '../slices/ordersApiSlice';

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('Order is paid');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }

  // TESTING ONLY! REMOVE BEFORE PRODUCTION
  // async function onApproveTest() {
  //   await payOrder({ orderId, details: { payer: {} } });
  //   refetch();

  //   toast.success('Order is paid');
  // }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error.data.message}</Message>
  ) : (
    <>
      <h3 className='pt-3 text-black'>ĐƠN HÀNG {order._id}</h3>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3 style={{ color: 'black' }}>SHIPPING</h3>
              <p>
                <strong>Tên khách hàng: </strong> <span className='text-black'>{order.user.name}</span>
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a className='text-decoration-none' href={`mailto:${order.user.email}`}><span className='text-black'>{order.user.email}</span></a>
              </p>
              <p>
                <strong>Số điện thoại: </strong>{' '}
                <span className='text-black'>{order.shippingAddress.phone}</span>
              </p>
              <p>
                <strong>Địa chỉ: </strong>
                <span className='text-black'>{order.shippingAddress.address} {order.shippingAddress.city}</span>
                
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Đã giao {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Chưa được giao</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h3 className='text-black text-uppercase'>Phương thức thanh toán</h3>
              <p>
                <strong>Phương thức: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Đã thanh toán {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Chưa thanh toán</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h3 className='text-black text-uppercase'>Mặt hàng đã đặt</h3>
              {order.orderItems.length === 0 ? (
                <Message>Đơn hàng trống</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
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
                          <Link to={`/product/${item.product}`} className='text-decoration-none'>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') } = {(item.qty * item.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') } VNĐ
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
                <h3 className='text-black text-uppercase'>Chi tiết thanh toán</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className='text-black'>Sản phẩm</Col>
                  <Col>{order.itemsPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') } VNĐ</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className='text-black'>Phí vận chuyển</Col>
                  <Col>{order.shippingPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') } VNĐ </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className='text-black'>Thuế</Col>
                  <Col>{order.taxPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') } VNĐ</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className='text-black text-uppercase'>Tổng thành tiền:</Col>
                  <Col className='fw-bold'>{order.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') } VNĐ</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      {/* THIS BUTTON IS FOR TESTING! REMOVE BEFORE PRODUCTION! */}
                      {/* <Button
                        style={{ marginBottom: '10px' }}
                        onClick={onApproveTest}
                      >
                        Test Pay Order
                      </Button> */}

                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}

              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Đã nhận được hàng
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
