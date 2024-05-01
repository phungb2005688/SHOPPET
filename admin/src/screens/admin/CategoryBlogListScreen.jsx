import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { TbEdit } from 'react-icons/tb';

import { useNavigate, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
// import Paginate from '../../components/Paginate';
import {
  useGetCategoriesBlogQuery,
  useDeleteCategoryBlogMutation,
} from '../../slices/categoryBlogApiSlice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const CategoryBlogListScreen = () => {
  const { pageNumber } = useParams();

  const { data: categoriesblog, isLoading, error, refetch } = useGetCategoriesBlogQuery();
  useEffect(() => {
    refetch(); // Gọi refetch khi tham số pageNumber thay đổi
  }, [pageNumber, refetch]);

  const [deleteCategoryBlog, { isLoading: loadingDelete }] = useDeleteCategoryBlogMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteCategoryBlog(id);
        refetch();
      } catch (err) {
        toast.error(err?.message || err.error);
      }
    }
  };

  const navigate = useNavigate();

  const createCategoryBlogHandler = () => {
    navigate('/admin/create/categoryblog');
  };

  return (
    <>
    
      <Row className='align-items-center'>
        <Col>
          <h2 className='text-black'>Các danh mục bài viết</h2>
        </Col>
        <Col className='text-end' style={{marginRight: '20px'}}>
          <Button
            className='my-3 button-link-custom'
            onClick={createCategoryBlogHandler}
          >
            <FaPlus /> Thêm danh mục bài viết
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
              {categoriesblog.map((categoryblog) => (
                <tr key={categoryblog._id}>
                  <td className='text-center'>{categoryblog._id}</td>

                  <td className='text-center'>{categoryblog.title}</td>

                  <td className='text-center'>
                    <LinkContainer to={`/admin/categoryblog/${categoryblog._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-1'>
                        <TbEdit style={{ fontSize: '20px', color: 'green' }} />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm text-white'
                      onClick={() => deleteHandler(categoryblog._id)}
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

export default CategoryBlogListScreen;
