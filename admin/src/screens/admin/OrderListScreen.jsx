import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaEye, FaTimes, FaCheck } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <h2 className='text-black pt-3'>Đơn hàng</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table hover responsive className='table-sm mt-2'>
          <thead>
            <tr>
              <th>ID đơn hàng</th>
              <th>Khách hàng</th>
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
                <td className='text-center'>{order._id}</td>
                <td className='text-center'>{order.user && order.user.name}</td>
                <td className='text-center'>
                  {' '}
                  {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                </td>
                <td className='text-center'>
                  {order.totalPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                </td>
                <td className='text-center'>
                  {order.isPaid ? (
                    // new Date(order.paidAt).toLocaleDateString('vi-VN')
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <div className='text-center'>
                      <FaTimes style={{ color: 'red' }} />
                    </div>
                  )}
                </td>
                <td className='text-center'>
                  {order.isDelivered ? (
                    // new Date(order.deliveredAt).toLocaleDateString('vi-VN')
                    <FaCheck style={{ color: 'green' }} />

                  ) : (
                    <div className='text-center'>
                      <FaTimes style={{ color: 'red' }} />
                    </div>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      <FaEye style={{ marginBottom: '3px' }} /> Chi tiết
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
