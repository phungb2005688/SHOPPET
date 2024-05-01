import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import FilterComponent from '../components/FilterComponent';
import Meta from '../components/Meta';

const AllProductScreen = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { keyword, pageNumber = 1 } = useParams();
  const [filters, setFilters] = useState({ category: '', brand: '' });

  const {
    data: productData,
    isLoading: productLoading,
    error: productError,
  } = useGetProductsQuery({ keyword, pageNumber, ...filters });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  const isSearching =
    keyword !== undefined && keyword !== null && keyword !== '';


  return (
    <>
    <Meta title={'Tất cả sản phẩm'}></Meta>
      {productLoading ? (
        <Loader />
      ) : productError ? (
        <Message variant='danger'>
          {productError?.data?.message || productError.error}
        </Message>
      ) : (
        <>
          <h3 className='text-black'>{isSearching ? 'KẾT QUẢ TÌM KIẾM' : 'TẤT CẢ SẢN PHẨM'}</h3>
          <FilterComponent onFilterChange={handleFilterChange} />

          {productData?.products.length > 0 ? (
            <Row>
              {productData.products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          ) : (
            <Message variant='info'>Không có kết quả</Message> // Thông báo khi không có sản phẩm
          )}
          {productData && <Paginate
            pages={productData.pages}
            page={productData.page}
            keyword={keyword ? keyword : ''}
          />}
        </>
      )}
    </>
  );
};

export default AllProductScreen;
