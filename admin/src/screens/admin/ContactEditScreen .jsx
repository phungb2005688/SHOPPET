import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Container,
  Form,
  Button,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';
import { IoMdArrowBack } from 'react-icons/io';
import { toast } from 'react-toastify';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useGetContactDetailsQuery,
  useUpdateContactMutation,
} from '../../slices/contantsApiSlice';

const ContactEditScreen = () => {
  const { id: contactId } = useParams();
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const {
    data: contact,
    isLoading,
    refetch,
    error,
  } = useGetContactDetailsQuery(contactId);

  const [updateContact, { isLoading: loadingUpdate }] =
    useUpdateContactMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateContact({ contactId, status }).unwrap(); // Unwrap để xử lý lỗi
      toast.success('Lời nhắn đã cập nhật');
      refetch(); // Tùy chọn: refetch để cập nhật danh sách nếu cần
      navigate('/admin/contactlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error); // Hiển thị thông báo lỗi
    }
  };

  useEffect(() => {
    if (contact) {
      setStatus(contact.status);
    }
  }, [contact]);

  return (
    <>
      <Link to='/admin/contactlist' className='btn btn-dark text-white mt-2'>
        <IoMdArrowBack style={{ margin: '5px' }}></IoMdArrowBack>Quay lại
      </Link>
      <>
        <h3 className='text-black text-center pt-2 '>CẬP NHẬT LIÊN HỆ</h3>
        {loadingUpdate && <Loader />}
        {error && <Message variant='danger'>{error.data.message}</Message>}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error.data.message}</Message>
        ) : (
          <>
            <Container>
              <Row>
                <Col xs={7}>
                  <ListGroup className='mb-3'>
                    <ListGroupItem className='text-black'>
                      <strong>Tên: </strong>
                      {contact.name}
                    </ListGroupItem>
                    <ListGroupItem className='text-black'>
                      <strong>Email: </strong>
                      {contact.email}
                    </ListGroupItem>
                    <ListGroupItem className='text-black'>
                      <strong>Điện thoại: </strong>
                      {contact.phone}
                    </ListGroupItem>
                    <ListGroupItem className='text-black'>
                      <strong>Ngày tạo: </strong>
                      {contact.createdAt.substring(0, 10)}
                    </ListGroupItem>
                    <ListGroupItem className='text-black'>
                      <strong>Nội dung: </strong>
                      {contact.message}
                    </ListGroupItem>
                  </ListGroup>
                </Col>
                <Col xs={5}>
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId='status'>
                      <Form.Label className='text-black'>
                        <b>Trạng thái</b>
                      </Form.Label>
                      <Form.Control
                        as='select'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value=''>Chọn trạng thái</option>
                        <option value='Đã gửi'>Đã gửi</option>
                        <option value='Đã liên hệ'>Đã liên hệ</option>
                        <option value='Đã xử lý'>Đã xử lý</option>
                      </Form.Control>
                    </Form.Group>
                    <div className='text-end'>
                      <Button type='submit' className='button-link-custom mt-3'>
                        Cập nhật liên hệ
                      </Button>
                    </div>
                  </Form>
                </Col>
              </Row>
            </Container>
          </>
        )}
      </>
    </>
  );
};

export default ContactEditScreen;
