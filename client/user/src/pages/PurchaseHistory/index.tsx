import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from '@mui/material/styles/styled';
import TableCell from '@mui/material/TableCell';
import tableCellClasses from '@mui/material/TableCell/tableCellClasses';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import ListPurchaseHistory from './ListPurchaseHistory';
import IBuyHistory from '../../types/IBuyHistory';
import AnimationScale from '../../components/AnimationScale';
import AnimationTransform from '../../components/AnimationTransform';
import { selectListBillHistory } from './purchaseHistorySlice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#B3A492',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        padding: 3,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const PurchaseHistory = () => {
    const { t } = useTranslation('purchaseHistory');
    const listHistory = useSelector(selectListBillHistory);

    return (
        <>
            <div className="bg-shop-banner bg-no-repeat bg-cover h-72 w-full">
                <div className="flex items-center justify-center h-full text-5xl font-bold font-serif">
                    <div className="flex gap-14">
                        <AnimationTransform TransY={{ to: -100, from: 0 }}>{t('listPurchase')}</AnimationTransform>
                    </div>
                </div>
            </div>
            <div className="bg-primary-100 h-20 w-full dark:bg-primary-600">
                <div className="w-11/12 sm:w-10/12 m-auto flex items-center h-full">
                    <AnimationScale Scale={{ to: 0.6, from: 1 }}>
                        <Breadcrumbs className="!font-semibold ">
                            <AnimationTransform TransY={{ to: -100, from: 0 }}>
                                <Link className="hover:underline hover:text-primary-400" to={config.Routes.home}>
                                    {t('Home')}
                                </Link>
                            </AnimationTransform>
                            <AnimationTransform TransY={{ to: 100, from: 0 }}>
                                <Link
                                    className="hover:underline hover:text-primary-400"
                                    to={config.Routes.purchaseHistory}
                                >
                                    {t('listPurchase')}
                                </Link>
                            </AnimationTransform>
                        </Breadcrumbs>
                    </AnimationScale>
                </div>
            </div>
            <div className="w-11/12 sm:w-10/12 m-auto mt-5">
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer>
                        <Table stickyHeader aria-label="simple table">
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell className="dark:!bg-primary-900 !bg-primary-400" align="center">
                                        {t('orderDate')}
                                    </StyledTableCell>
                                    <StyledTableCell className="dark:!bg-primary-900 !bg-primary-400" align="left">
                                        {t('TotalAmount')}
                                    </StyledTableCell>
                                    <StyledTableCell className="dark:!bg-primary-900 !bg-primary-400" align="left">
                                        {t('status')}
                                    </StyledTableCell>
                                    <StyledTableCell className="dark:!bg-primary-900 !bg-primary-400">
                                        {t('detail')}
                                    </StyledTableCell>
                                    <StyledTableCell className="dark:!bg-primary-900 !bg-primary-400 !w-60"></StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {listHistory.map((item: IBuyHistory, index) => (
                                    <ListPurchaseHistory key={index} item={item} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        </>
    );
};

export default PurchaseHistory;
