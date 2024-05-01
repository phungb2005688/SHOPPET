import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { BsUiChecks } from 'react-icons/bs';
import { IoIosPaper } from 'react-icons/io';

import {
  Card,
  Table,
  Container,
  Form,
  Button,
  Row,
  Col,
  Alert,
} from 'react-bootstrap';

// Thống kê đơn hàng trung bình mỗi ngày
const AverageOrdersPerDay = ({ startDate, endDate }) => {
  const [averageOrders, setAverageOrders] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAverageOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/stats/average-orders-per-day', {
          params: { startDate, endDate },
        });
        setAverageOrders(response.data.averageOrdersPerDay || 0);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAverageOrders();
  }, [startDate, endDate]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className='alert alert-danger'>{error}</div>
      ) : (
        <>
          <Col md={12}>
            <Card className='mb-3'>
              <Card.Body>
                <div className='text-black'>
                  <div className='card-stats'>
                    <>Đơn Hàng Trung Bình Mỗi Ngày: </>{' '}
                    <b>{averageOrders.toFixed(0)}</b>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </>
      )}
    </div>
  );
};

// Thống kê sản phẩm bán chạy nhất
const useBestSellingProduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get('/api/stats/best-selling')
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        setError(error.response ? error.response.data.message : error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { product, loading, error };
};

// Thống kê sản phẩm bán chạy nhất GIAO DIỆN
const BestSellingProduct = () => {
  const { product, loading } = useBestSellingProduct();

  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
  if (!product) return <div><Card className='card-color-img'>
      <Row>
        <Col xs={9}>
          <Card.Body>
            <h5 className='text-black text-uppercase'>
              Sản Phẩm Bán Chạy Nhất
            </h5>
            <Card.Text className='text-black'>
              <span className='fw-bold'>Tên sản phẩm:</span> 
            </Card.Text>
            <Card.Text className='text-black'>
              <span className='fw-bold'>Đã bán:</span> 
            </Card.Text>
          </Card.Body>
        </Col>
        <Col xs={3}>
          <div>
      
          </div>
        </Col>
      </Row>
    </Card></div>;

  return (
    <Card className='card-color-img'>
      <Row>
        <Col xs={9}>
          <Card.Body>
            <h5 className='text-black text-uppercase'>
              Sản Phẩm Bán Chạy Nhất
            </h5>
            <Card.Text className='text-black'>
              <span className='fw-bold'>Tên sản phẩm:</span> {product.name}
            </Card.Text>
            <Card.Text className='text-black'>
              <span className='fw-bold'>Đã bán:</span> {product.totalSold}
            </Card.Text>
          </Card.Body>
        </Col>
        <Col xs={3}>
          <div>
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '130px',
                marginTop: '10px',
                justifyContent: 'end',
              }}
            />
          </div>
        </Col>
      </Row>
    </Card>
  );
};

