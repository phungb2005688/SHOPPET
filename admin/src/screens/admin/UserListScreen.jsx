import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { TbEdit } from "react-icons/tb";

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <h2 className='text-black pt-3'>Khách hàng</h2>
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
              <th>ID khách hàng</th>
              <th>Tên khách hàng</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th>Vai trò</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className='text-center'>{user._id}</td>
                <td className='text-center'>{user.name}</td>
                <td className='text-center'>
                  <a
                    href={`mailto:${user.email}`}
                    className='text-decoration-none'
                  >
                    {user.email}
                  </a>
                </td>
                <td className='text-center'>{user.phone}</td>
                <td className='text-center'>{user.address}</td>

                <td className='text-center'>
                  {user.isAdmin ? (
                    <div>
                      <FaCheck style={{ color: 'green' }}> </FaCheck> Admin
                    </div>
                  ) : (
                    <div>
                      <FaTimes style={{ color: 'red' }} /> {user.name}
                    </div>
                  )}
                </td>
                <td className='text-center'>
                  {!user.isAdmin && (
                    <>
                      <LinkContainer
                        to={`/admin/user/${user._id}/edit`}
                        style={{ marginRight: '10px' }}
                      >
                        <Button variant='light' className='btn-sm mx-1'>
                      <TbEdit style={{fontSize: '20px', color: 'green'}} />
                     
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm text-white '
                        onClick={() => deleteHandler(user._id)}
                      >
                        Xóa 
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
