import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import Category from '../models/categoryModel.js';

// Thống kê theo khoảng thời gian được chọn
export const getStats = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;

  const start = new Date(startDate);
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999); // Đặt thời gian kết thúc vào cuối ngày

  const totalOrders = await Order.countDocuments({
    isPaid: true, // chỉ những đơn hàng đã thanh toán mới được tính
    createdAt: { $gte: start, $lte: end },
  });

  const totalRevenue = await Order.aggregate([
    {
        $match: {
            createdAt: { $gte: start, $lte: end },
            isPaid: true // chỉ xét những đơn hàng đã thanh toán
        }
    },
    {
        $group: {
            _id: null,
            totalRevenue: { $sum: "$totalPrice" } // Sử dụng $sum để tính tổng doanh thu
        }
    }
]);
  // Tính tổng số người dùng
  const totalUsers = await User.countDocuments();

  // Tính tổng số sản phẩm
  const totalProducts = await Product.countDocuments();

  // console.log("Start Date:", startDate, "End Date:", endDate);
  // console.log("Data returned:", { totalOrders, totalRevenue });

  res.json({
    totalOrders,
    totalRevenue: totalRevenue[0]?.totalRevenue || 0,
    totalUsers,
    totalProducts,
  });
});

// Thống kê đơn hàng trung bình mỗi ngày
export const getAverageOrdersPerDay = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;

  const start = new Date(startDate);
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  const orders = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: start, $lte: end },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: null,
        average: { $avg: '$count' },
      },
    },
  ]);

  res.json({ averageOrdersPerDay: orders[0]?.average || 0 });
});

// Thống kê sản phẩm bán chạy
export const getBestSellingProduct = asyncHandler(async (req, res) => {
  const bestSelling = await Order.aggregate([
    { $unwind: '$orderItems' },
    {
      $group: {
        _id: '$orderItems.product',
        totalSold: { $sum: '$orderItems.qty' },
        name: { $first: '$orderItems.name' },
      },
    },
    { $sort: { totalSold: -1 } },
    { $limit: 1 },
    {
      $lookup: {
        from: 'products', // Giả sử tên collection sản phẩm của bạn là 'products'
        localField: '_id',
        foreignField: '_id',
        as: 'productDetails',
      },
    },
    { $unwind: '$productDetails' }, // Giải nén để dễ dàng truy cập thông tin sản phẩm
    {
      $project: {
        // Chọn các trường thông tin bạn muốn hiển thị
        totalSold: 1,
        name: 1,
        image: '$productDetails.image', // Thêm trường hình ảnh từ thông tin sản phẩm
        price: '$productDetails.price', // Có thể thêm giá nếu bạn muốn
      },
    },
  ]);

  if (bestSelling.length === 0) {
    res.status(404).send({ message: 'No products found' });
  } else {
    res.json(bestSelling[0]);
  }
});

// Thống kê tổng doanh thu
export const getTotalRevenue = asyncHandler(async (req, res) => {
  const totalRevenue = await Order.aggregate([
    { $match: { isPaid: true } }, // Chỉ tính các đơn đã thanh toán
    { $group: { _id: null, total: { $sum: '$totalPrice' } } }, // Tính tổng giá trị của trường totalPrice
  ]);

  if (totalRevenue.length > 0) {
    res.json({ totalRevenue: totalRevenue[0].total });
  } else {
    res.status(404).json({ message: 'Không tìm thấy dữ liệu doanh thu' });
  }
});

// Thống kê doanh thu theo danh mục sản phẩm
export const getRevenueByCategory = asyncHandler(async (req, res) => {
  const revenueByCategory = await Order.aggregate([
    { $match: { isPaid: true } }, // Chỉ xét những đơn hàng đã được thanh toán

    { $unwind: '$orderItems' },
    {
      $lookup: {
        from: 'products',
        localField: 'orderItems.product',
        foreignField: '_id',
        as: 'productDetails',
      },
    },
    { $unwind: '$productDetails' },
    {
      $group: {
        _id: '$productDetails.category',
        totalRevenue: {
          $sum: { $multiply: ['$orderItems.qty', '$orderItems.price'] },
        },
      },
    },
    { $sort: { totalRevenue: -1 } },
  ]);

  res.json(revenueByCategory);
});

