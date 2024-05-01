import { Link, useParams } from 'react-router-dom';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

// import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  useGetContactDetailsQuery,
  // useUpdateContactMutation,
  // useDeleteContactMutation,
} from '../slices/contantsApiSlice';

const ContactDetailScreen = () => {
  const { id: contactId } = useParams();

  const {
    data: contact,
    isLoading,
    error,
  } = useGetContactDetailsQuery(contactId);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error.data.message}</Message>
  ) : (
    <>
      <Container className='container-contact'>
        <>
          <div
            className='circle circle1'
            style={{ top: '10%', left: '10%' }}
          ></div>
          <div
            className='circle circle2'
            style={{ top: '10%', left: '80%' }}
          ></div>
          <div
            className='circle circle3'
            style={{ top: '70%', left: '20%' }}
          ></div>
          <div
            className='circle circle4'
            style={{ top: '70%', left: '90%' }}
          ></div>
          <div
            className='circle circle5'
            style={{ top: '50%', left: '50%' }}
          ></div>

          <div
            className='square square1'
            style={{ top: '15%', left: '85%' }}
          ></div>
          <div
            className='square square2'
            style={{ top: '25%', left: '5%' }}
          ></div>
          <div
            className='square square3'
            style={{ top: '55%', left: '45%' }}
          ></div>

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
        </>

        <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
            {isLoading && <Loader />}
            {error && <Message variant='danger'>{error.data.message}</Message>}
            <Card className='contact-form'>
              <Card.Header className='text-uppercase'>
                Chi Tiết Liên Hệ
              </Card.Header>
              <Card.Body
                className='item-value text-black'
                style={{ marginLeft: '30px' }}
              >
                <Card.Title className='mb-3'>
                  Người gửi: {contact.name}
                </Card.Title>
                <Card.Text className='mb-3'>
                  <div className='form-control-underline mb-3'>
                    <strong>Email:</strong> {contact.email}
                    <br />
                  </div>
                  <div className='form-control-underline mb-3'>
                    <strong>Số điện thoại:</strong> {contact.phone}
                    <br />
                  </div>
                  <div className='form-control-underline '>
                    <strong>Lời nhắn:</strong> {contact.message}
                    <br />
                  </div>

                </Card.Text>
                <Link to='/profile'>
                  <div className='text-end'>
                    <Button
                      type='submit'
                      variant='primary'
                      className='button-link-custom'
                      style={{ marginBottom: '0px', width: '150px' }}
                    >
                      <b>Quay lại </b>
                    </Button>
                  </div>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ContactDetailScreen;
