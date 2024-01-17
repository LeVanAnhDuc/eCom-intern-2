import { FunctionComponent } from 'react';

import config from '../config/index';
import Error404 from '../pages/Error404';
import Home from '../pages/Home';
import ListProduct from '../pages/ListProduct';
import LogIn from '../pages/LogIn';
import DetailProduct from '../pages/DetailProduct';
import LayoutNoHeaderFooter, { LayoutNoHeaderFooterProps } from '../layouts/LayoutNoHeaderFooter';

type TRouters = {
    path: string;
    component: React.ComponentType;
    layout?: React.ComponentType | null | FunctionComponent<LayoutNoHeaderFooterProps>;
};

const publishRoute: Array<TRouters> = [
    { path: config.Routes.logIn, component: LogIn, layout: LayoutNoHeaderFooter },
    { path: config.Routes.error, component: Error404, layout: LayoutNoHeaderFooter },
];

const privateRoute: Array<TRouters> = [
    { path: config.Routes.home, component: Home },
    { path: config.Routes.listProducts, component: ListProduct },
    { path: config.Routes.detailProductID, component: DetailProduct },
    { path: config.Routes.logIn, component: LogIn, layout: LayoutNoHeaderFooter },
    { path: config.Routes.error, component: Error404, layout: LayoutNoHeaderFooter },
];

export { publishRoute, privateRoute };
