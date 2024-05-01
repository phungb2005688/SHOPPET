import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Table,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';

import axios from 'axios';
import { useCallback } from 'react';
import { FaEye, FaTimes, FaUsers, FaCheck } from 'react-icons/fa';
import { GrProductHunt } from 'react-icons/gr';

import {
  // AverageOrdersPerDay,
  BestSellingProduct,
  // MonthlyRevenueViewer,
  //   MonthlyRevenueChart,
  RevenueByCategory,
  // GrowthChart,
  useGrowthData,
  TotalOrders,
  TotalRevenue,
  AllTotalOrders,
} from '../slices/useStats';
import { useGetOrdersQuery } from '../slices/ordersApiSlice';

import MyChartComponent from '../components/MyChartComponent';

const HomeScreen = () => {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const { data: orders, isLoadingOrder, isError } = useGetOrdersQuery();
  const [type, setType] = useState('daily'); // Hoặc 'daily', 'yearly' monthly

  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [data, setData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setData({}); // Reset data before fetching new data
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/stats?startDate=${startDate}&endDate=${endDate}`
      );
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, fetchData]); // Thêm fetchData vào mảng phụ thuộc

  const handleChangeStart = (event) => {
    setStartDate(event.target.value);
  };

  const handleChangeEnd = (event) => {
    setEndDate(event.target.value);
  };
  const {
    data: growthData,
    // loading: growthLoading,
    // error: growthError,
  } = useGrowthData({ startDate, endDate, type });

  return (
    <>
      <Container>
        <h2 className='mt-2 text-black'>THỐNG KÊ</h2>
        <div className=''>
          <Row>
            <Col xs={7} style={{ marginTop: '5px' }}>
              {/* Thống kê tổng doanh thu */}
              <TotalRevenue />
            </Col>
            <Col xs={5}>
              <div>
                <div className=''>
                  {/* Tổng đơn hàng đã thanh toán*/}
                  <TotalOrders />
                </div>
                <div className=''>
                  {/* Tổng đơn hàng*/}
                  <AllTotalOrders />{' '}
                </div>
              </div>
            </Col>
          </Row>
        </div>
        {/* <Col>
            Thống kê đơn hàng trung bình mỗi ngày
            <AverageOrdersPerDay startDate={startDate} endDate={endDate} />
          </Col> */}
        <Row>
          <Col xs={7}>
            {/* Sản phẩm bán chạy nhất */}
            <BestSellingProduct />
          </Col>
          <Col xs={5}>
            <Card className='mb-3 card-color2'>
              <Card.Body>
                <div className='text-white'>
                  <span className='text-uppercase fw-bold'>
                    <GrProductHunt
                      style={{ fontSize: '25px', marginRight: '5px' }}
                    />
                    Tổng Sản Phẩm:{' '}
                  </span>{' '}
                  <b>{data.totalProducts}</b>
                </div>
              </Card.Body>
            </Card>
            <Card className='mb-2 card-color2'>
              <Card.Body>
                <div className='text-white'>
                  <span className='text-uppercase fw-bold'>
                    <FaUsers style={{ fontSize: '27px', marginRight: '5px' }} />
                    Tổng người dùng:{' '}
                  </span>{' '}
                  <b>{data.totalUsers}</b>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div>
          <div className='mb-4 mt-5 stats-container'>
            <h4 className='text-black'>THỐNG KÊ THEO NGÀY</h4>
            <Form>
              <Row className='stats-row'>
                <Col md={5}>
                  <Form.Group controlId='startDate'>
                    <Form.Label className='text-black'>Ngày Bắt Đầu</Form.Label>
                    <Form.Control
                      type='date'
                      value={startDate}
                      onChange={handleChangeStart}
                    />
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Group controlId='endDate'>
                    <Form.Label className='text-black'>
                      Ngày Kết Thúc
                    </Form.Label>
                    <Form.Control
                      type='date'
                      value={endDate}
                      onChange={handleChangeEnd}
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <div
                    style={{
                      justifyContent: 'start',
                      textAlign: 'start',
                      marginTop: '30px',
                      height: '20px',
                    }}
                  >
                    <Button
                      type='button'
                      variant='primary'
                      className='button-link-custom'
                      style={{ marginLeft: '0px', width: '150px' }}
                      onClick={fetchData}
                    >
                      <b>Tải Dữ Liệu</b>
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
            {loading && <div>Loading...</div>}

            {error && (
              <div>
                {/* Error: {error} cách bắt lỗi ban đầu*/}  
                <Message variant='danger'>
                  {error?.data?.message ||
                    'Bạn chưa đăng nhập!'}
                </Message>
              </div>
            )}

            <Row className='stats-row'>
              <Col md={5}>
                <CardStats
                  title='Tổng số đơn đặt hàng'
                  value={data.totalOrders}
                />
              </Col>
              <Col md={5}>
                <CardStats
                  title='Tổng Doanh Thu'
                  value={
                    data.totalRevenue
                      ? `${data.totalRevenue
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VNĐ`
                      : '0'
                  }
                />
              </Col>
            </Row>
            <p>* Không tính những đơn hàng chưa thanh toán</p>
          </div>
        </div>

        {/* Doanh thu theo danh mục sản phẩm */}
        <RevenueByCategory />
      </Container>

      {/* GrowthChart biểu đồ tăng trưởng theo tháng => không rõ ràng để hiển thị*/}
      {/* <GrowthChart startDate={startDate} endDate={endDate} type={type} /> */}
      {/* Nếu MyChartComponent liên quan đến biểu đồ tăng trưởng*/}
      <div className='mt-5'>
        {' '}
        <MyChartComponent data={growthData} />
      </div>

      <Container>
        <h3 className='text-black pt-3 text-uppercase'>Đơn hàng gần đây</h3>
        {isLoadingOrder ? (
          <Loader />
        ) : isError ? (
          <Message variant='danger'>
            {isError?.data?.message || isError.error || 'Bạn chưa đăng nhập!'}
          </Message>
        ) : (
          <Table hover responsive className='table-sm mt-2'>
            <thead>
              <tr>
                <th>ID đơn hàng</th>
                <th>Khách hàng</th>
                <th>Ngày mua</th>
                <th>Số lượng</th>
                <th>Tổng</th>
                <th>Đã giao</th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders &&
                orders.slice(0, 5).map((order) => (
                  <tr key={order._id}>
                    <td className='text-center'>{order._id}</td>
                    <td className='text-center'>
                      {order.user && order.user.name}
                    </td>
                    <td className='text-center'>
                      {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className='text-center'>
                      {order.orderItems.reduce(
                        (total, item) => total + item.qty,
                        0
                      )}
                    </td>

                    <td className='text-center'>
                      {order.totalPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    </td>
                    <td className='text-center'>
                      {order.isDelivered ? (
                        <FaCheck style={{ color: 'green' }} />
                      ) : (
                        // new Date(order.deliveredAt).toLocaleDateString('vi-VN')
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
      </Container>

      {/* <div>
      <MonthlyRevenueChart />
    </div> */}
      {/* <div className='App'>
        <MonthlyRevenueViewer />
      </div> */}
    </>
  );
};

const CardStats = ({ title, value }) => (
  <Col md={12}>
    <Card
      className='mb-3'
      style={{ border: '1px solid #d2d2d2', borderRadius: '10px' }}
    >
      <Card.Body>
        <div className='text-black'>
          <div className='card-stats'>
            <>{title}:</> <b>{value}</b>
          </div>
        </div>
      </Card.Body>
    </Card>
  </Col>
);

export default HomeScreen;
/* Biểu đồ tăng trường */

/* <GrowthChart params={{ type: 'monthly' }} />
    <MyChartComponent /> */
