import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../slices/usersApiSlice';

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success('user updated successfully');
      refetch();
      navigate('/admin/userlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  return (
    <>
      <FormContainer>
        <h3 className='text-black text-center pt-5'>CHỈNH SỬA KHÁCH HÀNG</h3>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='name'>
              <Row>
                <Col xs={12} md={3}>
                  <Form.Label className='item-value'>Tên khách hàng</Form.Label>
                </Col>
                <Col xs={12} md={9}>
                  <Form.Control
                    type='name'
                    placeholder='Nhập tên khách hàng'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className='my-2 pt-3' controlId='email'>
              <Row>
                <Col xs={12} md={3}>
                  <Form.Label className='item-value'>Địa chỉ email</Form.Label>
                </Col>
                <Col xs={12} md={9}>
                  <Form.Control
                    type='email'
                    placeholder='Nhập email khách hàng'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className='my-2 pt-1 pb-1' controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                style={{ marginLeft: '165px' }}
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <div style={{ justifyContent: 'center', textAlign: 'center' }}>
              <Button
                type='submit'
                variant='primary'
                className='button-link-custom mb-3'
              >
                Cập nhật khách hàng
              </Button>
            </div>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
