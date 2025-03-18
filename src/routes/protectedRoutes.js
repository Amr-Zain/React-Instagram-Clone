import { Navigate } from "react-router-dom";
import { LOGIN } from "../constants/Routes";

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to={LOGIN} replace />;
  }
  return children;
};
export default ProtectedRoute;