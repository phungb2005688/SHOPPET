import React, { useState } from 'react';
import { useGetCategoriesAndBrandsQuery } from '../slices/productsApiSlice';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { BiCategory } from "react-icons/bi";
import { FcFilledFilter } from "react-icons/fc";
import { TbBrandBaidu } from "react-icons/tb";

const FilterComponent = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const { data, error, isLoading } = useGetCategoriesAndBrandsQuery();

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange({ category: selectedCategory, brand: selectedBrand });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Form onSubmit={handleSubmit} className='mb-3'>
      <Row className='align-items-end'>
        <Col md={3}>
          <Form.Group controlId='filterCategory'>
            <Form.Label className='text-black'>
              <BiCategory /> Danh mục
            </Form.Label>
            <Form.Control
              as='select'
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value=''>Chọn danh mục</option>
              {data?.categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId='filterBrand'>
            <Form.Label className='text-black'>
              <TbBrandBaidu style={{fontSize: '20px'}} /> Thương hiệu
            </Form.Label>
            <Form.Control
              as='select'
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value=''>Chọn thương hiệu</option>
              {data?.brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={2}>
          <div className='d-flex justify-content-center'>
            <Button
              type='submit'
              className=' button-link-custom '
            > <FcFilledFilter style={{fontSize: '22px'}} /> {''}
              <b>Lọc sản phẩm</b>
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterComponent;
