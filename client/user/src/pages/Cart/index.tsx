import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import config from '../../config';
import ListProductInCart from './ListProductInCart';
import { selectListProductCart } from './cartSlice';
import AnimationTransform from '../../components/AnimationTransform';
import AnimationScale from '../../components/AnimationScale';

const Cart = () => {
    const { t } = useTranslation('cart');
    const list = useSelector(selectListProductCart);

    const [totalProduct, setTotalProduct] = useState<number>(0);

    const totalPrice = useMemo(() => {
        let total = 0;
        list.map((item) => (total += item.totalPrice === undefined ? 0 : item.totalPrice));
        return total;
    }, [list]);

    useEffect(() => {
        if (totalPrice) {
            setTotalProduct(+totalPrice);
        }
    }, [totalPrice]);

    return (
        <div className="w-11/12 sm:w-10/12 m-auto pt-32">
            <div className="grid grid-cols-12 gap-1 relative">
                <div className="col-span-12 lg:col-span-9">
                    <AnimationTransform TransX={{ to: -50, from: 0 }}>
                        <div className="h-min bg-primary-100 px-6 py-3 mb-5 rounded dark:bg-primary-700">
                            <div className="font-semibold text-lg">{t('freeShipping')}</div>
                            <span className="text-sm text-grey-700 dark:text-grey-400">{t('applyVoucher')}</span>
                            <a
                                href="#"
                                className="text-sm ml-1 underline text-grey-700 hover:text-black dark:text-grey-400 hover:dark:text-grey-100"
                            >
                                {t('seeDetails')}
                            </a>
                        </div>
                        <ListProductInCart />
                    </AnimationTransform>
                </div>
                <div className="col-span-12 lg:mt-0 lg:col-span-3 lg:ml-5 transition sticky top-32 h-fit mt-10">
                    <AnimationTransform TransX={{ to: 50, from: 0 }}>
                        <div className="px-5 py-10 rounded shadow-md bg-primary-100 dark:bg-primary-600">
                            <AnimationScale Scale={{ to: 0.6, from: 1 }}>
                                <h1 className="text-2xl font-semibold text-center mb-8">{t('totalCost')}</h1>
                                <div className="grid grid-cols-3">
                                    <span className="text-left col-span-2">{t('totalAmount')}</span>
                                    <span className="text-right text-red-500 flex justify-end">
                                        <span className="text-sm pr-0.5">$</span>
                                        {totalPrice.toLocaleString('vi-VN')}
                                    </span>
                                </div>
                                <div className="grid grid-cols-3">
                                    <span className="text-left col-span-2">{t('totalDelivery')}</span>
                                    <span className="text-right text-red-500 flex justify-end">
                                        <span className="text-sm pr-0.5">$</span>
                                        {0}
                                    </span>
                                </div>
                                <div className="grid grid-cols-3 relative py-10">
                                    <span className="absolute left-0 top-5 h-0.5 bg-grey-500 w-full"></span>

                                    <span className="text-left col-span-2">{t('totalCost')}</span>
                                    <span className="text-right text-red-500 flex justify-end">
                                        <span className="text-sm pr-0.5">$</span>
                                        {totalPrice.toLocaleString('vi-VN')}
                                    </span>

                                    <span className="absolute left-0 bottom-5 h-0.5 bg-grey-500 w-full"></span>
                                </div>
                            </AnimationScale>
                            <AnimationScale Scale={{ to: 0.6, from: 1 }}>
                                {totalProduct === 0 ? (
                                    <Button variant="contained" fullWidth size="large" disabled>
                                        {t('checkOut')}
                                    </Button>
                                ) : (
                                    <Link to={config.Routes.checkOut}>
                                        <Button variant="contained" fullWidth color="primary" size="large">
                                            {t('checkOut')}
                                        </Button>
                                    </Link>
                                )}
                            </AnimationScale>
                        </div>
                    </AnimationTransform>
                </div>
            </div>
        </div>
    );
};

export default Cart;
