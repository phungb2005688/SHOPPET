import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { TbEdit } from 'react-icons/tb';

import { useNavigate, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
// import Paginate from '../../components/Paginate';
import {
  useGetBrandsQuery,
  useDeleteBrandMutation,
} from '../../slices/brandsApiSlice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const BrandListScreen = () => {
  const { pageNumber } = useParams();

  const { data: brands, isLoading, error, refetch } = useGetBrandsQuery();
  useEffect(() => {
    refetch(); // Gọi refetch khi tham số pageNumber thay đổi
  }, [pageNumber, refetch]);

  const [deleteBrand, { isLoading: loadingDelete }] = useDeleteBrandMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteBrand(id);
        refetch();
      } catch (err) {
        toast.error(err?.message || err.error);
      }
    }
  };

  const navigate = useNavigate();

  const createBrandHandler = () => {
    navigate('/admin/create/brand');
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h2 className='text-black'>Các nhãn hàng</h2>
        </Col>
        <Col className='text-end' style={{marginRight: '20px'}}>
          <Button
            className='my-3 button-link-custom'
            onClick={createBrandHandler}
          >
            <FaPlus /> Thêm nhãn hàng
          </Button>
        </Col>
      </Row>

      {/* {loadingCreate && <Loader />} */}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.message}</Message>
      ) : (
        <>
          <Table hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID nhãn hàng</th>
                <th>Tên nhãn hàng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => (
                <tr key={brand._id}>
                  <td className='text-center'>{brand._id}</td>

                  <td className='text-center'>{brand.title}</td>

                  <td className='text-center'>
                    <LinkContainer to={`/admin/brand/${brand._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-1'>
                        <TbEdit style={{ fontSize: '20px', color: 'green' }} />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm text-white'
                      onClick={() => deleteHandler(brand._id)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <Paginate pages={data.pages} page={data.page} isAdmin={true} /> */}
        </>
      )}
    </>
  );
};

export default BrandListScreen;
