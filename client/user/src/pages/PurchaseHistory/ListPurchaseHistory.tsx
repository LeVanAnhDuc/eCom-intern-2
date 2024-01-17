import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import ModalReview from './ModalReview';
import { IProduct } from '../../types/IProduct';
import IBuyHistory from '../../types/IBuyHistory';
import Image from '../../components/Image';
import config from '../../config';
import { setDeteleBillHistory } from './purchaseHistorySlice';

interface Iprops {
    item: IBuyHistory;
}

export default function PurchaseHistory(props: Iprops) {
    const { item } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation('purchaseHistory');

    const [open, setOpen] = useState(true);

    const handleCancelOrder = async (id: number) => {
        const userConfirmed = window.confirm(t('userConfirmed'));
        if (userConfirmed) {
            try {
                dispatch(setDeteleBillHistory(id));
            } catch (error) {
                toast.error(`${error}`);
            }
        }
    };

    const [openReview, setOpenReview] = useState(false);
    const [itemCart, setItemCart] = useState<IProduct>();
    const handleOpenReview = (item: IProduct) => {
        setItemCart(item);
        setOpenReview(true);
    };
    const handleCloseReview = () => setOpenReview(false);

    return (
        <>
            <ModalReview open={openReview} handleClose={handleCloseReview} item={itemCart} />
            <TableRow
                sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                }}
            >
                <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    className="!font-semibold !bg-primary-50 dark:!bg-primary-600"
                >
                    {item.time}
                </TableCell>
                <TableCell align="center" className="!bg-primary-50 dark:!bg-primary-600">
                    <div className="text-base not-italic font-medium text-red-500 flex ">
                        <span className="text-sm pr-0.5">$</span>

                        {item.totalPrice.toLocaleString('vi-VN')}
                    </div>
                </TableCell>
                <TableCell className="!bg-primary-50 dark:!bg-primary-600" align="left">
                    {item?.status ? t('pendingConfirmation') : t('confirmed')}
                </TableCell>
                <TableCell className="!bg-primary-50 dark:!bg-primary-600">
                    <Button variant="outlined" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </Button>
                </TableCell>
                <TableCell className="!bg-primary-50 dark:!bg-primary-600">
                    <div className="flex gap-2">
                        <Button
                            onClick={() => navigate(config.Routes.detailPurchaseHistory + '/' + item.id)}
                            variant="outlined"
                        >
                            <span className="normal-case  text-base">{t('detail')}</span>
                        </Button>

                        <Button onClick={() => handleCancelOrder(item.id || 0)} variant="contained" color="error">
                            <span className="normal-case text-white text-base">{t('cancelOrder')}</span>
                        </Button>
                    </div>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1, paddingBottom: 3 }}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{t('product')}</TableCell>
                                        <TableCell align="left">{t('Name')}</TableCell>
                                        <TableCell align="left">{t('unitPrice')}</TableCell>
                                        <TableCell align="left">{t('TotalAmount')}</TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {item.products.map((itemProduct, indexProduct) => (
                                        <TableRow
                                            key={indexProduct}
                                            sx={{
                                                '&:last-child td, &:last-child th': {
                                                    border: 0,
                                                },
                                            }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Link to={`${config.Routes.detailProduct}/${itemProduct.id}`}>
                                                    <div className="h-16 w-16 sm:h-24 sm:w-24 lg:h-36 lg:w-36 overflow-hidden">
                                                        <Image
                                                            src={itemProduct.ProductImage[0]?.url || ''}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </Link>
                                            </TableCell>
                                            <TableCell align="left">
                                                <div className="text-md font-medium">{itemProduct.name}</div>
                                                <span className="font-semibold text-base">{t('quantity')}: </span>

                                                {itemProduct.quantity}
                                            </TableCell>
                                            <TableCell align="left">
                                                <div className="text-base not-italic font-medium text-red-500 flex ">
                                                    <span className="text-sm pr-0.5">$</span>
                                                    <span>{itemProduct.price.toLocaleString('vi-VN')}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell align="left">
                                                <div className="text-base not-italic font-medium text-red-500 flex">
                                                    <span className="text-sm pr-0.5">$</span>
                                                    <span>{itemProduct.totalPrice?.toLocaleString('vi-VN')}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {!itemProduct.hasReview && (
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => handleOpenReview(itemProduct)}
                                                        sx={{ width: '110px' }}
                                                    >
                                                        {t('Rate')}
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="flex justify-between items-center mt-10">
                                <div className="pl-5">
                                    <div className="pb-2">
                                        <Typography fontWeight={600} component="span">
                                            {t('shippingAddress')}:
                                        </Typography>
                                        <Typography component="span">
                                            {item.checkOut.address}, {item.checkOut.ward},{item.checkOut.district},{' '}
                                            {item.checkOut.city}
                                        </Typography>
                                    </div>
                                    <div className="pb-2">
                                        <Typography fontWeight={600} component="span">
                                            {t('typePayment')}:
                                        </Typography>
                                        <Typography component="span"> {item.checkOut.typePayment}</Typography>
                                    </div>
                                    <div>
                                        <Typography fontWeight={600} component="span">
                                            {t('note')}:
                                        </Typography>
                                        <Typography component="span"> {item.checkOut.note}</Typography>
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}
