import { Navigate } from 'react-router-dom';
//import { useAuth } from './auth'; // Assume this is a custom hook to check user auth state

const PrivateRoute = ({ children }) => {
  //const auth = useAuth(); // Gets whether the user is authenticated
  const isAuthenticated = true;

  //return auth.isAuthenticated ? children : <Navigate to="/Login" />;
  return isAuthenticated ? children : <Navigate to="/Login" />;
};

export default PrivateRoute;