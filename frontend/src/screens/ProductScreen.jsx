import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaPen, FaRegStar } from 'react-icons/fa';

import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../slices/productsApiSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addToCart } from '../slices/cartSlice';
import { IoMdArrowBack } from 'react-icons/io';

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // const addToCartHandler = () => {
  //   dispatch(addToCart({ ...product, qty }));
  //   navigate('/cart');
  //   // toast.success('Đã thêm sản phẩm vào giỏ hàng!');
  // };

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const cart = useSelector((state) => state.cart); // Lấy thông tin giỏ hàng 
  const productInCart = cart.cartItems.find((item) => item._id === productId); // Kiểm tra sản phẩm đã có trong giỏ hàng hay chưa

  const handleCartButton = () => {
    if (!productInCart) {
      dispatch(addToCart({ ...product, qty })); 
    }
    navigate('/cart');
  };
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Đánh giá đã được tải lên');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Link className='btn btn-light my-3' to='/allproduct'>
        <IoMdArrowBack style={{ margin: '5px' }}></IoMdArrowBack>Quay lại
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={product.name} description={product.description} />
          <Row className='mt-3'>
            <Col md={4}>
              <Image
                style={{ borderColor: '#000' }}
                src={product.image}
                alt={product.name}
                fluid
              />
            </Col>
            <Col md={5}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3 className='text-black'>{product.name}</h3>
                  <span>
                    <b className='text-black'>Danh mục:</b>{' '}
                    <span>{product.category}</span>
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} đánh giá`}
                  />
                </ListGroup.Item>
                {/* <ListGroup.Item>
                  <b className='text-black'>Giá:</b>{' '}
                  <b>{product.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                  VNĐ</b>
                  
                </ListGroup.Item> */}
                <ListGroup.Item>
                  <b className='text-black'>Mô tả:</b>{' '}
                  <span className='text-black'>{product.description}</span>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col md={3} className='text-black'>
                        Giá:
                      </Col>
                      <Col md={9} style={{ paddingLeft: '70px' }}>
                        <strong className='text-black'>
                          {product.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                          VNĐ
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col className='text-black'>Trạng thái:</Col>
                      <Col className='text-black'>
                        {product.countInStock > 0 ? (
                          <b style={{ color: 'green' }}>Còn hàng</b>
                        ) : (
                          <b style={{ color: '#ffbf00' }}>HẾT HÀNG</b>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {/* Qty Select */}
                  {product.countInStock > 0 && !productInCart && (
                    <ListGroup.Item>
                      <Row>
                        <Col xs={8} className='text-black mt-2'>
                          Số lượng mua:
                        </Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            className='text-black'
                            onChange={(e) => setQty(Number(e.target.value))}     
                            >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className='button-link-custom btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                      onClick={handleCartButton}
                    >
                      {productInCart
                        ? 'Đã có trong giỏ hàng'
                        : 'Thêm vào giỏ hàng'}
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className='review'>
            <Col md={6}>
              <h2>Đánh giá</h2>
              {product.reviews.length === 0 && (
                <Message>Chưa có đánh giá</Message>
              )}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col md={6}>
              <ListGroup.Item>
                <h2>Viết đánh giá của khách hàng</h2>

                {loadingProductReview && <Loader />}

                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group className='my-2' controlId='rating'>
                      <Form.Label>
                        Chọn sao để đánh giá{' '}
                        <FaRegStar
                          style={{ fontSize: '20px', marginBottom: '5px' }}
                        />
                      </Form.Label>
                      <Form.Control
                        as='select'
                        required
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value=''>Chọn sao ở đây...</option>
                        <option value='1'>1 - Kém</option>
                        <option value='2'>2 - Khá</option>
                        <option value='3'>3 - Tốt</option>
                        <option value='4'>4 - Rất tốt</option>
                        <option value='5'>5 - Xuất sắc</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2' controlId='comment'>
                      <Form.Label>
                        Viết đánh giá{' '}
                        <FaPen
                          style={{ fontSize: '15px', marginBottom: '5px' }}
                        />
                      </Form.Label>
                      <Form.Control
                        as='textarea'
                        row='3'
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button
                      disabled={loadingProductReview}
                      type='submit'
                      variant='primary'
                      className='button-link-custom'
                    >
                      Gửi đánh giá
                    </Button>
                  </Form>
                ) : (
                  <Message>
                    Hãy{' '}
                    <Link to='/login'>
                      <b>đăng nhập</b>
                    </Link>{' '}
                    để viết đánh giá
                  </Message>
                )}
              </ListGroup.Item>
              {/* </ListGroup> */}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
