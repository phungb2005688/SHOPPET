import { Row, Col, Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

import { useGetProductsQuery } from '../slices/productsApiSlice';
import { useGetBlogsQuery } from '../slices/blogsApiSlice';
import Product from '../components/Product';
import Blog from '../components/Blog';
import Loader from '../components/Loader';
import Message from '../components/Message';
// import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const isSearching =
    keyword !== undefined && keyword !== null && keyword !== '';

  const {
    data: productData,
    isLoading: productLoading,
    error: productError,
  } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  const {
    data: blogData,
    isLoading: blogLoading,
    error: blogError,
  } = useGetBlogsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          <IoMdArrowBack style={{ margin: '5px' }}></IoMdArrowBack>Quay lại
        </Link>
      )}

      {productLoading ? (
        <Loader />
      ) : productError ? (
        <Message variant='danger'>
          {productError?.data?.message || productError.error}
        </Message>
      ) : (
        <>
          <Meta />
          <Container>
            <h4 className='text-uppercase mt-2 '>
              {isSearching ? 'Kết quả tìm kiếm về thức ăn' : 'SẢN PHẨM MỚI'}
            </h4>
          </Container>

          <Row>
            {productData.products.slice(0, 8).map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>

          <div className='d-flex justify-content-center'>
            <Link to='/allproduct' className='text-decoration-none'>
              <Button
                type=''
                variant='primary'
                className='button-link-custom'
                style={{ width: '130px', borderRadius: '30px' }}
              >
                <b>Xem thêm</b>
              </Button>
            </Link>
          </div>
        </>
      )}

      {blogLoading ? (
        <Loader />
      ) : blogError ? (
        <Message variant='danger'>
          {blogError?.data?.message || blogError.error}
        </Message>
      ) : (
        <>
          <Meta />
          <Container>
            <h4 className='section-heading text-uppercase mt-2 '>
              {isSearching ? 'Kết quả tìm kiếm bài viết' : 'BÀI VIẾT MỚI'}
            </h4>
          </Container>
          <Row>
            {blogData.blogs?.map((blog) => (
              <Col key={blog._id} sm={12} md={6} lg={4} xl={3}>
                <Blog blog={blog} />
              </Col>
            ))}
          </Row>
          {/* <Paginate
            pages={blogData?.pages}
            page={blogData?.page}
            keyword={keyword ? keyword : ''}
          /> */}
        </>
      )}
    </>
  );
};

export default HomeScreen;
