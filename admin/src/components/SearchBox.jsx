import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  // FIX: uncontrolled input - urlKeyword may be undefined
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} className='d-flex' style={{width: '400px'}}>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder='Tìm kiếm sản phẩm...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' style={{width: '150px'}} variant='outline-success' className='p-2 mx-2'>
      <i className="bi bi-search"></i> Tìm kiếm
      </Button>
    </Form>
  );
};

export default SearchBox;