// Thống kê doanh thu theo danh mục sản phẩm
const useRevenueByCategory = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get('/api/stats/revenue-by-category')
      .then((response) => {
        setRevenueData(response.data);
      })
      .catch((error) => {
        setError(
          error.response ? error.response.data.message : 'Error fetching data'
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { revenueData, loading, error };
};
// Thống kê doanh thu theo danh mục sản phẩm GIAO DIỆN
const RevenueByCategory = () => {
  const { revenueData, loading } = useRevenueByCategory();

  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <Card>
      <Card.Body>
        <h4 className='text-black text-uppercase'>
          Doanh Thu Theo Danh Mục Sản Phẩm
        </h4>
        <Table bordered hover>
          <thead>
            <tr>
              <th className='text-black'>DANH MỤC</th>
              <th className='text-black'>DOANH THU DOANH MỤC</th>
            </tr>
          </thead>
          <tbody>
            {revenueData.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>
                  {item.totalRevenue
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                  VNĐ
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

// Thống kê tổng số đơn hàng đã thanh toán
const getTotalOrders = async () => {
  try {
    const response = await axios.get('/api/stats/total-orders');
    return response.data.totalOrders;
  } catch (error) {
    // throw error;
    return;
  }
};

// Thống kê tổng số đơn hàng đã thanh toán GIAO DIỆN
const TotalOrders = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalOrders = async () => {
      try {
        const total = await getTotalOrders(); // Gọi hàm getTotalOrders được định nghĩa ở trên
        setTotalOrders(total);
      } catch (error) {
        setError('Could not fetch total orders: ' + error.message);
      }
    };

    fetchTotalOrders();
  }, []);
  if (error) return <div>Error: {error}</div>;

  return (
    // <Col md={12}>
    <Card className='mb-3 card-color'>
      <Card.Body>
        <div className='text-white'>
          <div className='card-stats'>
            <span className='text-uppercase fw-bold'>
              <BsUiChecks
                style={{ fontSize: '25px', marginRight: '5px' }}
              ></BsUiChecks>
              Tổng số đơn hàng đã thanh toán:{' '}
            </span>{' '}
            <b>{totalOrders}</b>
          </div>
        </div>
      </Card.Body>
    </Card>
    // </Col>
  );
};

// Thống kê tổng số đơn hàng
const useTotalOrders = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get('/api/stats/total-unpaid-orders')
      .then((response) => setData(response.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};

// Thống kê tổng số đơn hàng  GIAO DIỆN
const AllTotalOrders = () => {
  const { data, loading, error } = useTotalOrders();

  if (loading) return <p>Loading...</p>;
  if (error) return <p><Card className='mb-3 card-color'>
  <Card.Body>
    <div className='text-white'>
      <div className='card-stats'>
        <span className='text-uppercase fw-bold'>
          <IoIosPaper style={{ fontSize: '25px', marginRight: '5px' }} />
          Tổng số đơn hàng:{' '}
        </span>{' '}
        <b></b>
      </div>
    </div>
  </Card.Body>
</Card></p>;

  return (
    // <Col md={12}>
    <Card className='mb-3 card-color'>
      <Card.Body>
        <div className='text-white'>
          <div className='card-stats'>
            <span className='text-uppercase fw-bold'>
              <IoIosPaper style={{ fontSize: '25px', marginRight: '5px' }} />
              Tổng số đơn hàng:{' '}
            </span>{' '}
            <b>{data?.totalOrders}</b>
          </div>
        </div>
      </Card.Body>
    </Card>
    // </Col>
  );
};

// Thống kê tổng doanh thu
const useTotalRevenue = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get('/api/stats/total-revenue')
      .then((response) => {
        setTotalRevenue(response.data.totalRevenue);
        setError(null);
      })
      .catch((error) => {
        setError(
          error.response ? error.response.data.message : 'Có lỗi xảy ra'
        );
        setTotalRevenue(0);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { totalRevenue, loading, error };
};

// Thống kê tổng doanh thu GIAO DIỆN
const TotalRevenue = () => {
  const { totalRevenue, loading } = useTotalRevenue();

  if (loading) return <p>Đang tải...</p>;
  // if (error) return <p>Lỗi: {error}</p>;

  return (
    <Card className=''>
      <Row>
        <Col xs={9}>
          <Card.Body>
            <Card.Text className='text-black'>
              <div className='card-stats'>
                <h5 className='text-uppercase'>Tổng doanh thu </h5>{' '}
                <b>{totalRevenue.toLocaleString('vi-VN')} VNĐ</b>
              </div>
            </Card.Text>{' '}
            <span>*Không tính những đơn hàng chưa thanh toán</span>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

// Biểu đồ tăng trưởng theo ngày tháng năm
const useGrowthData = ({ startDate, endDate, type }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/stats/growth`, {
          params: { startDate, endDate, type },
        });
        console.log('Data fetched:', response.data);
        setData(response.data);
        setError(null);
      } catch (error) {
        console.error(
          'Error fetching data:',
          error.response ? error.response.data : error.message
        );
        setError('Error loading data!');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate, type]);

  return { data, loading, error };
};
// Biểu đồ tăng trưởng theo ngày tháng năm
const GrowthChart = ({ startDate, endDate, type }) => {
  const { data, loading, error } = useGrowthData({ startDate, endDate, type });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data!</p>;

  const chartData = {
    labels: (data || []).map((item) => `${item._id.month}/${item._id.year}`),
    datasets: [
      {
        label: 'Total Revenue',
        data: (data || []).map((item) => item.totalRevenue),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return <Line data={chartData} />;
};

// const useGrowthData = (params) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get('/api/stats/growth', { params })
//       .then((response) => {
//         console.log('Data fetched:', response.data);
//         setData(response.data);
//       })

//       .catch((error) => {
//         console.error('Error fetching data from /api/stats/growth:', error);
//         setError(error);
//       })
//       .finally(() => setLoading(false));
//   }, [params]);

//   console.log('Data fetched:', data);

//   return { data, loading, error };
// };
// const GrowthChart = ({ params }) => {
//   const { data, loading, error } = useGrowthData(params);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error loading data!</p>;

//   // Kiểm tra xem data có phải là mảng và có phần tử không
//   if (!Array.isArray(data) || data.length === 0) {
//     console.error('Expected data to be an array', data);
//     return <p>No data available for the chart.</p>;
//   }
//   // console.log('Data fetched:', data);

//   const chartData = {
//     labels: data.map((item) => `${item._id.month}/${item._id.year}`),
//     datasets: [
//       {
//         label: 'Total Revenue',
//         data: data.map((item) => item.totalRevenue),
//         fill: false,
//         borderColor: 'rgb(75, 192, 192)',
//         tension: 0.1,
//       },
//     ],
//   };
//   // console.log('Data fetched:', data);
//   console.log('Chart data prepared:', chartData);

//   return <Line data={chartData} />;
// };

/* Thống kê Doanh Thu Hàng Tháng */
function MonthlyRevenueChart() {
  const [chartData, setChartData] = useState({});

  const loadChartData = async () => {
    try {
      const response = await axios.get('/api/monthly-revenue');
      const labels = response.data.data.map(
        (item) => `${item.month}/${item.year}`
      );
      const data = response.data.data.map((item) => item.totalRevenue);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Doanh thu hàng tháng',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching monthly revenue data:', error);
    }
  };

  useEffect(() => {
    loadChartData();
  }, []);

  return (
    <div>
      <h2>Biểu Đồ Doanh Thu Hàng Tháng</h2>
      <Bar
        data={chartData}
        options={{ scales: { yAxes: [{ ticks: { beginAtZero: true } }] } }}
      />
    </div>
  );
}

/* Thống kê Doanh Thu Hàng Tháng */
function MonthlyRevenueViewer() {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [revenue, setRevenue] = useState(null);
  const [error, setError] = useState('');

  const fetchRevenue = async () => {
    if (!month || !year) {
      setError('Vui lòng chọn cả tháng và năm');
      return;
    }
    setError('');
    try {
      const response = await axios.get(`/api/monthly-revenue/${year}/${month}`);
      setRevenue(response.data.totalRevenue);
    } catch (error) {
      setError('Lỗi khi tải doanh thu');
      console.error('Error fetching revenue:', error);
    }
  };

  return (
    <Container className='mt-5'>
      <h4 className='text-black text-uppercase'>Doanh Thu Hàng Tháng</h4>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group controlId='yearInput'>
              <Row>
                <Col xs={2}>
                  <Form.Label className='mt-1 text-black'>Năm</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type='number'
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </Col>
              </Row>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId='monthInput'>
              <Row>
                <Col xs={2}>
                  <Form.Label className='mt-1 text-black'>Tháng</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type='number'
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  />
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>

        <div
          style={{ justifyContent: 'end', textAlign: 'end', marginTop: '20px' }}
        >
          <Button
            variant='primary'
            className='button-link-custom'
            style={{ marginLeft: '0px', width: '200px' }}
            onClick={fetchRevenue}
          >
            <b> Xem Doanh Thu</b>
          </Button>
        </div>
      </Form>
      {error && <Alert variant='danger'>{error}</Alert>}
      {revenue !== null && (
        <Alert variant='success'>
          <h4>
            Doanh thu tháng {month}/{year}: {revenue} đồng
          </h4>
        </Alert>
      )}
    </Container>
  );
}

export {
  AverageOrdersPerDay,
  useBestSellingProduct,
  BestSellingProduct,
  TotalRevenue,
  useTotalRevenue,
  useRevenueByCategory,
  RevenueByCategory,
  getTotalOrders,
  TotalOrders,
  AllTotalOrders,
  useTotalOrders,
  useGrowthData,
  GrowthChart,
  MonthlyRevenueChart,
  MonthlyRevenueViewer,
};
