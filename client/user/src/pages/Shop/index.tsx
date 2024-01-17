import Tune from '@mui/icons-material/Tune';
import Close from '@mui/icons-material/Close';
import North from '@mui/icons-material/North';
import South from '@mui/icons-material/South';
import Fab from '@mui/material/Fab';
import MenuItem from '@mui/material/MenuItem';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Pagination from '@mui/material/Pagination';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';

import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import AnimationTransform from '../../components/AnimationTransform';
import ListProductAPI from './ListProduct';
import config from '../../config';

const Shop = () => {
    const { t } = useTranslation('listProduct');
    const refScroll = useRef<HTMLDivElement | null>(null);

    const [menuResponsive, setMenuResponsive] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalProducts, setTotalProducts] = useState<number>(0);
    const [totalProductsPage, setTotalProductsPage] = useState<number>(0);
    const [filterType, setFilterType] = useState<string>('');
    const [sortType, setSortType] = useState<string>(config.SortBy.ascending);

    const toggleMenuResponsive = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setMenuResponsive(open);
    };

    const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
        if (refScroll.current) {
            refScroll.current.scrollIntoView({
                behavior: 'smooth',
            });
        }
    };

    const handleToggleSortType = () => {
        setSortType(sortType === config.SortBy.descending ? config.SortBy.ascending : config.SortBy.descending);
    };
    const handleChangeFilter = (event: SelectChangeEvent) => {
        setFilterType(event.target.value as string);
    };
    return (
        <main>
            <div className="bg-shop-banner bg-no-repeat bg-cover h-72 w-full">
                <div className="flex items-center justify-center h-full text-5xl font-bold font-serif">
                    <div className="flex gap-14">
                        <AnimationTransform TransY={{ to: -100, from: 0 }}>{t('shop')}</AnimationTransform>
                    </div>
                </div>
            </div>
            <div
                ref={refScroll}
                className="bg-primary-100 dark:bg-primary-600 flex place-content-center place-items-center"
            >
                <div className="w-11/12 px-1.5 py-5  sm:w-10/12 flex flex-wrap justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <AnimationTransform TransX={{ to: -50, from: 0 }}>
                            <div className="font-semibold">
                                {t('showing')} {totalProductsPage} {t('of')} {totalProducts} {t('results')}
                            </div>
                        </AnimationTransform>
                    </div>
                    <AnimationTransform TransX={{ to: 50, from: 0 }}>
                        <div className="hidden lg:flex gap-3">
                            <Button
                                variant="outlined"
                                onClick={handleToggleSortType}
                                disabled={filterType === '' ? true : false}
                            >
                                <span className="pr-2">{t('SortType')}:</span>
                                {sortType === config.SortBy.ascending ? (
                                    <North fontSize="small" />
                                ) : (
                                    <South fontSize="small" />
                                )}
                            </Button>
                            <FormControl size="small" className="!min-w-52">
                                <InputLabel>{t('sortBy')}</InputLabel>
                                <Select label={t('sortBy')} value={filterType} onChange={handleChangeFilter}>
                                    <MenuItem value={''}>{t('notFilter')}</MenuItem>
                                    <MenuItem value={config.SortBy.price}>{t('price')}</MenuItem>
                                    <MenuItem value={config.SortBy.name}>{t('name')}</MenuItem>
                                    <MenuItem value={config.SortBy.createdAt}>{t('createAt')}</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </AnimationTransform>
                    <button className="flex lg:hidden gap-1 " onClick={toggleMenuResponsive(true)}>
                        <Tune sx={{ fontSize: '1.5rem' }} />
                        <span className="font-semibold">{t('filter')}</span>
                    </button>
                    <SwipeableDrawer
                        anchor={'bottom'}
                        open={menuResponsive}
                        onClose={toggleMenuResponsive(false)}
                        onOpen={toggleMenuResponsive(true)}
                    >
                        <div className="h-screen py-5 px-7">
                            <div className="flex justify-between items-center mb-10">
                                <span className="text-2xl font-bold tracking-wide">{t('filter')}</span>
                                <Fab color="error" size="small">
                                    <Close onClick={toggleMenuResponsive(false)} />
                                </Fab>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outlined"
                                    onClick={handleToggleSortType}
                                    disabled={filterType === '' ? true : false}
                                    fullWidth
                                >
                                    <span className="pr-2">{t('SortType')}:</span>
                                    {sortType === config.SortBy.ascending ? (
                                        <North fontSize="small" />
                                    ) : (
                                        <South fontSize="small" />
                                    )}
                                </Button>
                                <FormControl size="small" fullWidth>
                                    <InputLabel>Sort by</InputLabel>
                                    <Select label="Sort by" value={filterType} onChange={handleChangeFilter}>
                                        <MenuItem value={''}>{t('notFilter')}</MenuItem>
                                        <MenuItem value={config.SortBy.price}>{t('price')}</MenuItem>
                                        <MenuItem value={config.SortBy.name}>{t('name')}</MenuItem>
                                        <MenuItem value={config.SortBy.createdAt}>{t('createAt')}</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </SwipeableDrawer>
                </div>
            </div>
            <div className="bg-grey-50 dark:bg-grey-800 flex flex-col place-content-center place-items-center gap-10 py-10 ">
                <ListProductAPI
                    page={page}
                    setTotalPages={setTotalPages}
                    setTotalProducts={setTotalProducts}
                    setTotalProductsPage={setTotalProductsPage}
                    filterType={filterType}
                    sortType={sortType}
                />
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    variant="outlined"
                    boundaryCount={1}
                />
            </div>
        </main>
    );
};

export default Shop;
