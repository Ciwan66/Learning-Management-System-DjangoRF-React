import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ({ childreen }) => {
  let { user } = useContext(AuthContext);

  return <>
  {user? <Outlet/> : <Navigate to="/login" replace />}
  
  
  </>;
};
export default PrivateRoute;
