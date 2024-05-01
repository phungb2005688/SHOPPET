import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  // FIX: uncontrolled input - urlKeyword may be undefined
  const [keyword, setKeyword] = useState(urlKeyword || '');

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   if (keyword) {
  //     navigate(`/search/${keyword.trim()}`);
  //     setKeyword('');
  //   } else {
  //     navigate('/');
  //   }
  // };
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      // Xác định trang hiện tại để quyết định điều hướng
      const currentPath = window.location.pathname;
      if (currentPath === '/') { // Nếu đang ở trang chủ
        navigate(`/search/${keyword.trim()}`);
      } else if (currentPath.includes('/blog')) {
        navigate(`/blog/search/${keyword.trim()}`);
      } else {
        navigate(`/allproduct/search/${keyword.trim()}`);
      }
      setKeyword('');
    } else {
      navigate('/'); // Hoặc trở về trang chủ
    }
  };
  
  
  return (
    <>
      <Form onSubmit={submitHandler}>
        <div className='d-flex' style={{ width: '400px', height: '40px' }}>
          <Form.Control
            type='text'
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            placeholder='Tìm kiếm sản phẩm...'
            className='mr-sm-2 ml-sm-5'
          ></Form.Control>
          <Button
            type='submit'
            style={{ width: '50px' }}
            variant='outline-success'
            className='p-2 mx-2'
          >
            <FaSearch className='mb-2' />
          </Button>
        </div>
      </Form>
    </>
  );
};

export default SearchBox;
