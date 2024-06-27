import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return<Navigate to="/login" />;
    }
    return (
        props.child
    );
}
export default ProtectedRoute;