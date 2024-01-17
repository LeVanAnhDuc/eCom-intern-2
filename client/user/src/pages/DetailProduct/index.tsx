import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';

import config from '../../config';
import AnimationTransform from '../../components/AnimationTransform';
import RelatedProduct from './RelatedProduct';
import InformationProduct from './InformationProduct';
import ReviewProduct from './ReviewProduct';
import AnimationScale from '../../components/AnimationScale';

const DetailProduct = () => {
    const { id } = useParams();
    const { t } = useTranslation('detailProduct');

    const [valuePage, setValuePage] = useState<string>('Reviews');
    const [nameProduct, setNameProduct] = useState<string>('');

    const handleChangePage = (_: React.SyntheticEvent, newValue: string) => {
        setValuePage(newValue);
    };

    return (
        <main>
            <div className="bg-primary-100 h-20 w-full dark:bg-primary-600">
                <div className="w-11/12 sm:w-10/12 m-auto flex items-center h-full">
                    <AnimationScale Scale={{ to: 0.6, from: 1 }}>
                        <Breadcrumbs className="!font-semibold ">
                            <AnimationTransform TransY={{ to: -100, from: 0 }}>
                                <Link className="hover:underline hover:text-primary-400" to={config.Routes.home}>
                                    {t('home')}
                                </Link>
                            </AnimationTransform>
                            <AnimationTransform TransY={{ to: 100, from: 0 }}>
                                <Link className="hover:underline hover:text-primary-400" to={config.Routes.shop}>
                                    {t('shop')}
                                </Link>
                            </AnimationTransform>
                            <AnimationTransform TransY={{ to: -100, from: 0 }}>
                                <div>{nameProduct}</div>
                            </AnimationTransform>
                        </Breadcrumbs>
                    </AnimationScale>
                </div>
            </div>

            <div className="w-10/12 m-auto mt-10">
                <InformationProduct id={id} setNameProduct={setNameProduct} />
            </div>
            <div className="border-t-2 mt-20 pt-10 border-grey-400">
                <div className="w-11/12 sm:w-10/12 m-auto">
                    <TabContext value={valuePage}>
                        <Box sx={{ borderBottom: 2, borderColor: '#FFEEE8' }}>
                            <TabList onChange={handleChangePage} centered scrollButtons>
                                <Tab label={t('review') + ' [6]'} value="Reviews" />
                                <Tab label={t('description')} value="Description" />
                            </TabList>
                        </Box>
                        <TabPanel value="Reviews" sx={{ padding: 0 }}>
                            <ReviewProduct rating={3.7} />
                        </TabPanel>
                        <TabPanel value="Description" sx={{ padding: 0 }}>
                            <div className="flex flex-col gap-5 place-content-center mt-10 p-5">LEDUC</div>
                        </TabPanel>
                    </TabContext>
                </div>
            </div>
            <div className="border-t-2 my-10 border-grey-400"></div>

            <div className="w-11/12 sm:w-10/12 m-auto">
                <RelatedProduct />
            </div>
        </main>
    );
};

export default DetailProduct;
