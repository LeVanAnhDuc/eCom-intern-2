import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentPasteSearch from '@mui/icons-material/ContentPasteSearch';
import ExitToApp from '@mui/icons-material/ExitToApp';
import Button from '@mui/material/Button';

import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Image from '../../components/Image';
import MouseOverPopover from '../../components/MouseOverPopover';
import { IProduct } from '../../types/IProduct';
import config from '../../config';
import { selectListProductCart, setDeteleToCart, setQuantityProductInCart } from './cartSlice';
import InputQuantity from '../../components/InputQuantity';
import AnimationTransform from '../../components/AnimationTransform';
import AnimationScale from '../../components/AnimationScale';

const ListProductInCart = () => {
    const navigate = useNavigate();
    const list = useSelector(selectListProductCart);
    const dispatch = useDispatch();
    const { t } = useTranslation('cart');

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [listProduct, setListProduct] = useState<Array<IProduct>>(list);

    useEffect(() => {
        setListProduct(list);
    }, [isLoading]);

    const handleChangeItemQuantity = async (idItemInCart: number, quantity: number) => {
        dispatch(setQuantityProductInCart({ id: idItemInCart, quantity: quantity }));
        setIsLoading((prev) => !prev);
    };
    const handleDeleteProduct = async (idItemInCart: number) => {
        dispatch(setDeteleToCart(idItemInCart));

        setIsLoading((prev) => !prev);
    };

    const handleNextDetailPage = (idProduct: number) => {
        if (idProduct) {
            navigate(`${config.Routes.detailProduct}/${idProduct}`);
        } else {
            toast.error('Đang bảo trì');
        }
    };
    return (
        <>
            {listProduct.length > 0 ? (
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell className="!bg-primary-100 dark:!bg-primary-600"></TableCell>
                                    <TableCell className="!bg-primary-100 dark:!bg-primary-600">
                                        {t('product')}
                                    </TableCell>
                                    <TableCell className="!bg-primary-100 dark:!bg-primary-600">
                                        {t('quantity')}
                                    </TableCell>
                                    <TableCell className="!bg-primary-100 dark:!bg-primary-600">{t('price')}</TableCell>
                                    <TableCell className="!bg-primary-100 dark:!bg-primary-600"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="!overflow-hidden">
                                {listProduct.map((item, index) => (
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            sx={{
                                                minWidth: '100px',
                                            }}
                                            onClick={() => handleNextDetailPage(item.id)}
                                        >
                                            <AnimationTransform TransY={{ to: -100, from: 0 }}>
                                                <Image
                                                    src={item?.ProductImage[0]?.url || ''}
                                                    className="sm:h-24 sm:w-24 lg:h-30 lg:w-30  h-16 w-16"
                                                />
                                            </AnimationTransform>
                                        </TableCell>
                                        <TableCell align="left">
                                            <AnimationTransform TransY={{ to: -100, from: 0 }}>
                                                {item.name}
                                            </AnimationTransform>
                                        </TableCell>
                                        <TableCell align="center">
                                            <AnimationTransform TransY={{ to: -100, from: 0 }}>
                                                <InputQuantity
                                                    valueQuantity={item.quantity || 1}
                                                    idItem={item.id}
                                                    handleChangeItemQuantity={handleChangeItemQuantity}
                                                />
                                            </AnimationTransform>
                                        </TableCell>
                                        <TableCell align="left">
                                            <AnimationTransform TransY={{ to: -100, from: 0 }}>
                                                <div className="text-base not-italic font-medium text-red-500 flex ">
                                                    <span className="text-sm pr-0.5">$</span>
                                                    {item.totalPrice?.toLocaleString('vi-VN')}
                                                </div>
                                            </AnimationTransform>
                                        </TableCell>
                                        <TableCell align="left">
                                            <AnimationTransform TransY={{ to: -100, from: 0 }}>
                                                <MouseOverPopover content={t('deteleProduct')}>
                                                    <IconButton
                                                        aria-label="delete"
                                                        onClick={() => handleDeleteProduct(item.id)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </MouseOverPopover>
                                            </AnimationTransform>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            ) : (
                <div className="flex flex-col justify-center items-center mt-8 text-xl text-grey-400 gap-5">
                    <AnimationScale Scale={{ to: 0.9, from: 1 }}>
                        <ContentPasteSearch sx={{ fontSize: '100px' }} />
                    </AnimationScale>
                    <AnimationScale Scale={{ to: 0.9, from: 1 }}>{t('noProductInCart')}</AnimationScale>
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
        </>
    );
};

export default ListProductInCart;
