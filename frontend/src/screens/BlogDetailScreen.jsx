import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {
  Row,
  ListGroup,
  Container,
} from 'react-bootstrap';
import { useGetBlogDetailsQuery } from '../slices/blogsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { IoMdArrowBack } from 'react-icons/io';
import { FaCalendarDay, FaClock } from 'react-icons/fa';
import { useEffect } from 'react';

const BlogDetailScreen = () => {
  const { id: blogId } = useParams();

  const { data: blog, isLoading, error } = useGetBlogDetailsQuery(blogId);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('vi-VN', options);
  };

  const formatTime = (dateString) => {
    const time = new Date(dateString);
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };
    return time.toLocaleTimeString('vi-VN', options);
    
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <Link className='btn btn-light my-3' to='/blog'>
        <IoMdArrowBack style={{ margin: '5px' }}></IoMdArrowBack>Quay lại
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={blog.title} description={blog.description} />
          <div
            className='d-flex align-items-center justify-content-between'
            style={{ width: '100%' }}
          >
            <div className='d-flex align-items-center'>
              <ListGroup.Item
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: 'none',
                  background: 'none',
                }}
              >
                <FaCalendarDay style={{ marginRight: '10px' }} />
                {formatDate(blog.createdAt)}
              </ListGroup.Item>

              <ListGroup.Item
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: 'none',
                  background: 'none',
                }}
              >
                <FaClock style={{ marginLeft: '10px', marginRight: '5px' }} />
                {formatTime(blog.createdAt)}
              </ListGroup.Item>
            </div>

            <h5
              style={{
                color: '#dc3545',
                fontSize: '18px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                backgroundColor: '#fff3cd',
                borderRadius: '5px',
                padding: '5px 10px',
                margin: '5px',
              }}
            >
              Mục: {blog.category}
            </h5>
          </div>

          <Row>
            <h2 className='text-center text-uppercase text-black mt-4'>
              {blog.title}
            </h2>
            <Container>
              <ListGroup.Item>
                <p
                  className='desc text-black'
                  dangerouslySetInnerHTML={{
                    __html: blog.description,
                  }}
                ></p>
              </ListGroup.Item>
            </Container>
          </Row>
        </>
      )}
    </>
  );
};

export default BlogDetailScreen;
