import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
// import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice';
import { IoMdArrowBack } from 'react-icons/io';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createProduct({
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      }).unwrap();
      toast.success('Thêm sản phẩm thành công');
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || 'Không thêm được sản phẩm');
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const res = await uploadProductImage(formData).unwrap();
      setImage(res.image);
      setUploading(false);
      toast.success('Tải ảnh thành công');
    } catch (error) {
      console.error(error);
      setUploading(false);
      toast.error('Tải ảnh thất bại');
    }
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        <IoMdArrowBack /> Quay lại
      </Link>
      <FormContainer>
      <h3 className='text-black text-center'>THÊM SẢN PHẨM</h3>
        {isCreating && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Row className='justify-content-md-center mb-3'>
              <Col xs={12} md={3}>
                <Form.Label className='item-value'>Tên sản phẩm</Form.Label>
              </Col>
              <Col xs={12} md={9}>
                <Form.Control
                  type='text'
                  placeholder='Nhập tên sản phẩm'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>

          {/* Price field */}
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
                />
              </Col>
            </Row>
          </Form.Group>

          {/* Image file selection or URL input */}
          <Form.Group controlId='image'>
            <Row className='justify-content-md-center mb-3'>
              <Col xs={12} md={3}>
                <Form.Label className='item-value'>Hình ảnh</Form.Label>
              </Col>
              <Col xs={12} md={9}>
                <Form.Control
                  type='text'
                  placeholder='URL hình ảnh'
                  value={image}
                  className='mb-2'
                  onChange={(e) => setImage(e.target.value)}
                />
                <Form.Control
                  type='file'
                  label='Chọn file'
                  onChange={uploadFileHandler}
                />
              </Col>
            </Row>

            {uploading && <Loader />}
          </Form.Group>

          {/* Brand field */}
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
                />
              </Col>
            </Row>
          </Form.Group>

          {/* Category field */}
          <Form.Group controlId='category'>
            <Row className='justify-content-md-center mb-3'>
              <Col xs={12} md={3}>
                <Form.Label className='item-value'>Danh mục</Form.Label>
              </Col>
              <Col xs={12} md={9}>
                <Form.Control
                  type='text'
                  placeholder='Nhập danh mục sản phẩm'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>

          {/* Count in stock field */}
          <Form.Group controlId='countInStock'>
            <Row className='justify-content-md-center mb-3'>
              <Col xs={12} md={3}>
                <Form.Label className='item-value'>Số lượng có sẵn</Form.Label>
              </Col>
              <Col xs={12} md={9}>
                <Form.Control
                  type='number'
                  placeholder='Số lượng sẵn có'
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>

          {/* Description field */}
          <Form.Group controlId='description'>
            <Row className='justify-content-md-center mb-3'>
              <Col xs={12} md={3}>
                <Form.Label className='item-value'>Mô tả sản phẩm</Form.Label>
              </Col>
              <Col xs={12} md={9}>
                <Form.Control
                  as='textarea'
                  rows={3}
                  placeholder='Nhập mô tả sản phẩm'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>

          {/* Submit button */}
          <div className='d-flex justify-content-center'>
              <Button
                type='submit'
                // variant='primary'
                className='button-link-custom'
                style={{ marginTop: '1rem' }}
              >
                Thêm sản phẩm
              </Button>
            </div>
            
        </Form>
      </FormContainer>
    </>
  );
};

export default AddProduct;
