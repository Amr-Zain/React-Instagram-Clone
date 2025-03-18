import { Navigate } from "react-router-dom";
import { HOME } from "../constants/Routes";

const AuthRoute = ({ user, children }) => {
    if (user) {
        return <Navigate to={HOME} replace />;
    }
    return children;
};
export default AuthRoute