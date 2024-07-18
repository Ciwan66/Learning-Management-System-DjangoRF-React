import { useContext } from "react";
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";

const TeacherPrivateRoute = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.is_teacher) {
    return <Navigate to="/student" replace />;
  }

  return <Outlet />;
};

export default TeacherPrivateRoute;