// Hàm lấy tổng số đơn hàng chưa thanh toán
export const getTotalUnpaidOrders = async (req, res) => {
  try {
    // Chỉ đếm những đơn hàng chưa được thanh toán
    const count = await Order.countDocuments();
    res.json({ totalOrders: count });
  } catch (error) {
    res.status(500).send({
      message: 'Error retrieving unpaid order count',
      error: error.message,
    });
  }
};


// Hàm lấy tổng số đơn hàng
export const getTotalOrders = async (req, res) => {
  try {
    // Only count orders where 'isPaid' is true
    const count = await Order.countDocuments({ isPaid: true });
    res.json({ totalOrders: count });
  } catch (error) {
    res.status(500).send({
      message: 'Error retrieving order count',
      error: error.message,
    });
  }
};

// Biểu đồ tăng trưởng theo ngày tháng năm
export const getGrowthData = asyncHandler(async (req, res) => {
  const { type } = req.query; // 'daily', 'monthly', 'yearly'

  let groupBy = {};
  if (type === 'daily') {
    groupBy = {
      day: { $dayOfMonth: '$createdAt' },
      month: { $month: '$createdAt' },
      year: { $year: '$createdAt' },
    };
  } else if (type === 'monthly') {
    groupBy = {
      month: { $month: '$createdAt' },
      year: { $year: '$createdAt' },
    };
  } else if (type === 'yearly') {
    groupBy = { year: { $year: '$createdAt' } };
  }

  const growthData = await Order.aggregate([
    { $match: { isPaid: true } }, // Only consider paid orders
    {
      $group: {
        _id: groupBy,
        totalRevenue: { $sum: '$totalPrice' },
        countOrders: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } },
  ]);

  res.json(growthData);
});

// Thống kê Doanh Thu Hàng Tháng
export async function getMonthlyRevenue(req, res) {
  try {
    const result = await Order.aggregate([
      {
        $match: { isPaid: true }, // Chỉ xét các đơn hàng đã thanh toán
      },
      {
        $group: {
          _id: {
            year: { $year: '$paidAt' },
            month: { $month: '$paidAt' },
          },
          totalRevenue: { $sum: '$totalPrice' },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }, // Sắp xếp kết quả theo thời gian
      },
    ]);

    res.json({
      success: true,
      data: result.map((item) => ({
        year: item._id.year,
        month: item._id.month,
        totalRevenue: item.totalRevenue,
        count: item.count,
      })),
    });
  } catch (error) {
    console.error('Error getting monthly revenue:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
// Thống kê doanh thu tháng cụ thể
export const getSpecificMonthRevenue = async (req, res) => {
  const { year, month } = req.params;
  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0); // Lấy ngày cuối của tháng

    const revenue = await Order.aggregate([
      {
        $match: {
          paidAt: { $gte: startDate, $lte: endDate },
          isPaid: true, // Giả sử bạn có trường này để kiểm tra đơn hàng đã được thanh toán
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      revenue: revenue.length > 0 ? revenue[0].totalRevenue : 0,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// export const getGrowthData = asyncHandler(async (req, res) => {
//   const { type } = req.query; // type could be 'monthly', 'quarterly', etc.

//   // Example: Get monthly revenue growth
//   const growthData = await Order.aggregate([
//     {
//       $group: {
//         _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } },
//         totalRevenue: { $sum: '$totalPrice' },
//         countOrders: { $sum: 1 },
//       },
//     },
//     { $sort: { '_id.year': 1, '_id.month': 1 } },
//   ]);

//   res.json(growthData);
// });
