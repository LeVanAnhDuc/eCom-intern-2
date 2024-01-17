import { FunctionComponent } from 'react';

import config from '../config/index';
import { LayoutNoHeaderFooter } from '../layouts';
import Error404 from '../pages/Error404';
import Home from '../pages/Home';
import LogIn from '../pages/LogIn/LogIn';
import { LayoutNoHeaderFooterProps } from '../layouts/LayoutNoHeaderFooter';
import Register from '../pages/Register';
import Shop from '../pages/Shop';
import DetailProduct from '../pages/DetailProduct';
import Cart from '../pages/Cart';
import DefaultLayoutNoAnimation from '../layouts/DefaultLayoutNoAnimation';
import Checkout from '../pages/Checkout';
import WishList from '../pages/WishList';
import PurchaseHistory from '../pages/PurchaseHistory';
import DetailPurchaseHistory from '../pages/DetailPurchaseHistory';

type TRouters = {
    path: string;
    component: React.ComponentType;
    layout?: React.ComponentType | null | FunctionComponent<LayoutNoHeaderFooterProps>;
};

const publishRoute: Array<TRouters> = [
    { path: config.Routes.home, component: Home },
    { path: config.Routes.shop, component: Shop },
    { path: config.Routes.detailProductID, component: DetailProduct },
    { path: config.Routes.logIn, component: LogIn, layout: LayoutNoHeaderFooter },
    { path: config.Routes.register, component: Register, layout: LayoutNoHeaderFooter },
    { path: config.Routes.error, component: Error404, layout: LayoutNoHeaderFooter },
];

const privateRoute: Array<TRouters> = [
    { path: config.Routes.home, component: Home },
    { path: config.Routes.shop, component: Shop },
    { path: config.Routes.detailProductID, component: DetailProduct },
    { path: config.Routes.checkOut, component: Checkout },
    { path: config.Routes.wishList, component: WishList },
    { path: config.Routes.purchaseHistory, component: PurchaseHistory },
    { path: config.Routes.detailPurchaseHistoryID, component: DetailPurchaseHistory },
    { path: config.Routes.cart, component: Cart, layout: DefaultLayoutNoAnimation },
    { path: config.Routes.logIn, component: LogIn, layout: LayoutNoHeaderFooter },
    { path: config.Routes.register, component: Register, layout: LayoutNoHeaderFooter },
    { path: config.Routes.error, component: Error404, layout: LayoutNoHeaderFooter },
];

export { publishRoute, privateRoute };
