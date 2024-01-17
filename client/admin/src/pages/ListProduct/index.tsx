import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { North, South } from '@mui/icons-material';

import config from '../../config';
import Search from '../../components/Search';
import ListProductsAPI from './TableShowListProduct';
import AnimationTransform from '../../components/AnimationTransform';
import AnimationScale from '../../components/AnimationScale';
import ModalAddProduct from './ModalAddProduct';

const ListProduct = () => {
    const { t } = useTranslation('listProduct');
    const refScroll = useRef<HTMLDivElement | null>(null);
    const [search, setSearch] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [filterType, setFilterType] = useState<string>('');
    const [sortType, setSortType] = useState<string>(config.SortBy.ascending);
    const [checkActive, setCheckActive] = useState<string>('true');
    const [openDrawerAddProduct, setOpenDrawerAddProduct] = useState<boolean>(false);

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
    const handleChangeCheckActive = (event: SelectChangeEvent) => {
        setCheckActive(event.target.value as string);
    };

    const toggleDrawerAddProduct = () => {
        setOpenDrawerAddProduct((prev) => !prev);
    };

    return (
        <>
            <div ref={refScroll} className="flex justify-between">
                <AnimationScale Scale={{ to: 0.7, from: 1 }}>
                    <div className="text-lg font-semibold flex items-center">{t('listProduct')}</div>
                </AnimationScale>
                <AnimationScale Scale={{ to: 0.7, from: 1 }}>
                    <Button variant="contained" onClick={toggleDrawerAddProduct}>
                        {t('addNew')}
                    </Button>
                    <ModalAddProduct
                        openDrawerAddProduct={openDrawerAddProduct}
                        toggleDrawerAddProduct={toggleDrawerAddProduct}
                    />
                </AnimationScale>
            </div>
            <div className="grid lg:grid-cols-3 my-4 gap-5">
                <AnimationTransform TransX={{ to: -50, from: 0 }}>
                    <Search setSearch={setSearch} placeholder={t('placeholder')} />
                </AnimationTransform>

                <AnimationTransform TransX={{ to: 50, from: 0 }} className="lg:col-span-2">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
                        <Button
                            variant="outlined"
                            onClick={handleToggleSortType}
                            disabled={filterType === '' ? true : false}
                            className="!rounded-3xl"
                            size="large"
                            fullWidth
                        >
                            <span className="min-w-32">{t('SortType')}:</span>
                            {sortType === config.SortBy.ascending ? (
                                <North fontSize="small" />
                            ) : (
                                <South fontSize="small" />
                            )}
                        </Button>
                        <FormControl fullWidth size="medium">
                            <InputLabel>{t('sortBy')}</InputLabel>
                            <Select
                                className="!rounded-3xl"
                                label={t('sortBy')}
                                value={filterType}
                                onChange={handleChangeFilter}
                            >
                                <MenuItem value={''}>{t('notFilter')}</MenuItem>
                                <MenuItem value={config.SortBy.price}>{t('price')}</MenuItem>
                                <MenuItem value={config.SortBy.name}>{t('name')}</MenuItem>
                                <MenuItem value={config.SortBy.createdAt}>{t('createAt')}</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth size="medium">
                            <InputLabel>{t('active')}</InputLabel>
                            <Select
                                className="!rounded-3xl"
                                label={t('active')}
                                value={checkActive}
                                onChange={handleChangeCheckActive}
                            >
                                <MenuItem value={'true'}>{t('active')}</MenuItem>
                                <MenuItem value={'false'}>{t('unActive')}</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </AnimationTransform>
            </div>

            <ListProductsAPI
                checkActive={checkActive}
                search={search}
                page={page}
                setTotalPages={setTotalPages}
                filterType={filterType}
                sortType={sortType}
            />

            <div className="w-full flex justify-center mt-5">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    variant="outlined"
                    boundaryCount={1}
                />
            </div>
        </>
    );
};

export default ListProduct;
