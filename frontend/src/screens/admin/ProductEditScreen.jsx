import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice';
import { IoMdArrowBack } from 'react-icons/io';

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success('Sản phẩm đã cập nhật');
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        <IoMdArrowBack style={{ margin: '5px' }}></IoMdArrowBack>Quay lại
      </Link>
      <FormContainer>
        <h3 className='text-black text-center'>CHỈNH SỬA SẢN PHẨM</h3>
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
                  <Form.Label className='item-value'>Tên sản phẩm</Form.Label>
                </Col>
                <Col xs={12} md={9}>
                  <Form.Control
                    type='name'
                    placeholder='Nhập tên sản phẩm'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId='price'>
              <Row className='justify-content-md-center mb-3'>
                <Col xs={12} md={3}>
                  <Form.Label className='item-value'>Giá sản phẩm</Form.Label>
                </Col>
                <Col xs={12} md={9}>
                  <Form.Control
                    type='number'
                    placeholder='Nhập giá'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId='image'>
              <Row className='justify-content-md-center mb-3'>
                <Col xs={12} md={3}>
                  <Form.Label className='item-value'>Hình ảnh</Form.Label>
                </Col>
                <Col xs={12} md={9}>
                  <Form.Control
                    className='mb-2'
                    type='text'
                    placeholder='URL hình ảnh'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  ></Form.Control>
                  <Form.Control
                    label='Chọn File'
                    onChange={uploadFileHandler}
                    type='file'
                  ></Form.Control>
                </Col>
              </Row>

              {loadingUpload && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Row className='justify-content-md-center mb-3'>
                <Col xs={12} md={3}>
                  <Form.Label className='item-value'>Nhãn hàng</Form.Label>
                </Col>
                <Col xs={12} md={9}>
                  <Form.Control
                    type='text'
                    placeholder='Nhập nhãn hàng'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Row className='justify-content-md-center mb-3'>
                <Col xs={12} md={3}>
                  <Form.Label className='item-value'>
                    Số lượng có sẵn
                  </Form.Label>
                </Col>
                <Col xs={12} md={9}>
                  <Form.Control
                    type='number'
                    placeholder='Nhập số lượng sẵn có'
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId='category'>
              <Row className='justify-content-md-center mb-3'>
                <Col xs={12} md={3}>
                  <Form.Label className='item-value'>Danh mục</Form.Label>
                </Col>
                <Col xs={12} md={9}>
                  <Form.Control
                    type='text'
                    placeholder='Nhạp danh mục'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId='description'>
              <Row className='justify-content-md-center mb-3'>
                <Col xs={12} md={3}>
                  <Form.Label className='item-value'>Mô tả</Form.Label>
                </Col>
                <Col xs={12} md={9}>
                  <Form.Control
                    as='textarea'
                    rows={3}
                    placeholder='Nhập mô tả'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    // style={{ resize: 'none' }}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>
            <div className='d-flex justify-content-center '>
              <Button
                type='submit'
                // variant='primary'
                className='button-link-custom'
                style={{ marginTop: '1rem' }}
              >
                Cập nhật
              </Button>
            </div>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
