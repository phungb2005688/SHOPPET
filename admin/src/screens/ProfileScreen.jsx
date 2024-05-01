import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheck, FaEye, FaTimes } from 'react-icons/fa';

import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useProfileMutation } from '../slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          // NOTE: here we don't need the _id in the request payload as this is
          // not used in our controller.
          // _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Hô sơ được cập nhật thành công');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Row className='pt-3'>
      <Col md={3}>
        {userInfo && userInfo.isAdmin ? (<h2>Admin</h2>) : <h2>Khách hàng</h2>}
        <Form onSubmit={submitHandler}>
          <Form.Group className='my-2' controlId='name'>
            <Form.Label>Tên khách hàng</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='email'>
            <Form.Label>Địa chỉ email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='password'>
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type='password'
              placeholder='Nhập mật khẩu'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='confirmPassword'>
            <Form.Label>Nhập lại mật khẩu</Form.Label>
            <Form.Control
              type='password'
              placeholder='Nhập mật khẩu'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='button-link-custom'>
            Cập nhật
          </Button>
          {loadingUpdateProfile && <Loader />}
        </Form>
      </Col>
      <Col md={9}>
        <h2>Đơn hàng của bạn</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Table hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID sản phẩm</th>
              <th>Ngày mua</th>
              <th>Tổng</th>
              <th>Đã trả</th>
              <th>Đã giao</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button className='btn-sm' variant='light'>
                      <FaEye style={{marginBottom: '3px'}}/> Chi tiết
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
  );
};

export default ProfileScreen;
// <Table striped hover responsive className='table-sm'>
          //   <thead>
          //     <tr>
          //       <th>ID sản phẩm</th>
          //       <th>Ngày mua</th>
          //       <th>Tổng</th>
          //       <th>Đã trả</th>
          //       <th>Đã giao</th>
          //       <th></th>
          //     </tr>
          //   </thead>
          //   <tbody>
          //     {orders.map((order) => (
          //       <tr key={order._id}>
          //         <td>{order._id}</td>
          //         <td>{order.createdAt.substring(0, 10)}</td>
          //         <td>{order.totalPrice}</td>
          //         <td>
          //           {order.isPaid ? (
          //             order.paidAt.substring(0, 10)
          //           ) : (
          //             <FaTimes style={{ color: 'red' }} />
          //           )}
          //         </td>
          //         <td>
          //           {order.isDelivered ? (
          //             order.deliveredAt.substring(0, 10)
          //           ) : (
          //             <FaTimes style={{ color: 'red' }} />
          //           )}
          //         </td>
          //         <td>
          //           <LinkContainer to={`/order/${order._id}`}>
          //             <Button className='btn-sm' variant='light'>
          //               Chi tiết
          //             </Button>
          //           </LinkContainer>
          //         </td>
          //       </tr>
          //     ))}
          //   </tbody>
          // </Table>