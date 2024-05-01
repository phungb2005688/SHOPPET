import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';
import store from './store';
import { Provider } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import AddProduct from './screens/admin/AddProduct';
import AddBrand from './screens/admin/AddBrand';
import BrandEditScreen from './screens/admin/BrandEditScreen';
import BrandListScreen from './screens/admin/BrandListScreen';
import CategoryListScreen from './screens/admin/CategoryListScreen';
import CategoryEditScreen from './screens/admin/CategoryEditScreen';
import AddCategory from './screens/admin/AddCategory';
import BlogListScreen from './screens/admin/BlogListScreen';
import BlogEditScreen from './screens/admin/BlogEditScreen';
import AddBlog from './screens/admin/AddBlog';
import CategoryBlogListScreen from './screens/admin/CategoryBlogListScreen';
import CategoryBlogEditScreen from './screens/admin/CategoryBlogEditScreen';
import AddCategoryBlog from './screens/admin/AddCategoryBlog';
import ContactListScreen from './screens/admin/ContactListScreen';
import ContactEditScreen from './screens/admin/ContactEditScreen ';
import LoginLayout from './LoginLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />}>
        {/* Bọc tất cả các Route bên trong PrivateRoute để yêu cầu đăng nhập */}
        <Route element={<PrivateRoute />}>
          <Route index={true} path='/' element={<HomeScreen />} />
          <Route path='/search/:keyword' element={<HomeScreen />} />
          <Route path='/page/:pageNumber' element={<HomeScreen />} />
          <Route
            path='/search/:keyword/page/:pageNumber'
            element={<HomeScreen />}
          />

          {/* Registered users */}
          <Route path='/order/:id' element={<OrderScreen />} />
          <Route path='/profile' element={<ProfileScreen />} />

          {/* Admin users */}
          <Route element={<AdminRoute />}>
            <Route path='/admin/orderlist' element={<OrderListScreen />} />
            <Route path='/admin/productlist' element={<ProductListScreen />} />
            <Route path='/admin/brandlist' element={<BrandListScreen />} />
            <Route
              path='/admin/categorylist'
              element={<CategoryListScreen />}
            />
            <Route path='/admin/bloglist' element={<BlogListScreen />} />
            <Route
              path='/admin/categorybloglist'
              element={<CategoryBlogListScreen />}
            />
            <Route path='/admin/contactlist' element={<ContactListScreen />} />

            <Route
              path='/admin/productlist/:pageNumber'
              element={<ProductListScreen />}
            />
            <Route path='/admin/userlist' element={<UserListScreen />} />
            <Route
              path='/admin/product/:id/edit'
              element={<ProductEditScreen />}
            />
            <Route path='/admin/brand/:id/edit' element={<BrandEditScreen />} />
            <Route
              path='/admin/category/:id/edit'
              element={<CategoryEditScreen />}
            />
            <Route path='/admin/blog/:id/edit' element={<BlogEditScreen />} />
            <Route
              path='/admin/categoryblog/:id/edit'
              element={<CategoryBlogEditScreen />}
            />
            <Route
              path='/admin/contact/:id/edit'
              element={<ContactEditScreen />}
            />

            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
            <Route path='/admin/create' element={<AddProduct />} />
            <Route path='/admin/create/brand' element={<AddBrand />} />
            <Route path='/admin/create/category' element={<AddCategory />} />
            <Route path='/admin/create/blog' element={<AddBlog />} />
            <Route
              path='/admin/create/categoryblog'
              element={<AddCategoryBlog />}
            />
          </Route>
        </Route>
      </Route>

      <Route path='/login' element={<LoginLayout />}>
        <Route index element={<LoginScreen />} />
      </Route>
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
