import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye } from 'react-icons/fa';

import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useProfileMutation } from '../slices/usersApiSlice';
// import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { useGetMyContactsQuery } from '../slices/contantsApiSlice';
import { setCredentials } from '../slices/authSlice';
import Meta from '../components/Meta';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  // const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  const {
    data: contacts,
    isLoadingContact,
    errorContact,
  } = useGetMyContactsQuery();

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Mật khẩu không trùng khớp');
    } else {
      try {
        const res = await updateProfile({
          name,
          email,
          password,
          address,
          phone,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Cập nhật thành công');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setAddress(userInfo.address);
    setPhone(userInfo.phone);
  }, [userInfo]);

  return (
    <>
    <Meta title={'Thông tin khách hàng'}></Meta>
      <Row>
        <Col md={3}>
          <h3 className='text-black'>KHÁCH HÀNG</h3>

          <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='name'>
              <Form.Label className='text-black'>Tên khách hàng</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                className='text-black'
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='email'>
              <Form.Label className='text-black'>Địa chỉ email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                className='text-black'
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='email'>
              <Form.Label className='text-black'>Số điện thoại</Form.Label>
              <Form.Control
                type='tel'
                placeholder='Nhập số điện thoại của bạn'
                value={phone}
                className='text-black'
                onChange={(e) => setPhone(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='email'>
              <Form.Label className='text-black'>Địa chỉ</Form.Label>
              <Form.Control
                type='text'
                placeholder='Nhập địa chỉ của bạn'
                value={address}
                className='text-black'
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
              <Form.Label className='text-black'>Mật khẩu</Form.Label>
              <Form.Control
                type='password'
                placeholder='Nhập mật khẩu'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='confirmPassword'>
              <Form.Label className='text-black'>Nhập lại mật khẩu</Form.Label>
              <Form.Control
                type='password'
                placeholder='Nhập lại mật khẩu'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <div className='text-end'>
              <Button
                type='submit'
                variant='primary'
                className='button-link-custom'
                style={{ width: '120px' }}
              >
                Cập nhật
              </Button>
            </div>

            {loadingUpdateProfile && <Loader />}
          </Form>
        </Col>
        <Col md={9}>
          <h3 className='text-black text-uppercase'>Lời nhắn của bạn</h3>
          {isLoadingContact ? (
            <Loader />
          ) : errorContact ? (
            <Message variant='danger'>
              {errorContact?.data?.message || errorContact.error}
            </Message>
          ) : (
            <Table hover responsive className='table-sm shadow-table'>
              <thead>
                <tr>
                  <th className='text-center'>Tên</th>
                  <th className='text-center'>Ngày gửi</th>
                  <th className='text-center'>Email</th>
                  <th className='text-center'>Lời nhắn</th>
                  <th className='text-center'>Trạng thái</th>
                  <th className='text-center'></th>
                </tr>
              </thead>
              <tbody>
                {contacts &&
                  contacts.map((contact) => (
                    <tr key={contact._id}>
                      <td className='text-center'>{contact.name}</td>
                      <td className='text-center'>
                        {contact.createdAt.substring(0, 10)}
                      </td>
                      <td className='text-center'>{contact.email}</td>
                      <td
                        className='desc text-center'
                        dangerouslySetInnerHTML={{
                          __html: contact.message
                            ? contact.message.substr(0, 20) + '...'
                            : '',
                        }}
                      ></td>
                      <td className='text-center'>{contact.status}</td>
                      <td>
                        <LinkContainer to={`/contact/${contact._id}`}>
                          <Button className='btn-sm' variant='light'>
                            <FaEye style={{ marginBottom: '3px' }} /> Chi tiết
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
