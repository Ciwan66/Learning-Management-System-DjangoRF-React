import { useContext } from "react";
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";

const StudentPrivateRoute = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.is_student) {
    return <Navigate to="/teacher" replace />;
  }

  return <Outlet />;
};

export default StudentPrivateRoute;
