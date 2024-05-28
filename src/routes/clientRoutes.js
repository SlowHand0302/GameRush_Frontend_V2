import Page404 from '../components/Page404';

import Layout from '../components/Layout';
import HomePage from '../pages/Client/HomePage';
import ProductsPage from '../pages/Client/ProductsPage';
import ProductDetailPage from '../pages/Client/ProductDetailPage';
import CartPage from '../pages/Client/CartPage';
import Payment from '../pages/Client/PaymentPage';
import PaymentResult from '../pages/Client/PaymentPage/PaymentResult';
import Register from '../pages/Client/Register';
import Login from '../pages/Login';

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
        path: '/:product',
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
    },
    {
        path: '/payment/:id/:state',
        component: PaymentResult,
        // layout: Layout,
    },
    {
        path: '/404',
        component: Page404,
        layout: Layout,
    },
    {
        path: '/login',
        component: Login,
        // layout: Layout,
    },
    {
        path: '/register',
        component: Register,
        // layout: Layout,
    },
];

export default clientRoutes;
