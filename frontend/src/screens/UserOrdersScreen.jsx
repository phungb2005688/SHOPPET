import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { FaCheck, FaEye, FaTimes } from 'react-icons/fa';

import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';

const UserOrderScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();


  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setAddress(userInfo.address);
    setPhone(userInfo.phone);

  }, [userInfo]);

  return (
    <>
      <Row>
        <Col md={12}>
          <h3 className='text-black text-uppercase'>Đơn hàng của bạn</h3>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <Table hover responsive className='table-sm shadow-table'>
              <thead>
                <tr>
                  <th className='text-center'>ID sản phẩm</th>
                  <th className='text-center'>Ngày mua</th>
                  <th className='text-center'>Tổng</th>
                  <th className='text-center'>Đã trả</th>
                  <th className='text-center'>Đã giao</th>
                  <th className='text-center'>Ngày giao</th>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className='text-center'>{order._id}</td>
                    <td className='text-center'>
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className='text-center'>{order.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') }</td>
                    <td className='text-center'>
                      {order.isPaid ? (
                        <FaCheck style={{ color: 'green' }} />
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )}
                    </td>
                    <td className='text-center'>
                      {order.isDelivered ? (
                        <FaCheck style={{ color: 'green' }} />
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )}
                    </td>
                    <td></td>
                    <td className='text-center'>
                      <LinkContainer to={`/order/${order._id}`}>
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

export default UserOrderScreen;
