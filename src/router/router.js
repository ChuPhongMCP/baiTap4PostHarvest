import Layout2 from 'components/layout';
import ProductsPage from 'pages/products';
import ProductDetailPage from 'pages/products/detail';
import { LOCATIONS } from 'constants/index';
import LoginPage from 'pages/loginPage';
import NoMatch from 'pages/noMatch';
import Profile from 'pages/profile';

export const routers = [ //router khi đã đăng nhập
    {
        path: LOCATIONS.LAYOUT,
        name: "Home",
        element: <Layout2 />,
        children: [
            { isRoot: true, element: <ProductsPage /> },
            { path: LOCATIONS.PRODUCTS, name: "Products", element: <ProductsPage /> },
            { path: LOCATIONS.PRODUCTS_DETAIL, element: <ProductDetailPage /> },
            { path: LOCATIONS.PROFILE, element: <Profile /> },
        ]
    },
    { path: LOCATIONS.LOGIN, element: <LoginPage /> },
    { path: "*", element: <NoMatch /> }, //link sai trả về 404 not found
];

export const unAuthRouter = [ //router khi chưa đăng nhập
    { path: LOCATIONS.LOGIN, name: "Login", element: <LoginPage /> },
];
