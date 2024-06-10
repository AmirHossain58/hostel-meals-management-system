import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useBadge from "../hooks/useRole";
import PropTypes from "prop-types";
const AdminRoute = ({ children }) => {
  const [role, isLoading] = useBadge();
  console.log(role);

  if (isLoading) return <LoadingSpinner />;
  if (role.role === "admin") return children;
  return <Navigate to="/dashboard" />;
};

export default AdminRoute;

AdminRoute.propTypes = {
  children: PropTypes.element,
};
