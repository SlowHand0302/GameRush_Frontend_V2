import adminRoutes from './adminRoutes';
import clientRoutes from './clientRoutes';

const publicRoutes = [...adminRoutes, ...clientRoutes];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
