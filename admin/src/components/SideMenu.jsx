import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/22.png';
import { IoNewspaperOutline } from 'react-icons/io5';
import { TbBrandBaidu } from "react-icons/tb";
import { BsHddRack } from "react-icons/bs";
import { MdConnectWithoutContact } from "react-icons/md";

import SubMenu from 'antd/es/menu/SubMenu';

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState('/');

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <>
      <div className='SideMenu'>
        <Menu
          className='SideMenuVertical'
          mode='vertical'
          onClick={(item) => {
            navigate(item.key);
          }}
          selectedKeys={[selectedKeys]}
        >
          <Link to='/' className='text-decoration-none'>
          <div style={{ backgroundColor: '#562B00', height: '50px' }}>
            <img
              src={logo}
              alt='logo'
              className='menu-logo'
              style={{ width: '45px', height: '45px', alignContent: 'center' }}
            />
            <span className='text-white py-2'>
              <b>SHOPPET</b>
            </span>
          </div>
          </Link>
          

          <Menu.Item key='/' icon={<AppstoreOutlined />} className='my-3'>
            Tổng quan
          </Menu.Item>
          {/* <SubMenu
            key='sub1'
            icon={<ShopOutlined />}
            title='Sản phẩm'
            className='my-3'
          >
            <Menu.Item key='/admin/productlist'>Danh sách sản phẩm</Menu.Item>
            <Menu.Item key='/admin/create'>Thêm sản phẩm</Menu.Item>
          </SubMenu> */}
          <Menu.Item
            key='/admin/productlist'
            icon={<ShopOutlined />}
            className='my-3'
          >
            Sản phẩm
          </Menu.Item>
          <Menu.Item
            key='/admin/categorylist'
            icon={<BsHddRack />}
            className='my-3'
          >
            Danh mục
          </Menu.Item>

          <Menu.Item
            key='/admin/brandlist'
            icon={<TbBrandBaidu />}
            className='my-3'
          >
            Nhãn hàng
          </Menu.Item>
          <Menu.Item
            key='/admin/orderlist'
            icon={<ShoppingCartOutlined />}
            className='my-3'
          >
            Đơn hàng
          </Menu.Item>
          {/* <Menu.Item
            key='/admin/bloglist'
            icon={<IoNewspaperOutline />}
            className='my-3'
          >
            Bài viết
          </Menu.Item> */}

          <SubMenu
            key='sub1'
            icon={<IoNewspaperOutline />}
            title='Bài viết'
            className='my-3'
          >
            <Menu.Item key='/admin/categorybloglist'>
              Danh mục bài viết
            </Menu.Item>
            <Menu.Item key='/admin/bloglist'>
              Các bài viết
            </Menu.Item>
          </SubMenu>

          <Menu.Item
            key='/admin/userlist'
            icon={<UserOutlined />}
            className='my-3'
          >
            Người dùng
          </Menu.Item>
          <Menu.Item
            key='/admin/contactlist'
            icon={<MdConnectWithoutContact />}
            className='my-3'
          >
            Lời nhắn
          </Menu.Item>
          {/* <Menu.Item
            key='/admin/bloglist'
            icon={<LogoutOutlined />}
            className='my-3'
            onClick={logoutHandler}
          >
            Đăng xuất
          </Menu.Item> */}
        </Menu>
      </div>
    </>
  );
}
export default SideMenu;
