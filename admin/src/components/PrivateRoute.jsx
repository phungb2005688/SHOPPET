import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const location = useLocation(); // Hook để lấy vị trí hiện tại
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    // Chuyển hướng người dùng không chỉ với đường dẫn mà còn với trạng thái hiện tại
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;

// import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const PrivateRoute = () => {
//   const { userInfo } = useSelector((state) => state.auth);
//   return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
// };
// export default PrivateRoute;
