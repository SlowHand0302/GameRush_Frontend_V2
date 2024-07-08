import Layout from '../components/Layout';
import HomePage from '../pages/Client/HomePage';
import ProductsPage from '../pages/Client/ProductsPage';
import ProductDetailPage from '../pages/Client/ProductDetailPage';
import CartPage from '../pages/Client/CartPage';
import Payment from '../pages/Client/PaymentPage';
import PaymentResult from '../pages/Client/PaymentPage/PaymentResult';
import Profile from '../pages/Client/Profile';

const clientRoutes = [
    {
        path: '/',
        component: HomePage,
        layout: Layout,
    },
    {
        path: '/search/:feature',
        component: ProductsPage,
        layout: Layout,
    },
    {
        path: 'product/:id',
        component: ProductDetailPage,
        layout: Layout,
    },
    {
        path: '/cart',
        component: CartPage,
        layout: Layout,
    },
    {
        path: '/payment/:id',
        component: Payment,
        layout: Layout,
        // private: true,
    },
    {
        path: '/payment/:id/:state',
        component: PaymentResult,
        // layout: Layout,
        // private: true,
    },
    {
        path: '/me',
        component: Profile,
        layout: Layout,
        private: true,
    },
];

export default clientRoutes;
