import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import logo from '../assets/logo.png';
import { resetCart } from '../slices/cartSlice';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
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
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <header>
        <Navbar
          style={{ background: 'black', height: '70px' }}
          variant='dark'
          expand='lg'
          collapseOnSelect
        >
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand>
                <img src={logo} alt='shoppet' />
                <b>SHOPPET</b>
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ms-auto'>
                <div style={{ marginRight: '180px' }}>
                  <SearchBox />
                </div>

                <div>
                  <LinkContainer to='/cart'>
                    <Nav.Link className='nav-link-custom'>
                      <FaShoppingCart
                        style={{ fontSize: '22px', marginBottom: '2px' }}
                      />
                      {/* <b>Giỏ hàng</b> */}
                      {cartItems.length > 0 && (
                        <Badge
                          pill
                          bg='warning'
                          className='badge'
                          style={{ color: 'black' }}
                        >
                          {cartItems.reduce((a, c) => a + c.qty, 0)}
                        </Badge>
                      )}
                    </Nav.Link>
                  </LinkContainer>
                </div>

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
                      <LinkContainer to='/myorders'>
                        <NavDropdown.Item>Đơn hàng</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        <FaSignOutAlt /> Đăng xuất
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaUser style={{ marginBottom: '5px' }} /> ĐĂNG NHẬP
                    </Nav.Link>
                  </LinkContainer>
                )}

                {/* Admin Links */}
                {userInfo && userInfo.isAdmin && (
                  <>
                    {/* <FaKeybase style={{marginTop: '9px', marginLeft: '10px', fontSize: '25px', color: 'white'}}></FaKeybase> */}
                    <NavDropdown title='Admin' id='adminmenu'>
                      <LinkContainer to='/admin/productlist'>
                        <NavDropdown.Item>Sản phẩm</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/orderlist'>
                        <NavDropdown.Item>Đơn hàng</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/userlist'>
                        <NavDropdown.Item>Khách hàng</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <header>
        <Navbar
          style={{ background: '#ffbf00', height: '44px' }}
          variant='dark'
          expand='lg'
          collapseOnSelect
        >
          <Container>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse
              id='basic-navbar-nav'
              className='justify-content-center'
            >
              <Nav>
                <NavLink
                  to='/'
                  exact
                  className='nav-link'
                  activeClassName='active-link'
                >
                  <b>HOME</b>
                </NavLink>
                <NavLink
                  to='/allproduct'
                  exact
                  className='nav-link'
                  activeClassName='active-link'
                >
                  <b>SẢN PHẨM</b>
                </NavLink>
                <NavLink
                  to='/blog'
                  exact
                  className='nav-link'
                  activeClassName='active-link'
                >
                  <b>BÀI VIẾT</b>
                </NavLink>
                <NavLink
                  to='/introduces'
                  exact
                  className='nav-link'
                  activeClassName='active-link'
                >
                  <b>GIỚI THIỆU</b>
                </NavLink>
                <NavLink
                  to='/contact'
                  exact
                  className='nav-link'
                  activeClassName='active-link'
                >
                  <b>LIÊN HỆ</b>
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
