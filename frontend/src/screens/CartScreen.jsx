import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { IoBagHandleSharp } from 'react-icons/io5';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h2 style={{ marginBottom: '20px', color: 'black' }}>
          <IoBagHandleSharp style={{ color: 'black', marginBottom: '10px' }} />
          <span style={{ marginRight: '20px' }}></span>
          Giỏ hàng
        </h2>
        {cartItems.length === 0 ? (
          <Message style={{ textDecoration: 'none' }}>
            Giỏ hàng của bạn trống <Link to='/'>Quay lại trang chủ</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link
                      to={`/product/${item._id}`}
                      style={{ textDecoration: 'none' }}
                      className='nav-link-custom1'
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2} style={{ marginTop: '10px' }}>
                    {item.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                    VNĐ
                  </Col>
                  <Col
                    md={2}
                    style={{
                      width: '70px',
                      marginRight: '80px',
                      marginLeft: '20px',
                    }}
                  >
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2 className='text-black'>
                Tổng ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) sản
                phẩm
              </h2>
              <div>
                {' '}
                Tổng giá tiền: <span style={{ marginRight: '110px' }}></span>
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                VNĐ
              </div>
            </ListGroup.Item>
            <ListGroup.Item style={{ marginLeft: '140px' }}>
              <Button
                type='button'
                className='button-link-custom btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Tiến hành thanh toán
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
