import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { IoMdArrowBack } from 'react-icons/io';
import { toast } from 'react-toastify';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import {
  useGetBlogDetailsQuery,
  useUpdateBlogMutation,
  useUploadBlogImageMutation,
} from '../../slices/blogsApiSlice';
import { useGetCategoriesBlogQuery } from '../../slices/categoryBlogApiSlice';


const BlogEditScreen = () => {
  const { id: blogId } = useParams();

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const {
    data: blog,
    isLoading,
    refetch,
    error,
  } = useGetBlogDetailsQuery(blogId);

  const {
    data: categories,
    isLoading: categoryLoading,
    // error: categoryError,
  } = useGetCategoriesBlogQuery();


  const [updateBlog, { isLoading: loadingUpdate }] = useUpdateBlogMutation();

  const [uploadBlogImage, { isLoading: loadingUpload }] =
    useUploadBlogImageMutation();


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateBlog({
        blogId,
        title,
        image,
        category,
        description,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success('Bài viết đã cập nhật');
      refetch();
      navigate('/admin/bloglist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setImage(blog.image);
      setCategory(blog.category);
      setDescription(blog.description);
    }
  }, [blog]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadBlogImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      // Sử dụng window.CKEDITOR để truy cập CKEditor đã được tải từ CDN
      window.CKEDITOR.replace(editorRef.current, {
        on: {
          change: function (evt) {
            setDescription(evt.editor.getData());
          },
        },
      });
    }

    // Cleanup function để hủy CKEditor khi component unmount
    return () => {
      if (window.CKEDITOR.instances.editor1) {
        window.CKEDITOR.instances.editor1.destroy(true);
      }
    };
  }, []);
  return (
    <>
      <Link to='/admin/bloglist' className='btn btn-dark text-white mt-2'>
        <IoMdArrowBack style={{ margin: '5px' }}></IoMdArrowBack>Quay lại
      </Link>
      <FormContainer>
        <h3 className='text-black text-center pt-2 '>CHỈNH SỬA BÀI VIẾT</h3>
        {loadingUpdate && <Loader />}
        {isLoading || (categoryLoading && <Loader />)}
        {error && <Message variant='danger'>{error.data.message}</Message>}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Row className='justify-content-md-center mb-3'>
                <Col xs={12} md={3}>
                  <Form.Label className='item-value text-black fw-bold '>Tên bài viết</Form.Label>
                </Col>
                <Col xs={12} md={9}>
                  <Form.Control
                    type='name'
                    placeholder='Nhập tên bài viết'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId='image'>
              <Row className='justify-content-md-center mb-3'>
                <Col xs={12} md={3}>
                  <Form.Label className='item-value text-black fw-bold'>Hình ảnh</Form.Label>
                </Col>
                <Col xs={12} md={9}>
                  <Form.Control
                    className='mb-2'
                    type='text'
                    placeholder='URL hình ảnh'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  ></Form.Control>
                  <Form.Control
                    label='Chọn File'
                    onChange={uploadFileHandler}
                    type='file'
                  ></Form.Control>
                </Col>
              </Row>

              {loadingUpload && <Loader />}
            </Form.Group>
            <Form.Group>
              <Row className='justify-content-md-center mb-3'>
                <Col xs={12} md={3}>
                  <Form.Label className='item-value text-black fw-bold'>Danh mục</Form.Label>
                </Col>
                <Col xs={12} md={9}>
                  <Form.Control
                    as='select'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value=''>Chọn danh mục</option>
                    {categories &&
                      categories.map(
                        (
                          category // Kiểm tra xem brands đã được tải chưa
                        ) => (
                          <option key={category.id} value={category.title}>
                            {category.title}
                          </option>
                        )
                      )}
                  </Form.Control>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId='description'>
            <Row className='justify-content-md-center mt-3'>
              <Col xs={12} md={3}>
                <Form.Label className='item-value text-black fw-bold'>Nôi dung bài viết</Form.Label>
              </Col>
              <Col xs={12} md={9}>
              <textarea ref={editorRef} id="editor1" name="editor1" value={description}></textarea>

              </Col>
            </Row>
          </Form.Group>
            <div className='d-flex justify-content-center'>
              <Button
                type='submit'
                // variant='primary'
                className='button-link-custom mb-3'
                style={{ marginTop: '1rem' }}
              >
                Cập nhật bài viết
              </Button>
            </div>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default BlogEditScreen;
