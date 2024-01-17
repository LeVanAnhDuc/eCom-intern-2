import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Image from '../../components/Image';
import config from '../../config';
import IBuyHistory from '../../types/IBuyHistory';
import { selectListBillHistory } from '../PurchaseHistory/purchaseHistorySlice';

const DetailPurchaseHistory = () => {
    const { id } = useParams();
    const { t } = useTranslation('purchaseHistory');
    const navigate = useNavigate();
    const listPurchase = useSelector(selectListBillHistory);

    const order: IBuyHistory = listPurchase.filter((item) => item.id === Number(id))[0];
    if (!order) {
        navigate(config.Routes.purchaseHistory);
    }

    return (
        <main className="w-11/12 sm:w-10/12 m-auto">
            <table className="border-collapse border border-slate-400 mx-auto my-20 w-full">
                <caption className="caption-top pb-10 font-bold text-2xl ">
                    <span className="float-right">
                        <Link to={config.Routes.purchaseHistory}>
                            <Button variant="contained">{t('back')}</Button>
                        </Link>
                    </span>
                    {t('detailedOrderInformation')}
                </caption>
                <thead>
                    <tr>
                        <th className="p-5 text-left text-xl bg-primary-200 dark:bg-primary-600">
                            {t('orderDetails')}
                        </th>
                        <th className="p-5 text-left text-xl bg-primary-200 dark:bg-primary-600"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-slate-300 p-5 font-bold text-lg">{t('orderDate')}</td>
                        <td className="border border-slate-300 p-5">{order?.time}</td>
                    </tr>

                    <tr>
                        <td className="border border-slate-300 p-5 font-bold text-lg">{t('status')}</td>
                        <td className="border border-slate-300 p-5 text-red-500">
                            {order?.status ? t('pendingConfirmation') : t('confirmed')}
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 p-5 font-bold text-lg">{t('shippingAddress')}</td>
                        <td className="border border-slate-300 p-5">
                            {order?.checkOut.address}, {order?.checkOut.ward}, {order?.checkOut.district},
                            {order?.checkOut.city}
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 p-5 font-bold text-lg">{t('typePayment')}</td>
                        <td className="border border-slate-300 p-5">{order?.checkOut.typePayment}</td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 p-5 font-bold text-lg">{t('note')}</td>
                        <td className="border border-slate-300 p-5">{order?.checkOut.note}</td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 p-5 font-bold text-lg">{t('purchaser')}</td>
                        <td className="border border-slate-300 p-5">{order?.name}</td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 p-5 font-bold text-lg">{t('TotalAmount')}</td>
                        <td className="border border-slate-300 p-5">
                            <div className="text-base not-italic font-medium text-red-500 flex ">
                                <span className="text-sm pr-0.5">$</span>
                                {order?.totalPrice.toLocaleString('vi-VN')}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Table size="small" aria-label="purchases">
                <TableHead>
                    <TableRow>
                        <TableCell>{t('product')}</TableCell>
                        <TableCell align="left">{t('Name')}</TableCell>
                        <TableCell align="left">{t('unitPrice')}</TableCell>
                        <TableCell align="left">{t('TotalAmount')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {order?.products.map((itemproducts, indexproducts) => (
                        <TableRow
                            key={indexproducts}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                <Link to={config.Routes.detailProduct + '/' + itemproducts.id}>
                                    <div className="h-16 w-16 sm:h-24 sm:w-24 lg:h-36 lg:w-36 overflow-hidden">
                                        <Image
                                            src={itemproducts.ProductImage[0]?.url || ''}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </Link>
                            </TableCell>
                            <TableCell align="left">
                                <div className="text-md font-medium">{itemproducts.name}</div>
                                <span className="font-semibold text-base">{t('quantity')}: </span>

                                {itemproducts.quantity}
                            </TableCell>
                            <TableCell align="left">
                                <div className="text-base not-italic font-medium text-red-500 flex ">
                                    <span className="text-sm pr-0.5">$</span>
                                    <span> {itemproducts.price.toLocaleString('vi-VN')}</span>
                                </div>
                            </TableCell>
                            <TableCell align="left">
                                <div className="text-base not-italic font-medium text-red-500 flex">
                                    <span className="text-sm pr-0.5">$</span>
                                    <span> {itemproducts.totalPrice?.toLocaleString('vi-VN')}</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </main>
    );
};

export default DetailPurchaseHistory;
