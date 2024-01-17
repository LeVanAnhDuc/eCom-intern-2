import ContentPasteSearch from '@mui/icons-material/ContentPasteSearch';
import ExitToApp from '@mui/icons-material/ExitToApp';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import TableCell from '@mui/material/TableCell';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import Favorite from '@mui/icons-material/Favorite';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Image from '../../components/Image';
import config from '../../config';
import MouseOverPopover from '../../components/MouseOverPopover';
import { selectListWishList, setDeteleProductInWishList } from './wishListSlice';
import AnimationScale from '../../components/AnimationScale';
import AnimationTransform from '../../components/AnimationTransform';
import { IProduct } from '../../types/IProduct';

const Wishlist = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation('wishList');
    const listWishList: Array<IProduct> = useSelector(selectListWishList);

    const [page, setPage] = useState<number>(1);

    const itemsPerPage = 10;
    const totalPages = listWishList.length / itemsPerPage;

    const handleDeleteFavourite = async (idItem: number) => {
        dispatch(setDeteleProductInWishList(idItem));
    };

    const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };
    return (
        <main>
            <div className="bg-shop-banner bg-no-repeat bg-cover h-72 w-full">
                <div className="flex items-center justify-center h-full text-5xl font-bold font-serif">
                    <div className="flex gap-14">
                        <AnimationTransform TransY={{ to: -100, from: 0 }}>{t('wishList')}</AnimationTransform>
                    </div>
                </div>
            </div>
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
                                <Link className="hover:underline hover:text-primary-400" to={config.Routes.wishList}>
                                    {t('wishList')}
                                </Link>
                            </AnimationTransform>
                        </Breadcrumbs>
                    </AnimationScale>
                </div>
            </div>
            <div className="w-11/12 sm:w-10/12 m-auto mt-5">
                {listWishList.length > 0 ? (
                    <>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className="!bg-primary-100 dark:!bg-primary-600"></TableCell>
                                            <TableCell className="!bg-primary-100 dark:!bg-primary-600" align="left">
                                                {t('product')}
                                            </TableCell>
                                            <TableCell className="!bg-primary-100 dark:!bg-primary-600" align="left">
                                                {t('price')}
                                            </TableCell>
                                            <TableCell className="!bg-primary-100 dark:!bg-primary-600"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {listWishList.map((item, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    <AnimationTransform TransY={{ to: -50, from: 0 }}>
                                                        <Link to={`${config.Routes.detailProduct}/${item.id}`}>
                                                            <Image
                                                                src={item.ProductImage[0]?.url || ''}
                                                                className="sm:h-24 sm:w-24 lg:h-32 lg:w-32 h-16 w-16 p-1 hover:scale-110 transition rounded-2xl"
                                                            />
                                                        </Link>
                                                    </AnimationTransform>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <AnimationTransform TransY={{ to: -50, from: 0 }}>
                                                        {item.name}
                                                    </AnimationTransform>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <AnimationTransform TransY={{ to: -50, from: 0 }}>
                                                        <div className="text-lg not-italic font-medium  text-red-500 flex items-center">
                                                            <span className="text-sm pr-1">$</span>
                                                            <span>{item.price.toLocaleString('vi-VN')}</span>
                                                        </div>
                                                    </AnimationTransform>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <AnimationTransform TransY={{ to: -50, from: 0 }}>
                                                        <Link to={`${config.Routes.detailProduct}/${item.id}`}>
                                                            <IconButton>
                                                                <MouseOverPopover content={t('buyProduct')}>
                                                                    <ShoppingCartOutlined sx={{ fontSize: 26 }} />
                                                                </MouseOverPopover>
                                                            </IconButton>
                                                        </Link>
                                                        <IconButton onClick={() => handleDeleteFavourite(item.id)}>
                                                            <MouseOverPopover content={t('unFavourite')}>
                                                                <Favorite sx={{ color: 'red', fontSize: 26 }} />
                                                            </MouseOverPopover>
                                                        </IconButton>
                                                    </AnimationTransform>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                        <div className="w-full flex justify-center my-5">
                            {totalPages > 10 && (
                                <Pagination
                                    count={totalPages}
                                    page={page}
                                    onChange={handlePageChange}
                                    color="primary"
                                    variant="outlined"
                                    boundaryCount={1}
                                />
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col justify-center items-center py-32 text-xl text-grey-400 gap-5">
                        <AnimationScale Scale={{ to: 0.9, from: 1 }}>
                            <ContentPasteSearch sx={{ fontSize: '100px' }} />
                        </AnimationScale>
                        <AnimationScale Scale={{ to: 0.9, from: 1 }}>{t('noWishList')}</AnimationScale>
                        <AnimationScale Scale={{ to: 0.7, from: 1 }}>
                            <Button
                                variant="contained"
                                size="large"
                                endIcon={<ExitToApp />}
                                onClick={() => {
                                    navigate(config.Routes.shop);
                                }}
                            >
                                {t('listProduct')}
                            </Button>
                        </AnimationScale>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Wishlist;
