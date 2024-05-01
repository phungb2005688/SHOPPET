import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
// import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { useCreateBrandMutation } from '../../slices/brandsApiSlice';
import { IoMdArrowBack } from 'react-icons/io';

const AddBrand = () => {
  const [title, setTitle] = useState('');

  const navigate = useNavigate();
  const [createBrand, { isLoading: isCreating }] = useCreateBrandMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createBrand({
        title,
      }).unwrap();
      toast.success('Thêm nhãn hàng thành công');
      navigate('/admin/brandlist');
    } catch (err) {
      toast.error(err?.data?.message || 'Không thêm được nhãn hàng');
    }
  };

  return (
    <>
      <Link to='/admin/brandlist' className='btn btn-dark text-white mt-2'>
        <IoMdArrowBack style={{ margin: '5px' }}></IoMdArrowBack>Quay lại
      </Link>
      <FormContainer>
        <h3 className='text-black text-center distance'>THÊM NHÃN HÀNG</h3>
        {isCreating && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Row className='justify-content-md-center mb-3'>
              <Col xs={12} md={3}>
                <Form.Label className='item-value text-black fw-bold'>Tên nhãn hàng</Form.Label>
              </Col>
              <Col xs={12} md={9}>
                <Form.Control
                  type='text'
                  placeholder='Nhập tên nhãn hàng'
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
              Thêm nhãn hàng
            </Button>
          </div>
        </Form>
      </FormContainer>
    </>
  );
};

export default AddBrand;
