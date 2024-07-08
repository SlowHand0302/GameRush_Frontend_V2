import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import { clientRoutes, adminRoutes } from './routes';
import { Fragment } from 'react';

import PrivateRoute from './routes/PrivateRoute';
import Page404 from './components/Page404';
import Login from './pages/Login';

const routers = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="*" element={<Page404 />} />
            <Route path="/">
                {clientRoutes.map((route, index) => {
                    let Page = route.component;
                    let Layout = Fragment;
                    if (route.layout) {
                        Layout = route.layout;
                    }
                    if (route?.private) {
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <PrivateRoute redirectPath={'/'} role={'Customer'}>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </PrivateRoute>
                                }
                            />
                        );
                    }
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        ></Route>
                    );
                })}
            </Route>
            <Route path="/admin">
                {adminRoutes.map((route, index) => {
                    let Page = route.component;
                    let Layout = Fragment;
                    if (route.layout) {
                        Layout = route.layout;
                    }
                    if (!route?.private) {
                        return <Route key={index} path={'login'} element={<Login />} />;
                    }

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <PrivateRoute redirectPath={'/admin/login'} role={'Admin'}>
                                    <Layout>
                                        <Page />
                                    </Layout>
                                </PrivateRoute>
                            }
                        />
                    );
                })}
            </Route>
        </>,
    ),
);

function App() {
    return (
        // <Router>
        //     <div className="App">
        //         <Routes>
        //             <Route path="*" element={<Page404 />} />
        //             <Route path="/">
        //                 {clientRoutes.map((route, index) => {
        //                     let Page = route.component;
        //                     let Layout = Fragment;
        //                     if (route.layout) {
        //                         Layout = route.layout;
        //                     }
        //                     if (route?.private) {
        //                         return (
        //                             <Route
        //                                 key={index}
        //                                 path={route.path}
        //                                 element={
        //                                     <PrivateRoute redirectPath={'/'} role={'Customer'}>
        //                                         <Layout>
        //                                             <Page />
        //                                         </Layout>
        //                                     </PrivateRoute>
        //                                 }
        //                             />
        //                         );
        //                     }
        //                     return (
        //                         <Route
        //                             key={index}
        //                             path={route.path}
        //                             element={
        //                                 <Layout>
        //                                     <Page />
        //                                 </Layout>
        //                             }
        //                         ></Route>
        //                     );
        //                 })}
        //             </Route>
        //             <Route path="/admin">
        //                 {adminRoutes.map((route, index) => {
        //                     let Page = route.component;
        //                     let Layout = Fragment;
        //                     if (route.layout) {
        //                         Layout = route.layout;
        //                     }
        //                     if (!route?.private) {
        //                         return <Route key={index} path={'login'} element={<Login />} />;
        //                     }

        //                     return (
        //                         <Route
        //                             key={index}
        //                             path={route.path}
        //                             element={
        //                                 <PrivateRoute redirectPath={'/admin/login'} role={'Admin'}>
        //                                     <Layout>
        //                                         <Page />
        //                                     </Layout>
        //                                 </PrivateRoute>
        //                             }
        //                         />
        //                     );
        //                 })}
        //             </Route>
        //         </Routes>
        //     </div>
        // </Router>
        <RouterProvider router={routers} />
    );
}

export default App;
