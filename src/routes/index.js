import Page404 from '../components/Page404';

import adminRoutes from './adminRoutes';
import clientRoutes from './clientRoutes';

import Layout from '../components/Layout';
import HomePage from '../pages/Client/HomePage';
import ProductsPage from '../pages/Client/ProductsPage';
import ProductDetailPage from '../pages/Client/ProductDetailPage';
import CartPage from '../pages/Client/CartPage';
import PaymentResult from '../pages/Client/PaymentPage/PaymentResult';
import { AdminOrdersPage, OrderDetail } from '../pages/Admin/OrdersPage';

import Dashboard from '../pages/Admin/Dashboard';
import { AdminProductsPage, ProductByType } from '../pages/Admin/ProductsPage';
import { ProductTypesPage, AddProductType } from '../pages/Admin/ProductTypesPage';
import Category from '../pages/Admin/CategorysPage';
import Account from '../pages/Admin/AccountPage';
import Login from '../pages/Login';
import Register from '../pages/Client/Register';
import Payment from '../pages/Client/PaymentPage';

const publicRoutes = [...adminRoutes, ...clientRoutes];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
