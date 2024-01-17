import AddBusiness from '@mui/icons-material/AddBusiness';
import AirlineStops from '@mui/icons-material/AirlineStops';
import AttachMoney from '@mui/icons-material/AttachMoney';
import Business from '@mui/icons-material/Business';
import LocationCity from '@mui/icons-material/LocationCity';
import Paid from '@mui/icons-material/Paid';
import PriceCheck from '@mui/icons-material/PriceCheck';

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import CardStatictis from '../../components/Card';
import PieArcLabel from '../../components/PieArcLabel';
import LineArcLabel from '../../components/LineArcLabel';
import BarArcLabel from '../../components/BarArcLabel';
import AnimationTransform from '../../components/AnimationTransform';
import AnimationScale from '../../components/AnimationScale';

const Home = () => {
    const { t } = useTranslation('home');
    return (
        <main className="flex flex-col gap-5">
            <div className="text-lg font-semibold flex items-center">{t('home')}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                <AnimationTransform TransY={{ to: -100, from: 0 }}>
                    <CardStatictis
                        icon={<Paid fontSize="large" />}
                        classIcon="bg-[#FFF5D9] text-[#FFBB38]"
                        title={t('totalRevenue')}
                        statictis={'$17,000'}
                    />
                </AnimationTransform>
                <AnimationTransform TransY={{ to: -200, from: 0 }}>
                    <CardStatictis
                        icon={<PriceCheck fontSize="large" />}
                        classIcon="bg-[#E7EDFF] text-[#396AFF]"
                        title={t('profit')}
                        statictis={'$5,600'}
                    />
                </AnimationTransform>
                <AnimationTransform TransY={{ to: -300, from: 0 }}>
                    <CardStatictis
                        icon={<AttachMoney fontSize="large" />}
                        classIcon="bg-[#FFE0EB] text-[#FF82AC]"
                        title={t('importCosts')}
                        statictis={'$3,460'}
                    />
                </AnimationTransform>
                <AnimationTransform TransY={{ to: -400, from: 0 }}>
                    <CardStatictis
                        icon={<AddBusiness fontSize="large" />}
                        classIcon="bg-[#DCFAF8] text-[#16DBCC]"
                        title={t('additionalExpenses')}
                        statictis={'$7,920'}
                    />
                </AnimationTransform>
            </div>
            <div className="grid xl:grid-cols-3 gap-5">
                <AnimationTransform TransX={{ to: -100, from: 0 }} className="xl:col-span-2">
                    <div className="px-6 py-7 shadow-lg p-2 rounded-2xl bg-white dark:bg-primary-600">
                        <PieArcLabel />
                    </div>
                </AnimationTransform>
                <AnimationTransform TransX={{ to: 100, from: 0 }}>
                    <div className="px-6 py-7 shadow-lg p-2 rounded-2xl bg-white dark:bg-primary-600">
                        <div className="w-full ">
                            <div className="flex items-center justify-between mb-4">
                                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                                    {t('latestCustomers')}
                                </h5>
                                <Link
                                    to=""
                                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                                >
                                    {t('viewAll')}
                                </Link>
                            </div>
                            <div className="flow-root">
                                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {[
                                        {
                                            image: 'https://cdn.pixabay.com/photo/2023/03/29/19/32/man-7886201_1280.jpg',
                                            name: 'Neil Sims',
                                            email: 'email@windster.com',
                                            money: '$320',
                                        },
                                        {
                                            image: 'https://cdn.pixabay.com/photo/2023/11/02/16/49/cat-8361048_1280.jpg',
                                            name: 'Bonnie Green',
                                            email: 'email@windster.com',
                                            money: '$3467',
                                        },
                                        {
                                            image: 'https://cdn.pixabay.com/photo/2023/12/20/16/21/baking-8460297_1280.png',
                                            name: 'Michael Gough',
                                            email: 'email@windster.com',
                                            money: '$67',
                                        },
                                    ].map((item, index) => (
                                        <li className="py-3 sm:py-4" key={index}>
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        className="w-8 h-8 rounded-full"
                                                        src={item.image}
                                                        alt={item.name}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0 ms-4">
                                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                        {item.email}
                                                    </p>
                                                </div>
                                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                    {item.money}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </AnimationTransform>
            </div>
            <div className="grid lg:grid-cols-11 gap-5">
                <div className="lg:col-span-4 flex flex-col justify-between gap-5">
                    <AnimationTransform TransX={{ to: -100, from: 0 }}>
                        <CardStatictis
                            icon={<LocationCity fontSize="large" />}
                            classIcon="bg-[#FFE0EB] text-[#FF82AC]"
                            title={t('numberOfUsers')}
                            statictis={'1,250'}
                        />
                    </AnimationTransform>
                    <AnimationTransform TransX={{ to: -150, from: 0 }}>
                        <CardStatictis
                            icon={<AirlineStops fontSize="large" />}
                            classIcon="bg-[#E7EDFF] text-[#396AFF]"
                            title={t('rateOfReturn')}
                            statictis={'+5.80%'}
                        />
                    </AnimationTransform>
                    <AnimationTransform TransX={{ to: -200, from: 0 }}>
                        <CardStatictis
                            icon={<Business fontSize="large" />}
                            classIcon="bg-[#DCFAF8] text-[#16DBCC]"
                            title={t('numberOfProductsSold')}
                            statictis={'50,000'}
                        />
                    </AnimationTransform>
                </div>
                <AnimationTransform TransX={{ to: 100, from: 0 }} className="lg:col-span-7">
                    <div className="h-full flex place-content-center place-items-center px-6 py-7 shadow-lg p-2 rounded-2xl bg-white dark:bg-primary-600 ">
                        <LineArcLabel />
                    </div>
                </AnimationTransform>
            </div>
            <div className="grid xl:grid-cols-2 gap-5">
                <AnimationScale Scale={{ to: 0.7, from: 1 }}>
                    <div className="flex place-content-center place-items-center px-6 py-7 shadow-lg p-2 rounded-2xl bg-white dark:bg-primary-600 ">
                        <BarArcLabel />
                    </div>
                </AnimationScale>

                <AnimationScale Scale={{ to: 0.7, from: 1 }}>
                    <div className="flex place-content-center place-items-center px-6 py-7 shadow-lg p-2 rounded-2xl bg-white dark:bg-primary-600 ">
                        <BarArcLabel />
                    </div>
                </AnimationScale>
            </div>
        </main>
    );
};

export default Home;
