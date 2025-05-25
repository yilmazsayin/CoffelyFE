import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ element, adminRequired = false }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Yükleniyor...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (adminRequired && user.role !== "admin") return <Navigate to="/" replace />;

  return element;
};

export default PrivateRoute;
