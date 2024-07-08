import { Navigate } from 'react-router-dom';

import { useAuth } from '../hooks/authContext';

function PrivateRoute({ children, redirectPath, role }) {
    const { authenticated, user } = useAuth();

    return authenticated && user.role === role ? children : <Navigate to={`${redirectPath}`} />;
}

export default PrivateRoute;
