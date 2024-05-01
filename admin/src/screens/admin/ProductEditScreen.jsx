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
import { useGetBrandsQuery } from '../../slices/brandsApiSlice';
import { useGetCategoriesQuery } from '../../slices/categoryApiSlice';
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
  const [previewImage, setPreviewImage] = useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage] = useUploadProductImageMutation();

  const navigate = useNavigate();

  const {
    data: brands,
    // isLoading: brandsLoading,
    // error: brandsError,
  } = useGetBrandsQuery();

  const {
    data: categories,
    // isLoading: categoryLoading,
    // error: categoryError,
  } = useGetCategoriesQuery();

  useEffect(() => {}, []);

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
      if (product.image) {
        setPreviewImage(product.image);
      } 
    }
  }, [product]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
  
      try {
        const res = await uploadProductImage(formData).unwrap();
        toast.success(res.message);
        setImage(res.image);  // Cập nhật URL hình ảnh mới nhận từ server
  
        // Đọc và hiển thị hình ảnh xem trước
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);  // Cập nhật hình ảnh xem trước
        };
        reader.readAsDataURL(file);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  
  return (
    <>
      <Link to='/admin/productlist' className='btn btn-dark text-white mt-2'>
        <IoMdArrowBack style={{ margin: '5px' }}></IoMdArrowBack>Quay lại
      </Link>
      <FormContainer>
        <h3 className='text-black text-center pt-2 '>CHỈNH SỬA SẢN PHẨM</h3>
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
              <Row>
                <Col xs={3}>
                  <Form.Label className='item-value'>Hình ảnh</Form.Label>{' '}
                </Col>
                <Col xs={5}>
                  <Form.Control
                    multiple
                    label='Chọn file'
                    onChange={uploadFileHandler}
                    type='file'
                    style={{ width: '350px' }}
                  />
                </Col>
                <Col
                  xs={3}
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    paddingTop: '0px',
                    paddingLeft: '2px',
                    width: '105px',
                    marginLeft: '100px',
                  }}
                >
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt='Preview'
                      style={{ width: '100px', height: '100px' }}
                    />
                  ) : (
                    <div
                      style={{
                        textAlign: 'center',
                        fontStyle: 'italic',
                        color: '#888',
                      }}
                    >
                      Ảnh sản phẩm
                    </div>
                  )}
                </Col>
              </Row>
            </Form.Group>

            <Row className='pt-3'>
              <Col xs={12} md={6}>
                <Form.Group controlId='brand'>
                  <Row>
                    <div className='d-flex'>
                      <Col xs={6} md={6}>
                        <Form.Label className='item-value'>
                          Nhãn hàng
                        </Form.Label>
                      </Col>
                      <Col xs={6} md={6} style={{ marginLeft: '10px' }}>
                        <Form.Control
                          as='select'
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                        >
                          <option value=''>Chọn nhãn hàng</option>
                          {brands &&
                            brands.map(
                              (
                                brand // Kiểm tra xem brands đã được tải chưa
                              ) => (
                                <option key={brand.id} value={brand.title}>
                                  {brand.title}
                                </option>
                              )
                            )}
                        </Form.Control>
                      </Col>
                    </div>
                  </Row>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId='category'>
                  <Row>
                    <div className='d-flex'>
                      <Col xs={4} md={4}>
                        <Form.Label className='item-value'>Danh mục</Form.Label>
                      </Col>
                      <Col xs={8} md={8} style={{ marginLeft: '0px' }}>
                        <Form.Control
                          as='select'
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value=''>Chọn danh mục</option>
                          {categories &&
                            categories.map(
                              (
                                category // Kiểm tra xem brands đã được tải chưa
                              ) => (
                                <option
                                  key={category.id}
                                  value={category.title}
                                >
                                  {category.title}
                                </option>
                              )
                            )}
                        </Form.Control>
                      </Col>
                    </div>
                  </Row>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId='countInStock'>
              <Row className='justify-content-md-center mt-3'>
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

            <Form.Group controlId='description'>
              <Row className='justify-content-md-center mt-3'>
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
            <div className='d-flex justify-content-center'>
              <Button
                type='submit'
                // variant='primary'
                className='button-link-custom my-4'
                style={{ marginTop: '1rem', width: '200px' }}
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
