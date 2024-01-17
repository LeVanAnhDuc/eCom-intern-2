import Checkbox from '@mui/material/Checkbox';
import { useMemo, useState } from 'react';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { selectListProductCart } from '../Cart/cartSlice';
import Form from './Form';
import AnimationScale from '../../components/AnimationScale';
import AnimationTransform from '../../components/AnimationTransform';

const Checkout = () => {
    const { t } = useTranslation('checkOut');
    const list = useSelector(selectListProductCart);

    const totalPrice: number = useMemo(() => {
        let total: number = 0;
        list.map((item) => (total += item.totalPrice === undefined ? 0 : item.totalPrice));
        return total;
    }, [list]);

    const [isChecked, setIsChecked] = useState<boolean>(false);

    const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean) } }) => {
        setIsChecked(event.target.checked);
    };

    return (
        <div className="w-10/12 m-auto pt-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:grid-row-2 lg:gap-20">
                <div className="col-span-2">
                    <AnimationTransform TransX={{ to: -50, from: 0 }}>
                        <div className=" mb-5 font-semibold text-xl">{t('yourContact')} ?</div>
                    </AnimationTransform>
                    <Form isChecked={isChecked} totalPrice={totalPrice} />
                    <AnimationTransform TransY={{ to: -100, from: 0 }}>
                        <div className="flex gap-3 mt-10">
                            <span>
                                <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
                            </span>
                            <span className="col-span-9 text-gray-400">
                                {t('iHaveRead')}{' '}
                                <span className="underline hover:text-black dark:hover:text-white ml-0.5">
                                    {t('privacyPolicy')}
                                </span>{' '}
                                {t('and')}
                                <span className="underline hover:text-black dark:hover:text-white ml-0.5">
                                    {' '}
                                    {t('cookiePolicy')}{' '}
                                </span>
                                . {t('LEDUCIsATrusted')}.
                            </span>
                        </div>
                    </AnimationTransform>
                </div>
                <div className="space-y-5">
                    <AnimationScale Scale={{ to: 0.8, from: 1 }}>
                        <h1 className="text-2xl font-semibold text-center"> {t('totalCost')}</h1>
                    </AnimationScale>
                    <AnimationTransform TransX={{ to: 200, from: 0 }}>
                        <div className="grid grid-cols-3">
                            <span className="text-left col-span-2">{t('totalCost')}</span>
                            <span className="text-right">{totalPrice.toLocaleString('vi-VN')} $</span>
                        </div>
                    </AnimationTransform>
                    <AnimationTransform TransX={{ to: 300, from: 0 }}>
                        <div className="grid grid-cols-3">
                            <span className="text-left col-span-2">{t('totalAmount')}</span>
                            <span className="text-right">0 $</span>
                        </div>
                    </AnimationTransform>
                    <AnimationTransform TransX={{ to: 400, from: 0 }}>
                        <div className="grid grid-cols-3 relative py-10">
                            <span className="absolute left-0 top-5 h-0.5 bg-gray-200 w-full"></span>
                            <span className="text-left col-span-2">{t('totalDelivery')}</span>
                            <span className="text-right">{totalPrice.toLocaleString('vi-VN')} $</span>
                            <span className="absolute left-0 bottom-5 h-0.5 bg-gray-200 w-full"></span>
                        </div>
                    </AnimationTransform>

                    <AnimationTransform TransY={{ to: -100, from: 0 }}>
                        <div className="text-center text-gray-400">({t('TotalPriceOfYourOrder')})</div>
                    </AnimationTransform>
                    <AnimationTransform TransY={{ to: -200, from: 0 }}>
                        <div className="font-semibold text-xl text-center pt-10">
                            {t('howWouldYouLikeToReceiveYourOrder')}?
                        </div>
                    </AnimationTransform>
                    <AnimationTransform TransY={{ to: -300, from: 0 }}>
                        <div className="text-gray-400">
                            {t('titleUnder')}
                            <span className="underline hover:text-black dark:hover:text-white ml-0.5">
                                {t('readMore')}
                            </span>
                        </div>
                    </AnimationTransform>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
