import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';

import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      // NOTE: here we need to reset cart state for when a user logs out so the next
      // user doesn't inherit the previous users cart and shipping
      // dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className='header'>
      <Navbar
        style={{ background: '#562B00', height: '50px' }}
        variant='dark'
        expand='lg'
        collapseOnSelect
      >
        <Container>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse
            id='basic-navbar-nav'
            style={{ paddingRight: '80px' }}
          >
            <Nav className='ms-auto'>
              {userInfo ? (
                <>
                  <NavDropdown
                    title={
                      <>
                        <MdAccountCircle
                          style={{
                            fontSize: '25px',
                            color: 'white',
                          }}
                        />
                        <b>{userInfo.name}</b>
                      </>
                    }
                    id='username'
                    className='nav-link-custom'
                  >
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Trang cá nhân</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      <FaSignOutAlt /> Đăng xuất
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <FaUser /> Đăng nhập
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin &&
              <NavDropdown title='Admin' id='adminmenu' className='text-black'>
                <LinkContainer to='/admin/productlist'>
                  <NavDropdown.Item>Sản phẩm</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/categorylist'>
                  <NavDropdown.Item>Danh mục</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/brandlist'>
                  <NavDropdown.Item>Nhãn hàng</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/orderlist'>
                  <NavDropdown.Item>Đơn hàng</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/bloglist'>
                  <NavDropdown.Item>Bài viết</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/userlist'>
                  <NavDropdown.Item>Khách hàng</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
