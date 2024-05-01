import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { IoMdPhonePortrait } from 'react-icons/io';
import { MdCheckCircle, MdCheckCircleOutline, MdOutlineMessage } from 'react-icons/md';
import { HiOutlineMail } from "react-icons/hi";
import { SiNamecheap } from "react-icons/si";
import { FiSend } from "react-icons/fi";
import { useCreateContactMutation } from '../slices/contantsApiSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';
import Meta from '../components/Meta';

const ContactPage = () => {
  const [createContact, { isLoading, error }] = useCreateContactMutation();
  const navigate = useNavigate();
  const [error1, setError] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      const newFormData = {
        name: userInfo.name || '',
        email: userInfo.email || '',
        phone: userInfo.phone || '',
        message: '', // Giữ trống hoặc đặt giá trị mặc định nếu cần
      };
  
      setFormData(newFormData);
  
      // Cập nhật trạng thái completed dựa trên dữ liệu form mới
      setCompleted({
        name: !!newFormData.name,
        email: !!newFormData.email,
        phone: !!newFormData.phone,
        message: !!newFormData.message.trim(), // Giả sử rằng chỉ coi là hoàn thành nếu có nội dung thực sự
      });
    }
  }, [userInfo]);
  
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^\+?(\d{10,12})$/; // Adjust regex according to your country standards
    return regex.test(phone);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      toast.error('Email không hợp lệ.');
      return;
    }
    if (!validatePhone(formData.phone)) {
      toast.error('Số điện thoại không hợp lệ.');
      return;
    }
    if (formData.message.length < 10) {
      setError('Lời nhắn phải có ít nhất 10 ký tự.');
      return;
    }
    try {
      await createContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      }).unwrap(); 
      toast.success('Đã gửi yêu cầu');
      navigate('/profile');
    } catch (err) {
      toast.error(err.data?.message || 'Có lỗi xảy ra'); 
    }
  }
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [completed, setCompleted] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  const totalSteps = 4; // Total number of steps in the form

  const onChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  setCompleted(prev => ({ ...prev, [name]: value.trim() !== '' }));
};


  return (
    <>
    <Meta title={'Liên hệ với chúng tôi'}></Meta>
     <Container className='container-contact'>
      <div className='circle circle1' style={{ top: '10%', left: '10%' }}></div>
      <div className='circle circle2' style={{ top: '10%', left: '80%' }}></div>
      <div className='circle circle3' style={{ top: '70%', left: '20%' }}></div>
      <div className='circle circle4' style={{ top: '70%', left: '90%' }}></div>
      <div className='circle circle5' style={{ top: '50%', left: '50%' }}></div>

      <div className='square square1' style={{ top: '15%', left: '85%' }}></div>
      <div className='square square2' style={{ top: '25%', left: '5%' }}></div>
      <div className='square square3' style={{ top: '55%', left: '45%' }}></div>

      <div
        className='triangle triangle1'
        style={{ top: '10%', left: '5%' }}
      ></div>
      <div
        className='triangle triangle2'
        style={{ top: '85%', left: '10%' }}
      ></div>
      <div
        className='triangle triangle3'
        style={{ top: '10%', left: '90%' }}
      ></div>

      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
        {isLoading && <Loader />}
        {error && <Message variant='danger'>{error.data.message}</Message>}
          <Form onSubmit={submitHandler} className='contact-form'>
          {error1 && <Alert variant='danger'>{error1}</Alert>}

            <h3 className='text-center text-black text-uppercase mt-2'>
              Liên hệ với chúng tôi
            </h3>
            <ProgressBar
              stepsCompleted={Object.values(completed).filter(Boolean).length}
              totalSteps={totalSteps}
            />
            <Form.Group
              className={`mb-3 ${completed.name ? 'slide-out' : ''}`}
              controlId='formBasicName'
            >
              <Row>
                <Col xs={12} md={2}>
                  <Form.Label
                    className='item-value text-black fw-bold'
                    style={{ marginLeft: '30px' }}
                  >
                    <SiNamecheap style={{fontSize: '25px'}}/>
                  </Form.Label>
                </Col>
                <Col xs={12} md={10}>
                  <Form.Control
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={onChange}
                    placeholder='Nhập tên của bạn'
                    required
                    className='form-control-underline text-black' // Sử dụng class mới
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group
              className={`mb-3 ${completed.email ? 'slide-out' : ''}`}
              controlId='formBasicPhone'
            >
              <Row>
                <Col xs={12} md={2}>
                  <Form.Label
                    className='item-value text-black fw-bold'
                    style={{ marginLeft: '30px' }}
                  >
                    <IoMdPhonePortrait style={{fontSize: '25px'}}/>
                  </Form.Label>
                </Col>
                <Col xs={12} md={10}>
                  <Form.Control
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={onChange}
                    placeholder='Nhập số điện thoại của bạn'
                    required
                    className='form-control-underline text-black' // Sử dụng class mới
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group
              className={`mb-3 ${completed.email ? 'slide-out' : ''}`}
              controlId='formBasicEmail'
            >
              <Row>
                <Col xs={12} md={2}>
                  <Form.Label
                    className='item-value text-black fw-bold'
                    style={{ marginLeft: '30px' }}
                  >
                    <HiOutlineMail style={{fontSize: '25px'}}/>
                  </Form.Label>
                </Col>
                <Col xs={12} md={10}>
                  <Form.Control
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={onChange}
                    placeholder='Nhập email của bạn'
                    required
                    className='form-control-underline text-black' // Sử dụng class mới
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group
              className={`mb-3 ${completed.message ? 'slide-out' : ''}`}
              controlId='formBasicMessage'
            >
              <Row>
                <Col xs={12} md={2}>
                  <Form.Label
                    className='item-value text-black fw-bold'
                    style={{ marginLeft: '30px' }}
                  >
                    <MdOutlineMessage style={{fontSize: '25px'}}/>
                  </Form.Label>
                </Col>
                <Col xs={12} md={10}>
                  <Form.Control
                    as='textarea'
                    rows={3}
                    name='message'
                    value={formData.message}
                    onChange={onChange}
                    placeholder='Viết lời nhắn của bạn tại đây'
                    required
                    className='form-control-underline text-black' // Sử dụng class mới
                  />
                </Col>
              </Row>
            </Form.Group>

            <div style={{ justifyContent: 'center', textAlign: 'center' }}>
              <Button
                type='submit'
                variant='primary'
                className='button-link-custom1'
                style={{ marginLeft: '0px', width: '200px' }}
              >
                <b>GỬI  </b><FiSend style={{fontSize: '20px', marginBottom: '3px'}}/>
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
    </>
   
  );
};

const ProgressBar = ({ stepsCompleted, totalSteps }) => {
  return (
    <div className='progress-bar-container'>
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`step ${index < stepsCompleted ? 'completed' : ''}`}
        >
          <span className='arrow'>
            {index < stepsCompleted ? (
              <MdCheckCircle className='icon' />
            ) : (
              <MdCheckCircleOutline className='icon' />
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ContactPage;
