import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import styled from '@mui/material/styles/styled';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import ContentPasteSearch from '@mui/icons-material/ContentPasteSearch';

import { useNavigate } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import MouseOverPopover from '../../components/MouseOverPopover';
import { IParamsProductAPI, IProduct } from '../../types/IProduct';
import { getAllProductsAPI } from '../../apis/productApi';
import Error404 from '../Error404';
import config from '../../config';
import noImagge from '../../assets/img/no-image.png';
import AnimationTransform from '../../components/AnimationTransform';
import { setIsLogin } from '../LogIn/loginSlice';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

interface Iprops {
    checkActive: string;
    search: string;
    page: number;
    filterType: string;
    sortType: string;
    setTotalPages: Dispatch<SetStateAction<number>>;
}

const TableShowListProduct = (props: Iprops) => {
    const { search, page, filterType, sortType, setTotalPages, checkActive } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation('listProduct');

    const [listProduct, setListProduct] = useState<Array<IProduct>>([]);
    const [itemPerPage, setItemPerPage] = useState<number>(0);
    const [isLoadingAPI, setIsLoadingAPI] = useState<boolean>(false);
    const [errorGetListProduct, setErrorGetListProduct] = useState<unknown>();

    const getAllProduct = async (object: IParamsProductAPI) => {
        setIsLoadingAPI(true);
        try {
            const response = await getAllProductsAPI(object);

            const pagination = response.data.pagination;
            const items = response.data.items;

            if (response.status === 200) {
                setListProduct(items);
                setTotalPages(Math.ceil(pagination.totalItem / pagination.limit));
                setItemPerPage(pagination.limit);
            }
            if (response.status === 401) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('userName');
                dispatch(setIsLogin(false));

                navigate(config.Routes.logIn);
            }
        } catch (e) {
            setErrorGetListProduct(e);
        } finally {
            setIsLoadingAPI(false);
        }
    };

    useEffect(() => {
        const object: IParamsProductAPI = {
            active: checkActive === 'true' ? true : false,
            searchTerm: search,
            page: page,
            sortType: sortType,
            sortBy: filterType,
        };

        getAllProduct(object);
    }, [page, sortType, filterType, search, checkActive]);

    if (errorGetListProduct) {
        <Error404 />;
    }

    return (
        <>
            {listProduct.length > 0 ? (
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer>
                        <Table stickyHeader aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" sx={{ fontSize: 16, fontWeight: 'bold' }}>
                                        ID
                                    </TableCell>
                                    <TableCell align="left" sx={{ fontSize: 16, fontWeight: 'bold' }}></TableCell>
                                    <TableCell align="left" sx={{ fontSize: 16, fontWeight: 'bold' }}>
                                        {t('name')}
                                    </TableCell>
                                    <TableCell align="left" sx={{ fontSize: 16, fontWeight: 'bold' }}>
                                        {t('description')}
                                    </TableCell>
                                    <TableCell align="left" sx={{ fontSize: 16, fontWeight: 'bold' }}>
                                        {t('price')} ($)
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontSize: 16, fontWeight: 'bold' }}>
                                        {t('status')}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!isLoadingAPI
                                    ? listProduct.map((item) => (
                                          <StyledTableRow
                                              key={item.id}
                                              sx={{
                                                  '&:last-child td, &:last-child th': { border: 0 },
                                              }}
                                          >
                                              <TableCell
                                                  align="left"
                                                  component="th"
                                                  scope="row"
                                                  onClick={() => {
                                                      navigate(config.Routes.detailProduct + '/' + item.id);
                                                  }}
                                                  className="!cursor-pointer"
                                              >
                                                  <AnimationTransform TransY={{ to: -30, from: 0 }}>
                                                      #{item.id}
                                                  </AnimationTransform>
                                              </TableCell>
                                              <TableCell
                                                  align="center"
                                                  component="th"
                                                  scope="row"
                                                  onClick={() => {
                                                      navigate(config.Routes.detailProduct + '/' + item.id);
                                                  }}
                                                  className="!cursor-pointer"
                                              >
                                                  <AnimationTransform TransY={{ to: -30, from: 0 }}>
                                                      <Avatar
                                                          variant="rounded"
                                                          src={item.ProductImage && item.ProductImage[0]?.url}
                                                          alt={item.name || ''}
                                                      >
                                                          <img src={noImagge} />
                                                      </Avatar>
                                                  </AnimationTransform>
                                              </TableCell>
                                              <TableCell
                                                  align="left"
                                                  onClick={() => {
                                                      navigate(config.Routes.detailProduct + '/' + item.id);
                                                  }}
                                                  className="!cursor-pointer"
                                              >
                                                  <AnimationTransform TransY={{ to: -30, from: 0 }}>
                                                      {item.name}
                                                  </AnimationTransform>
                                              </TableCell>
                                              <TableCell
                                                  align="left"
                                                  sx={{
                                                      maxWidth: '200px',
                                                      minWidth: '100px',
                                                  }}
                                                  className="!truncate !cursor-pointer"
                                                  onClick={() => {
                                                      navigate(config.Routes.detailProduct + '/' + item.id);
                                                  }}
                                              >
                                                  <AnimationTransform TransY={{ to: -30, from: 0 }}>
                                                      <MouseOverPopover content={item.description}>
                                                          {item.description}
                                                      </MouseOverPopover>
                                                  </AnimationTransform>
                                              </TableCell>
                                              <TableCell
                                                  align="left"
                                                  onClick={() => {
                                                      navigate(config.Routes.detailProduct + '/' + item.id);
                                                  }}
                                                  className="!cursor-pointer"
                                              >
                                                  <AnimationTransform TransY={{ to: -30, from: 0 }}>
                                                      <div className="font-semibold text-red-500">
                                                          {item.price.toLocaleString('vi-VN')}
                                                      </div>
                                                  </AnimationTransform>
                                              </TableCell>
                                              <TableCell align="center">
                                                  <AnimationTransform TransY={{ to: -30, from: 0 }}>
                                                      {item.active ? (
                                                          <Button
                                                              variant="outlined"
                                                              color="inherit"
                                                              className="relative w-fit"
                                                          >
                                                              <div className="h-2 w-2 bg-green-500 rounded-full absolute right-0 top-0 animate-ping"></div>
                                                              <div className="font-semibold text-green-600">
                                                                  {t('active')}
                                                              </div>
                                                          </Button>
                                                      ) : (
                                                          <Button
                                                              variant="outlined"
                                                              color="inherit"
                                                              className="relative w-fit"
                                                          >
                                                              <div className="h-2 w-2 bg-red-500 rounded-full absolute right-0 top-0 animate-ping"></div>
                                                              <div className="font-semibold text-red-600">
                                                                  {t('unActive')}
                                                              </div>
                                                          </Button>
                                                      )}
                                                  </AnimationTransform>
                                              </TableCell>
                                          </StyledTableRow>
                                      ))
                                    : Array(itemPerPage)
                                          .fill(null)
                                          .map((_, index) => (
                                              <>
                                                  <StyledTableRow
                                                      key={index}
                                                      sx={{
                                                          '&:last-child td, &:last-child th': { border: 0 },
                                                      }}
                                                  >
                                                      <TableCell align="left" component="th" scope="row">
                                                          <Skeleton
                                                              animation="wave"
                                                              variant="rounded"
                                                              className="!h-9 !w-full"
                                                          />
                                                      </TableCell>
                                                      <TableCell align="center" component="th" scope="row">
                                                          <Skeleton
                                                              animation="wave"
                                                              variant="rounded"
                                                              className="!h-9 !w-full"
                                                          />
                                                      </TableCell>
                                                      <TableCell align="left">
                                                          <Skeleton
                                                              animation="wave"
                                                              variant="rounded"
                                                              className="!h-9 !w-full"
                                                          />
                                                      </TableCell>
                                                      <TableCell
                                                          align="left"
                                                          sx={{
                                                              maxWidth: '300px',
                                                              overflow: 'hidden',
                                                              textOverflow: 'ellipsis',
                                                              whiteSpace: 'nowrap',
                                                          }}
                                                      >
                                                          <Skeleton
                                                              animation="wave"
                                                              variant="rounded"
                                                              className="!h-9 !w-full"
                                                          />
                                                      </TableCell>
                                                      <TableCell align="left">
                                                          <Skeleton
                                                              animation="wave"
                                                              variant="rounded"
                                                              className="!h-9 !w-full"
                                                          />
                                                      </TableCell>
                                                      <TableCell align="center">
                                                          <Skeleton
                                                              animation="wave"
                                                              variant="rounded"
                                                              className="!h-9 !w-full"
                                                          />
                                                      </TableCell>
                                                  </StyledTableRow>
                                              </>
                                          ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            ) : (
                <div className="flex flex-col items-center py-32 text-xl text-grey-400 gap-5">
                    <ContentPasteSearch sx={{ fontSize: '100px' }} />
                    {t('noProducts')}
                </div>
            )}
        </>
    );
};

export default TableShowListProduct;
