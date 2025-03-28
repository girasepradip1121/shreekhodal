import { Navigate } from "react-router-dom";
import { userToken } from "../Component/Variable";

const AdminRoute = ({ children }) => {
    const userData=userToken()
  const token = userData?.token
  const role = userData?.role

  if (!token || role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
