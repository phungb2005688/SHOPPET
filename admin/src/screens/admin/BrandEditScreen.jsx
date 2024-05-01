import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { IoMdArrowBack } from 'react-icons/io';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useUpdateBrandMutation,
  useGetBrandDetailsQuery,
} from '../../slices/brandsApiSlice';

const BrandEditScreen = () => {
  const { id: brandId } = useParams();

  const [title, setTitle] = useState('');

  const {
    data: brand,
    isLoading,
    refetch,
    error,
  } = useGetBrandDetailsQuery(brandId);

  const [updateBrand, { isLoading: loadingUpdate }] = useUpdateBrandMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateBrand({
        brandId,
        title,
      }).unwrap();
      toast.success('Nhãn hàng đã cập nhật');
      refetch();
      navigate('/admin/brandlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (brand) {
      setTitle(brand.title);
    }
  }, [brand]);

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-dark text-white mt-2'>
        <IoMdArrowBack style={{ margin: '5px' }}></IoMdArrowBack>Quay lại
      </Link>
      <FormContainer>
        <h3 className='text-black text-center distance'>CHỈNH SỬA NHÃN HÀNG</h3>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Row className='justify-content-md-center mb-3'>
                <Col xs={12} md={3}>
                  <Form.Label className='item-value'>Tên nhãn hàng</Form.Label>
                </Col>
                <Col xs={12} md={9}>
                  <Form.Control
                    type='name'
                    placeholder='Nhập tên nhãn hàng'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>

            <div className='d-flex justify-content-center'>
              <Button
                type='submit'
                // variant='primary'
                className='button-link-custom mb-3'
                style={{ marginTop: '1rem' }}
              >
                Cập nhật nhãn hàng
              </Button>
            </div>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default BrandEditScreen;
