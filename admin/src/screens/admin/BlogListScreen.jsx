import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Image } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { TbEdit } from 'react-icons/tb';

import { useNavigate, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import {
  useGetBlogsQuery,
  useDeleteBlogMutation,
} from '../../slices/blogsApiSlice';
import { toast } from 'react-toastify';

const BlogListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetBlogsQuery({
    pageNumber,
  });

  const [deleteBlog, { isLoading: loadingDelete }] = useDeleteBlogMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteBlog(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  // const truncate = (str, num) => {
  //   if (str.length > num) {
  //     return str.slice(0, num) + '...';
  //   } else {
  //     return str;
  //   }
  // };
  const navigate = useNavigate();

  const createBlogHandler = () => {
    navigate('/admin/create/blog');
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h2 className='text-black'>Các bài viết</h2>
        </Col>
        <Col className='text-end' style={{ marginRight: '20px' }}>
          <Button
            className='my-3 button-link-custom'
            onClick={createBlogHandler}
          >
            <FaPlus /> Thêm bài viết
          </Button>
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
                <th>ID bài viết</th>
                <th>Ảnh</th>
                <th>Tên bài viết</th>
                <th>Danh mục</th>
                <th>Nội dung</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.blogs.map((blog) => (
                <tr key={blog._id}>
                  <td className='text-center'>{blog._id}</td>
                  <td className='text-center'>
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fluid
                      style={{ width: '80px', height: '80px' }}
                    />
                  </td>
                  <td className='text-center'>{blog.title}</td>
                  <td className='text-center'>{blog.category}</td>
                  <td className='text-center'>
                    <p
                      className='desc'
                      dangerouslySetInnerHTML={{
                        __html: blog.description
                          ? blog.description.substr(0, 100) + '...'
                          : '',
                      }}
                    ></p>
                  </td>

                  <td className='text-center pt-2'>
                    <LinkContainer to={`/admin/blog/${blog._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-1 mb-2'>
                        <TbEdit style={{ fontSize: '20px', color: 'green' }} />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm text-white'
                      onClick={() => deleteHandler(blog._id)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default BlogListScreen;
