import Dashboard from '../pages/Admin/Dashboard';
import { AdminProductsPage, ProductByType } from '../pages/Admin/ProductsPage';
import { ProductTypesPage, AddProductType } from '../pages/Admin/ProductTypesPage';
import Category from '../pages/Admin/CategorysPage';
import Account from '../pages/Admin/AccountPage';
import Login from '../pages/Login';
import Layout from '../components/Layout';
import { AdminOrdersPage, OrderDetail } from '../pages/Admin/OrdersPage';

const adminRoutes = [
    {
        path: '/admin',
        component: Dashboard,
        layout: Layout,
        private: true,
    },
    {
        path: '/admin/products',
        component: AdminProductsPage,
        layout: Layout,
        private: true,
    },
    {
        path: '/admin/products/:productTypeId',
        component: ProductByType,
        layout: Layout,
        private: true,
    },
    {
        path: '/admin/productType',
        component: ProductTypesPage,
        layout: Layout,
        private: true,
    },
    {
        path: '/admin/productType/create',
        component: AddProductType,
        layout: Layout,
        private: true,
    },
    {
        path: '/admin/productType/:id',
        component: AddProductType,
        layout: Layout,
        private: true,
    },
    {
        path: '/admin/productType/:productTypeId',
        component: ProductTypesPage,
        layout: Layout,
        private: true,
    },
    {
        path: '/admin/category',
        component: Category,
        layout: Layout,
        private: true,
    },
    {
        path: '/admin/order',
        component: AdminOrdersPage,
        layout: Layout,
        private: true,
    },
    {
        path: '/admin/order/:id',
        component: OrderDetail,
        layout: Layout,
        private: true,
    },
    {
        path: '/admin/order/statistic',
        component: AdminProductsPage,
        layout: Layout,
        private: true,
    },
    {
        path: '/admin/account',
        component: Account,
        layout: Layout,
        private: true,
    },
    {
        path: '/admin/discount',
        component: AdminProductsPage,
        layout: Layout,
        private: true,
    },
    {
        path: '/admin/setting/website',
        component: AdminProductsPage,
        layout: Layout,
        private: true,
    },
    {
        path: '/admin/setting/payment',
        component: AdminProductsPage,
        layout: Layout,
        private: true,
    },
    {
        path: '/admin/setting/employee',
        component: AdminProductsPage,
        layout: Layout,
        private: true,
    },
    {
        path: '/admin/userSupport',
        component: AdminProductsPage,
        layout: Layout,
        private: true,
    },
    {
        path: '/admin/login',
        component: Login,
    },
];

export default adminRoutes;
