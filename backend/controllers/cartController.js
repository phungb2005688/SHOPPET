import asyncHandler from '../middleware/asyncHandler.js';
import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js'; 

// Thêm sản phẩm vào giỏ hàng
export const addToCart = async (req, res) => {
  const { productId, qty } = req.body;
  const userId = req.user._id; // Giả sử bạn đã xác thực người dùng và có ID của họ

  try {
    let cart = await Cart.findOne({ user: userId });
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send({ message: 'Sản phẩm không tồn tại' });
    }

    const price = product.price;
    const cartItem = {
      product: productId,
      qty,
      price
    };

    if (!cart) {
      // Nếu không có giỏ hàng, tạo mới
      cart = new Cart({
        user: userId,
        cartItems: [cartItem]
      });
    } else {
      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);

      if (itemIndex > -1) {
        // Nếu có, cập nhật số lượng
        cart.cartItems[itemIndex].qty += qty;
      } else {
        // Nếu không, thêm mới sản phẩm vào giỏ hàng
        cart.cartItems.push(cartItem);
      }
    }

    await cart.save();
    res.status(201).send(cart);
  } catch (error) {
    res.status(500).send({ message: 'Lỗi khi thêm sản phẩm vào giỏ hàng', error });
  }
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
export const updateCartItem = async (req, res) => {
  const { productId, qty } = req.body;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).send({ message: 'Giỏ hàng không tồn tại' });
    }

    const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);
    if (itemIndex > -1) {
      cart.cartItems[itemIndex].qty = qty;
      if (qty <= 0) {
        cart.cartItems.splice(itemIndex, 1); // Xóa sản phẩm nếu số lượng <= 0
      }
    } else {
      return res.status(404).send({ message: 'Sản phẩm không tồn tại trong giỏ hàng' });
    }

    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({ message: 'Lỗi khi cập nhật giỏ hàng', error });
  }
};

// Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).send({ message: 'Giỏ hàng không tồn tại' });
    }

    cart.cartItems = cart.cartItems.filter(item => item.product.toString() !== productId);

    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({ message: 'Lỗi khi xóa sản phẩm khỏi giỏ hàng', error });
  }
};

// Lấy thông tin giỏ hàng
export const getCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).send({ message: 'Giỏ hàng không tồn tại' });
    }

    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({ message: 'Lỗi khi lấy thông tin giỏ hàng', error });
  }
};
