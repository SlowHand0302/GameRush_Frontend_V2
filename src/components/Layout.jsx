import { useLocation } from 'react-router-dom';

import { ClientHeader } from '../pages/Client/components/Header';
import { ClientFooter } from '../pages/Client/components/Footer';
import { AdminHeader } from '../pages/Admin/components/Header';

function Layout(props) {
    const { children } = props;
    const location = useLocation();

    return location.pathname.includes('admin') ? (
        <AdminHeader>{children}</AdminHeader>
    ) : (
        <>
            <ClientHeader />
            {children}
            <ClientFooter />
        </>
    );
}

export default Layout;
