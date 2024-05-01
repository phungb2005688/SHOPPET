import asyncHandler from '../middleware/asyncHandler.js';
import Contact from '../models/contactModel.js';

const addContact = asyncHandler(async (req, res) => {
  const { name, email, phone, message, status } = req.body;

  if (!name || !email || !phone || !message) {
    res.status(400);
    throw new Error('Vui lòng điền tất cả các trường thông tin');
  }
  const contact = new Contact({
    user: req.user._id,
    name,
    email,
    phone,
    message,
    status,
  });

  const createdContact = await contact.save();

  res.status(201).json(createdContact);
});

const getMyContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user: req.user._id });
  res.json(contacts);
});

const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (contact) {
    res.json(contact);
  } else {
    res.status(404);
    throw new Error('Không tìm thấy liên hệ');
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  // NOTE: here we need to verify the payment was made to PayPal before marking
  // the order as paid
  const { verified, value } = await verifyPayPalPayment(req.body.id);
  if (!verified) throw new Error('Payment not verified');

  // check if this transaction has been used before
  const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
  if (!isNewTransaction) throw new Error('Transaction has been used before');

  const order = await Order.findById(req.params.id);

  if (order) {
    // check the correct amount was paid
    const paidCorrectAmount = order.totalPrice.toString() === value;
    if (!paidCorrectAmount) throw new Error('Incorrect amount paid');

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Không tìm thấy đơn hàng');
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin

const updateContactStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const contact = await Contact.findById(req.params.id);

  if (contact) {
    contact.status = status;

    const updatedContact = await contact.save();
    res.json(updatedContact);
  } else {
    res.status(404);
    throw new Error('Không tìm thấy liên hệ');
  }
});

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({}).populate('user', 'id name');
  res.json(contacts);
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (contact) {
    await Contact.deleteOne({ _id: contact._id });
    res.json({ message: 'Contact removed' });
  } else {
    res.status(404);
    throw new Error('Contact not found');
  }
});


export {
  addContact,
  getMyContacts,
  getContactById,
  updateContactStatus,
  updateOrderToPaid,
  getContacts,
  deleteContact
};
