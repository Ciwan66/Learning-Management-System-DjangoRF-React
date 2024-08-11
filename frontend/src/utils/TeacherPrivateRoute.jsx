import { useContext } from "react";
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";

const StudentPrivateRoute = ({ Component }) => {
  const { user } = useContext(AuthContext);
  if (!user) {

    return <Navigate to="/login" replace />;

  }

  if (!user.is_teacher) {

    return <Navigate to="/student" replace />;
  }

  return<Component />;
};

export default StudentPrivateRoute;
