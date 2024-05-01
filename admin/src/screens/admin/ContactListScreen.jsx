import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { TbEdit } from 'react-icons/tb';

import { useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from '../../slices/contantsApiSlice';
import { toast } from 'react-toastify';

const ContactListScreen = () => {
  const { keyword, pageNumber } = useParams();
  const { id: contactId } = useParams();

  const { data: contacts, isLoading, error, refetch } = useGetContactsQuery({
    contactId,
    keyword,
    pageNumber,
  });

  const [deleteContact, { isLoading: loadingDelete }] = useDeleteContactMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteContact(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h2 className='text-black mt-4 mb-3'>Các lời nhắn từ khách hàng</h2>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.data.message}</Message>
      ) : (
        <>
          <Table hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID lời nhắn</th>
                <th>Tên</th>
                <th>Ngày gửi</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Lời nhắn</th>
                <th>Trạng thái</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {contacts && contacts.map((contact) => (
                <tr key={contact._id}>
                  <td className='text-center'>{contact._id}</td>
                  
                  <td className='text-center'>{contact.name}</td>
                  <td className='text-center'>{contact.createdAt.substring(0, 10)}</td>
                  <td className='text-center'>{contact.email}</td>
                  <td className='text-center'>{contact.phone}</td>

                  <td className='text-center'>
                    <p
                      className='desc'
                      dangerouslySetInnerHTML={{
                        __html: contact.message
                          ? contact.message.substr(0, 50) + '...'
                          : '',
                      }}
                    ></p>
                  </td>
                  <td className='text-center'>{contact.status}</td>

                  <td className='text-center pt-2'>
                    <LinkContainer to={`/admin/contact/${contact._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-1 mb-2'>
                        <TbEdit style={{ fontSize: '20px', color: 'green' }} />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm text-white'
                      onClick={() => deleteHandler(contact._id)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ContactListScreen;
