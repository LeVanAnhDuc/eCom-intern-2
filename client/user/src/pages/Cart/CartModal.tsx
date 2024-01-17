import Fab from '@mui/material/Fab';
import Close from '@mui/icons-material/Close';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import ContentPasteSearch from '@mui/icons-material/ContentPasteSearch';
import Drawer from '@mui/material/Drawer';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { selectListProductCart, setDeteleToCart, setQuantityProductInCart } from './cartSlice';
import config from '../../config';
import AnimationTransform from '../../components/AnimationTransform';
import Image from '../../components/Image';
import InputQuantity from '../../components/InputQuantity';
import MouseOverPopover from '../../components/MouseOverPopover';
import { IProduct } from '../../types/IProduct';

interface Iprops {
    openCartModal: boolean;
    toggleDrawerCartModal: () => void;
}
const CartModal = (props: Iprops) => {
    const { openCartModal, toggleDrawerCartModal } = props;

    const { t } = useTranslation('cart');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const listProduct: IProduct[] = useSelector(selectListProductCart);

    const totalPrice = useMemo(() => {
        let total = 0;
        listProduct.map((item) => (total += item.totalPrice === undefined ? 0 : item.totalPrice));
        return total;
    }, [listProduct]);

    const handleChangeItemQuantity = async (idItemInCart: number, quantity: number) => {
        dispatch(setQuantityProductInCart({ id: idItemInCart, quantity: quantity }));
    };
    const handleDeleteProduct = async (idItemInCart: number) => {
        dispatch(setDeteleToCart(idItemInCart));
    };

    const handleNextDetailPage = (idProduct: number) => {
        if (idProduct) {
            navigate(`${config.Routes.detailProduct}/${idProduct}`);
        } else {
            toast.error('Đang bảo trì');
        }
    };
    return (
        <Drawer anchor={'right'} open={openCartModal} onClose={toggleDrawerCartModal}>
            <div className="w-screen sm:w-full sm:min-w-[31rem] h-full hide-scrollbar overflow-y-scroll bg-white rounded-b-xl dark:bg-[#1e1e1e]">
                <div className="h-max relative">
                    <AnimationTransform TransY={{ to: -100, from: 0 }} className="sticky top-0 z-10">
                        <div className="bg-primary-100 w-full h-14 rounded-b-3xl dark:bg-primary-600">
                            <div className="flex justify-between items-center mb-10 h-full px-5">
                                <span className="text-xl font-bold tracking-wide">{t('cart')}</span>
                                <Fab color="error" size="small">
                                    <Close onClick={toggleDrawerCartModal} />
                                </Fab>
                            </div>
                        </div>
                    </AnimationTransform>

                    {listProduct.length > 0 ? (
                        <Paper className="!min-h-screen">
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        {listProduct.map((item, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    sx={{
                                                        minWidth: '100px',
                                                    }}
                                                    onClick={() => handleNextDetailPage(item.id)}
                                                >
                                                    <AnimationTransform TransY={{ to: -50, from: 0 }}>
                                                        <Image
                                                            src={item?.ProductImage[0]?.url || ''}
                                                            className="sm:h-24 sm:w-24 lg:h-30 lg:w-30  h-16 w-16"
                                                        />
                                                    </AnimationTransform>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <AnimationTransform TransY={{ to: -50, from: 0 }}>
                                                        <div className="flex flex-col gap-5 justify-center items-start">
                                                            <div>{item.name}</div>
                                                            <InputQuantity
                                                                valueQuantity={item.quantity || 1}
                                                                idItem={item.id}
                                                                handleChangeItemQuantity={handleChangeItemQuantity}
                                                            />
                                                        </div>
                                                    </AnimationTransform>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <AnimationTransform TransY={{ to: -50, from: 0 }}>
                                                        <div className="text-base not-italic font-medium text-red-500 flex">
                                                            <span className="text-sm pr-0.5">$</span>
                                                            {item.totalPrice?.toLocaleString('vi-VN')}
                                                        </div>
                                                    </AnimationTransform>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <AnimationTransform TransY={{ to: -50, from: 0 }}>
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
                        <div className="min-h-screen flex flex-col justify-center items-center text-xl text-grey-400 gap-5">
                            <ContentPasteSearch sx={{ fontSize: '100px' }} />
                            {t('noProductInCart')}
                        </div>
                    )}
                    <div className="sticky bottom-0 z-10 w-full h-fit bg-white dark:bg-primary-600">
                        <div className="flex flex-col w-full h-fit px-5 pt-2 pb-5 gap-2">
                            <div className="flex justify-between items-center w-full py-3 relative">
                                <span className="text-left col-span-2">{t('totalCost')}</span>
                                <span className="text-right text-red-500 flex justify-end">
                                    <span className="text-sm pr-0.5">$</span>
                                    {totalPrice.toLocaleString('vi-VN')}
                                </span>
                                <span className="absolute left-0 bottom-2 h-0.5 bg-grey-300 w-full"></span>
                            </div>
                            <div className="flex justify-between w-full gap-5">
                                <Link to={config.Routes.cart} className="w-full">
                                    <Button variant="outlined" fullWidth className="!rounded-full">
                                        {t('cart')}
                                    </Button>
                                </Link>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    className="!rounded-full"
                                    disabled={listProduct.length > 0 ? false : true}
                                    onClick={() => navigate(config.Routes.checkOut)}
                                >
                                    {t('checkOut')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    );
};

export default CartModal;
