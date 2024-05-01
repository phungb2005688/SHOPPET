import { useParams } from 'react-router-dom';
import { useGetBlogsQuery } from '../slices/blogsApiSlice';
import Blog from '../components/Blog';
import Loader from '../components/Loader';
import Message from '../components/Message';
// import Paginate from '../components/Paginate';
import { Col, Row } from 'react-bootstrap';
import Meta from '../components/Meta';

const BlogScreen = () => {
  const { keyword, pageNumber } = useParams();

  const {
    data: blogData,
    isLoading: blogLoading,
    error: blogError,
  } = useGetBlogsQuery({
    keyword,
    pageNumber,
  });
  const isSearching =
    keyword !== undefined && keyword !== null && keyword !== '';
  return (
    <>
    <Meta title={'Bài viết'}></Meta>
      {blogLoading ? (
        <Loader />
      ) : blogError ? (
        <Message variant='danger'>
          {blogError?.data?.message || blogError.error}
        </Message>
      ) : (
        <>
          <h3>{isSearching ? 'KẾT QUẢ TÌM KIẾM' : 'TẤT CẢ BÀI VIẾT'}</h3>
          <Row>
            {blogData.blogs.map((blog) => (
              <Col key={blog._id} sm={12} md={6} lg={4} xl={3}>
                <Blog blog={blog} />
              </Col>
            ))}
          </Row>
          {/* <Paginate
            pages={blogData.pages}
            page={blogData.page}
            keyword={keyword ? keyword : ''}
          /> */}
        </>
      )}
    </>
  );
};

export default BlogScreen;
