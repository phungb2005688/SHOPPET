import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {

  return (
    <div className='blog'>
      <Card className='blog-card card-hover-effect'>
        <Link to={`/blog/${blog._id}`}>
          <Card.Img src={blog.image} variant='top' className='blog-image' />
        </Link>

        <Card.Body>
          <Card.Title
            as='div'
            style={{
              color: '#dc3545',
              fontSize: '15px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              backgroundColor: '#fff3cd',
              borderRadius: '3px',
              padding: '3px 2px',
              display: 'inline-block',
            }}
          >
            {blog.category}
          </Card.Title>

          <Link to={`/blog/${blog._id}`} style={{ textDecoration: 'none' }}>
            <Card.Title as='div' className='blog-title text-truncate'>
              <strong>{blog.title}</strong>
            </Card.Title>
          </Link>
          <Card.Text className='text-black' style={{ fontSize: '14px' }}>
          <p
            className='desc'
            dangerouslySetInnerHTML={{
              __html: blog.description
                ? blog.description.substr(0, 100) + '...'
                : '',
            }}
          ></p>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Blog;
