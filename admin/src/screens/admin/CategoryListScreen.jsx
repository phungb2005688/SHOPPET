import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { TbEdit } from 'react-icons/tb';

import { useNavigate, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
// import Paginate from '../../components/Paginate';
import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from '../../slices/categoryApiSlice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const CategoryListScreen = () => {
  const { pageNumber } = useParams();

  const { data: categories, isLoading, error, refetch } = useGetCategoriesQuery();
  useEffect(() => {
    refetch(); // Gọi refetch khi tham số pageNumber thay đổi
  }, [pageNumber, refetch]);

  const [deleteCategory, { isLoading: loadingDelete }] = useDeleteCategoryMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteCategory(id);
        refetch();
      } catch (err) {
        toast.error(err?.message || err.error);
      }
    }
  };

  const navigate = useNavigate();

  const createCategoryHandler = () => {
    navigate('/admin/create/category');
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h2 className='text-black'>Các danh mục</h2>
        </Col>
        <Col className='text-end' style={{marginRight: '20px'}}>
          <Button
            className='my-3 button-link-custom'
            onClick={createCategoryHandler}
          >
            <FaPlus /> Thêm danh mục
          </Button>
        </Col>
      </Row>

      {/* {loadingCreate && <Loader />} */}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.message}</Message>
      ) : (
        <>
          <Table hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID danh mục</th>
                <th>Tên danh mục</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td className='text-center'>{category._id}</td>

                  <td className='text-center'>{category.title}</td>

                  <td className='text-center'>
                    <LinkContainer to={`/admin/category/${category._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-1'>
                        <TbEdit style={{ fontSize: '20px', color: 'green' }} />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm text-white'
                      onClick={() => deleteHandler(category._id)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <Paginate pages={data.pages} page={data.page} isAdmin={true} /> */}
        </>
      )}
    </>
  );
};

export default CategoryListScreen;
