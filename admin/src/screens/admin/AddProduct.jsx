import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice';
import { useGetBrandsQuery } from '../../slices/brandsApiSlice';
import { useGetCategoriesQuery } from '../../slices/categoryApiSlice';
import { IoMdArrowBack } from 'react-icons/io';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [createProduct, { isLoading, error }] = useCreateProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation();
  const navigate = useNavigate();

  const {
    data: brands,
    isLoading: brandsLoading,
    // error: brandsError,
  } = useGetBrandsQuery();

  const {
    data: categories,
    isLoading: categoryLoading,
    // error: categoryError,
  } = useGetCategoriesQuery();

  useEffect(() => {}, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct({
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      }).unwrap();
      toast.success('Đã tạo sản phẩm');
      navigate(`/admin/productlist`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);

      // Hiển thị hình ảnh đã chọn
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-dark text-white mt-2'>
        <IoMdArrowBack style={{ margin: '5px' }}></IoMdArrowBack>Quay lại
      </Link>
      <FormContainer>
        <h3 className='text-black text-center'>THÊM SẢN PHẨM</h3>
        {isLoading || (categoryLoading && <Loader />)}
        {isLoading || (brandsLoading && <Loader />)}
        {error && <Message variant='danger'>{error.data.message}</Message>}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Row className='justify-content-md-center mb-3'>
              <Col xs={12} md={3}>
                <Form.Label className='item-value text-black fw-bold'>Tên sản phẩm</Form.Label>
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

          <Form.Group controlId='price'>
            <Row className='justify-content-md-center mb-3'>
              <Col xs={12} md={3}>
                <Form.Label className='item-value text-black fw-bold'>Giá sản phẩm</Form.Label>
              </Col>
              <Col xs={12} md={9}>
                <Form.Control
                  type='number'
                  placeholder='Nhập giá sản phẩm'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId='image'>
            <Row>
              <Col xs={12} md={3}> <Form.Label className='item-value text-black fw-bold'>Hình ảnh</Form.Label> </Col>
              <Col xs={12} md={5}>
                <Form.Control
                  multiple
                  label='Chọn file'
                  onChange={uploadFileHandler}
                  type='file'
                  style={{ width: '350px'}}
                />
              </Col>
              <Col
                xs={12} md={3}
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
                    Ảnh
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
                        <Form.Label className='item-value text-black fw-bold'>
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
                        <Form.Label className='item-value text-black fw-bold'>Danh mục</Form.Label>
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
                                category
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
              <Col xs={12} md={3}> <Form.Label className='item-value text-black fw-bold'>Số lượng</Form.Label></Col>
              <Col xs={12} md={9}><Form.Control
              type='number'
              placeholder='Nhập số lượng'
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control></Col>
            </Row>
           
          </Form.Group>

          <Form.Group controlId='description'>
            <Row className='justify-content-md-center mt-3'>
              <Col xs={12} md={3}>
                <Form.Label className='item-value text-black fw-bold'>Mô tả sản phẩm</Form.Label>
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
          <div className='d-flex justify-content-center mb-5'>
              <Button
                type='submit'
                // variant='primary'
                className='button-link-custom'
                style={{ marginTop: '1rem', width: '200px' }}
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

// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Form, Button, Row, Col } from 'react-bootstrap';
// // import Message from '../../components/Message';
// import Loader from '../../components/Loader';
// import FormContainer from '../../components/FormContainer';
// import { toast } from 'react-toastify';
// import {
//   useCreateProductMutation,
//   useUploadProductImageMutation,
// } from '../../slices/productsApiSlice';

// const AddProduct = () => {
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState(0);
//   const [image, setImage] = useState('');
//   const [brand, setBrand] = useState('');
//   const [category, setCategory] = useState('');
//   const [countInStock, setCountInStock] = useState(0);
//   const [description, setDescription] = useState('');
//   const [uploading, setUploading] = useState(false);
//   const [brands, setBrands] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
//   const [uploadProductImage] = useUploadProductImageMutation();

//   useEffect(() => {
//     const fetchBrands = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch('/api/brands'); // Sửa đường dẫn API phù hợp với backend của bạn
//         const data = await response.json();
//         setBrands(data);
//       } catch (error) {
//         console.error('Failed to fetch brands', error);
//         toast.error('Lỗi khi tải danh sách nhãn hàng');
//       }
//       setLoading(false);
//     };

//     fetchBrands();
//   }, []);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       await createProduct({
//         name,
//         price,
//         image,
//         brand,
//         category,
//         description,
//         countInStock,
//       }).unwrap();
//       toast.success('Thêm sản phẩm thành công');
//       navigate('/admin/productlist');
//     } catch (err) {
//       toast.error(err?.data?.message || 'Không thêm được sản phẩm');
//     }
//   };

//   const uploadFileHandler = async (e) => {
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append('image', file);
//     setUploading(true);

//     try {
//       const res = await uploadProductImage(formData).unwrap();
//       setImage(res.image);
//       setUploading(false);
//       toast.success('Tải ảnh thành công');
//     } catch (error) {
//       console.error(error);
//       setUploading(false);
//       toast.error('Tải ảnh thất bại');
//     }
//   };

//   return (
//     <>
//       <FormContainer>
//         <h3 className='text-black text-center pt-2'>THÊM SẢN PHẨM</h3>
//         {isCreating && <Loader />}
//         <Form onSubmit={submitHandler}>
//           <Form.Group controlId='name'>
//             <Row className='justify-content-md-center mb-3'>
//               <Col xs={12} md={3}>
//                 <Form.Label className='item-value text-black fw-bold'>Tên sản phẩm</Form.Label>
//               </Col>
//               <Col xs={12} md={9}>
//                 <Form.Control
//                   type='text'
//                   placeholder='Nhập tên sản phẩm'
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </Col>
//             </Row>
//           </Form.Group>

//           {/* Price field */}
//           <Form.Group controlId='price'>
//             <Row className='justify-content-md-center mb-3'>
//               <Col xs={12} md={3}>
//                 <Form.Label className='item-value text-black fw-bold'>Giá sản phẩm</Form.Label>
//               </Col>
//               <Col xs={12} md={9}>
//                 <Form.Control
//                   type='number'
//                   placeholder='Nhập giá'
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                 />
//               </Col>
//             </Row>
//           </Form.Group>

//           {/* Image file selection or URL input */}
//           <Form.Group controlId='image'>
//             <Row className='justify-content-md-center mb-3'>
//               <Col xs={12} md={3}>
//                 <Form.Label className='item-value text-black fw-bold'>Hình ảnh</Form.Label>
//               </Col>
//               <Col xs={12} md={9}>
//                 <Form.Control
//                   type='text'
//                   placeholder='URL hình ảnh'
//                   value={image}
//                   className='mb-2'
//                   onChange={(e) => setImage(e.target.value)}
//                 />
//                 <Form.Control
//                   type='file'
//                   label='Chọn file'
//                   onChange={uploadFileHandler}
//                 />
//               </Col>
//             </Row>

//             {uploading && <Loader />}
//           </Form.Group>

//           {/* Brand field */}
//           <Form.Group controlId='brand'>
//             <Row className='justify-content-md-center mb-3'>
//               <Col xs={12} md={3}>
//                 <Form.Label className='item-value text-black fw-bold'>Nhãn hàng</Form.Label>
//               </Col>
//               <Col xs={12} md={9}>
//                 <Form.Control
//                   as='select'
//                   value={brand}
//                   onChange={(e) => setBrand(e.target.value)}
//                   disabled={loading}
//                 >
//                   <option value=''>Chọn nhãn hàng</option>
//                   {brands.map((brand) => (
//                     <option key={brand.id} value={brand.title}>
//                       {brand.title}
//                     </option>
//                   ))}
//                 </Form.Control>
//               </Col>
//             </Row>
//           </Form.Group>
//           {/* {loading && <Loader />} */}

//           {/* Category field */}
//           <Form.Group controlId='category'>
//             <Row className='justify-content-md-center mb-3'>
//               <Col xs={12} md={3}>
//                 <Form.Label className='item-value text-black fw-bold'>Danh mục</Form.Label>
//               </Col>
//               <Col xs={12} md={9}>
//                 <Form.Control
//                   type='text'
//                   placeholder='Nhập danh mục sản phẩm'
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                 />
//               </Col>
//             </Row>
//           </Form.Group>

//           {/* Count in stock field */}
//           <Form.Group controlId='countInStock'>
//             <Row className='justify-content-md-center mb-3'>
//               <Col xs={12} md={3}>
//                 <Form.Label className='item-value text-black fw-bold'>Số lượng có sẵn</Form.Label>
//               </Col>
//               <Col xs={12} md={9}>
//                 <Form.Control
//                   type='number'
//                   placeholder='Số lượng sẵn có'
//                   value={countInStock}
//                   onChange={(e) => setCountInStock(e.target.value)}
//                 />
//               </Col>
//             </Row>
//           </Form.Group>

//           {/* Description field */}
//           <Form.Group controlId='description'>
//             <Row className='justify-content-md-center mb-3'>
//               <Col xs={12} md={3}>
//                 <Form.Label className='item-value text-black fw-bold'>Mô tả</Form.Label>
//               </Col>
//               <Col xs={12} md={9}>
//                 <Form.Control
//                   as='textarea'
//                   rows={3}
//                   placeholder='Nhập mô tả sản phẩm'
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//               </Col>
//             </Row>
//           </Form.Group>

//           {/* Submit button */}
//           <div className='d-flex justify-content-center mb-3'>
//             <Button
//               type='submit'
//               // variant='primary'
//               className='button-link-custom'
//               style={{ marginTop: '1rem' }}
//             >
//               Thêm sản phẩm
//             </Button>
//           </div>
//         </Form>
//       </FormContainer>
//     </>
//   );
// };

// export default AddProduct;
