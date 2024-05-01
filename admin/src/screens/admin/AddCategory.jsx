import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
// import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { IoMdArrowBack } from 'react-icons/io';

import { useCreateCategoryMutation } from '../../slices/categoryApiSlice';

const AddCategory = () => {
  const [title, setTitle] = useState('');

  const navigate = useNavigate();
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createCategory({
        title,
      }).unwrap();
      toast.success('Thêm danh mục thành công');
      navigate('/admin/categorylist');
    } catch (err) {
      toast.error(err?.data?.message || 'Không thêm được danh mục');
    }
  };

  return (
    <>
      <Link to='/admin/categorylist' className='btn btn-dark text-white mt-2'>
        <IoMdArrowBack style={{ margin: '5px' }}></IoMdArrowBack>Quay lại
      </Link>
      <FormContainer>
        <h3 className='text-black text-center distance'>
          THÊM DANH MỤC SẢN PHẨM
        </h3>
        {isCreating && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Row className='justify-content-md-center mb-3'>
              <Col xs={12} md={3}>
                <Form.Label className='item-value text-black fw-bold'>Tên danh mục</Form.Label>
              </Col>
              <Col xs={12} md={9}>
                <Form.Control
                  type='text'
                  placeholder='Nhập danh mục sản phẩm'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>

          {/* Submit button */}
          <div className='d-flex justify-content-center mb-3'>
            <Button
              type='submit'
              // variant='primary'
              className='button-link-custom'
              style={{ marginTop: '1rem' }}
            >
              Thêm danh mục sản phẩm
            </Button>
          </div>
        </Form>
      </FormContainer>
    </>
  );
};

export default AddCategory;
