import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { TbEdit } from "react-icons/tb";

import { useNavigate, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  // useCreateProductMutation,
} from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';

const ProductListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const navigate = useNavigate();  

  const createProductHandler = () => {
    navigate('/admin/create');
  };
  
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h2>Các sản phẩm</h2>
        </Col>
        <Col className='text-end'>
          <Button className='my-3 button-link-custom' onClick={createProductHandler}>
          <FaPlus /> Thêm sản phẩm
          </Button>
        </Col>
      </Row>

      {/* {loadingCreate && <Loader />} */}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.data.message}</Message>
      ) : (
        <>
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID sản phẩm</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Phân loại</th>
                <th>Nhãn hàng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-1'>
                      <TbEdit style={{fontSize: '20px', color: 'green'}} />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm text-white '
                      onClick={() => deleteHandler(product._id)}
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

export default ProductListScreen;
