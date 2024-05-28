import Dashboard from '../pages/Admin/Dashboard';
import { AdminProductsPage, ProductByType } from '../pages/Admin/ProductsPage';
import { ProductTypesPage, AddProductType } from '../pages/Admin/ProductTypesPage';
import Category from '../pages/Admin/CategorysPage';
import Account from '../pages/Admin/AccountPage';
import Login from '../pages/Login';
import Layout from '../components/Layout';
import { AdminOrdersPage, OrderDetail } from '../pages/Admin/OrdersPage';
import Page404 from '../components/Page404';

const adminRoutes = [
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
        component: AdminOrdersPage,
        layout: Layout,
    },
    {
        path: '/admin/order/:id',
        component: OrderDetail,
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

export default adminRoutes;
