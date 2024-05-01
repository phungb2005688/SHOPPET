import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const imageUrls = [
    'https://res.cloudinary.com/dazlm83i8/image/upload/v1713290736/slider/slider2_hq1vkn.png',
'https://res.cloudinary.com/dazlm83i8/image/upload/v1713294501/slider/slider5_vmfehp.png',
    'https://res.cloudinary.com/dazlm83i8/image/upload/v1713294267/slider/slider4_lwfnbf.png'
  ];

  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}>
      {/* Carousel thứ nhất có flex nhỏ hơn */}
      <Carousel pause='hover' className='bg-primary mb-4' style={{ flex: 1 }}>
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image src={product.image} alt={product.name} fluid />
              <Carousel.Caption className='carousel-caption'>
                <h6 className='text-white text-right'>
                  {product.name} ({product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VNĐ)
                </h6>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
      {/* Carousel thứ hai có flex lớn hơn */}
      <Carousel pause='hover' className='bg-secondary mb-4' style={{ flex: 2 }}>
        {imageUrls.map((url, index) => (
          <Carousel.Item key={index}>
            <Image src={url} alt={`Slide ${index + 1}`} fluid />
            {/* <Carousel.Caption className='carousel-caption'>
            </Carousel.Caption> */}
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;

// import { Link } from 'react-router-dom';
// import { Carousel, Image } from 'react-bootstrap';
// import Message from './Message';
// import { useGetTopProductsQuery } from '../slices/productsApiSlice';

// const ProductCarousel = () => {
//   const { data: products, isLoading, error } = useGetTopProductsQuery();
//   const imageUrls = [
//     'https://example.com/image1.jpg',
//     'https://example.com/image2.jpg',
//     'https://example.com/image3.jpg',
//   ];
//   return isLoading ? null : error ? (
//     <Message variant='danger'>{error?.data?.message || error.error}</Message>
//   ) : (
//     <>
//     <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
//     <Carousel pause='hover' className='bg-primary mb-4' style={{ flex: 1 }}>
//         {/* <Carousel
//           pause='hover'
//           className='bg-primary mb-4'
//           style={{ width: '380px', height: '380px' }}
//         > */}
//           {products.map((product) => (
//             <Carousel.Item
//               key={product._id}
//               style={{ width: '380px', height: '380px' }}
//             >
//               <Link to={`/product/${product._id}`}>
//                 <Image src={product.image} alt={product.name} fluid />
//                 <Carousel.Caption className='carousel-caption'>
//                   <h5 className='text-white text-right'>
//                     {product.name} (
//                     {product.price
//                       .toString()
//                       .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
//                     VNĐ)
//                   </h5>
//                 </Carousel.Caption>
//               </Link>
//             </Carousel.Item>
//           ))}
//         </Carousel>
//       </div>
//       <Carousel pause='hover' className='bg-secondary mb-4' style={{ flex: 2 }}>

//         {/* <Carousel
//           pause='hover'
//           className='bg-secondary mb-4'
//           style={{ width: '730px', height: '380px' }}
//         > */}
//           {imageUrls.map((url, index) => (
//             <Carousel.Item
//               key={index}
//               style={{ width: '730px', height: '380px' }}
//             >
//               <Image src={url} alt={`Slide ${index + 1}`} fluid />
//               <Carousel.Caption className='carousel-caption'>
//                 <h5 className='text-white'>Slide {index + 1}</h5>
//               </Carousel.Caption>
//             </Carousel.Item>
//           ))}
//         </Carousel>
      
//     </>
//   );
// };

// export default ProductCarousel;
