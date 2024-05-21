import Page404 from '../components/Page404';

import Layout from '../components/Layout';
import HomePage from '../pages/Client/HomePage';
import ProductsPage from '../pages/Client/ProductsPage';
import ProductDetailPage from '../pages/Client/ProductDetailPage';
import CartPage from '../pages/Client/CartPage';

import Dashboard from '../pages/Admin/Dashboard';
import { AdminProductsPage, ProductByType } from '../pages/Admin/ProductsPage';
import { ProductTypesPage, AddProductType } from '../pages/Admin/ProductTypesPage';
import Category from '../pages/Admin/CategorysPage';
import Account from '../pages/Admin/AccountPage';
import Login from '../pages/Login';
import Register from '../pages/Client/Register';

const publicRoutes = [
    {
        path: '/',
        component: HomePage,
        layout: Layout,
    },
    {
        path: '/search/:featured',
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
    {
        path: '/admin',
        component: Dashboard,
        layout: Layout,
    },
    {
        path: '/admin/products',
        component: AdminProductsPage,
        layout: Layout,
    },
    {
        path: '/admin/products/:productTypeId',
        component: ProductByType,
        layout: Layout,
    },
    {
        path: '/admin/productType',
        component: ProductTypesPage,
        layout: Layout,
    },
    {
        path: '/admin/productType/create',
        component: AddProductType,
        layout: Layout,
    },
    {
        path: '/admin/productType/:id',
        component: AddProductType,
        layout: Layout,
    },
    {
        path: '/admin/productType/:productTypeId',
        component: ProductTypesPage,
        layout: Layout,
    },
    {
        path: '/admin/category',
        component: Category,
        layout: Layout,
    },
    {
        path: '/admin/order',
        component: AdminProductsPage,
        layout: Layout,
    },
    {
        path: '/admin/order/statistic',
        component: AdminProductsPage,
        layout: Layout,
    },
    {
        path: '/admin/account',
        component: Account,
        layout: Layout,
    },
    {
        path: '/admin/discount',
        component: AdminProductsPage,
        layout: Layout,
    },
    {
        path: '/admin/setting/website',
        component: AdminProductsPage,
        layout: Layout,
    },
    {
        path: '/admin/setting/payment',
        component: AdminProductsPage,
        layout: Layout,
    },
    {
        path: '/admin/setting/employee',
        component: AdminProductsPage,
        layout: Layout,
    },
    {
        path: '/admin/userSupport',
        component: AdminProductsPage,
        layout: Layout,
    },
    {
        path: '/admin/404',
        component: Page404,
        layout: Layout,
    },
    {
        path: '/admin/login',
        component: Login,
        // layout: Layout,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
