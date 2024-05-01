import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded card-hover-effect'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
          <div style={{ color: '#ffbf00', fontSize: '12px', marginTop: '5px' }}>
            <b className='text-uppercase'>{product.category}</b>
          </div>
          <Card.Title as='div' className='product-title'>
            <strong className='text-black'>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} đánh giá`}
          />
        </Card.Text>

        <Card.Text as='h3'>
          {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VNĐ
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
