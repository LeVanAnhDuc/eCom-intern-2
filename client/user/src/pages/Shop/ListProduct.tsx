import ContentPasteSearch from '@mui/icons-material/ContentPasteSearch';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Error404 from '../Error404';
import config from '../../config';
import { setIsLogin } from '../LogIn/loginSlice';
import { getAllProductsAPI } from '../../apis/product';
import { IAllProductAPI, IProduct } from '../../types/IProduct';
import AnimationScale from '../../components/AnimationScale';
import Card from '../../components/Card';
import { selectListWishList } from '../WishList/wishListSlice';

interface Iprops {
    page: number;
    filterType: string;
    sortType: string;
    setTotalPages: Dispatch<SetStateAction<number>>;
    setTotalProducts: Dispatch<SetStateAction<number>>;
    setTotalProductsPage: Dispatch<SetStateAction<number>>;
}

const ListProductAPI = (props: Iprops) => {
    const { page, filterType, sortType, setTotalPages, setTotalProducts, setTotalProductsPage } = props;

    const dispatch = useDispatch();
    const { t } = useTranslation('listProduct');
    const navigate = useNavigate();
    const location = useLocation();
    const hash = decodeURIComponent(location.hash.substring(1));
    let search = '';
    if (hash) {
        search = hash;
    }
    const listWishList = useSelector(selectListWishList);

    const [listProduct, setListProduct] = useState<Array<IProduct>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorCallAPI, setErrorCallAPI] = useState<unknown>();

    const getAllProduct = async (object: IAllProductAPI) => {
        setIsLoading(true);
        try {
            const response = await getAllProductsAPI(object);

            const pagination = response.data.pagination;
            const items = response.data.items;

            if (response.status === 200) {
                const newListProduct: Array<IProduct> = items.map((item: IProduct) => ({
                    ...item,
                    favourite: listWishList.some((itemWL) => itemWL.id === item.id),
                }));

                setListProduct(newListProduct);
                setTotalPages(Math.ceil(pagination.totalItem / pagination.limit));
                setTotalProducts(pagination.totalItem);
                if (pagination.totalItem !== 0) {
                    setTotalProductsPage(pagination.limit);
                } else {
                    setTotalProductsPage(0);
                }
            }
            if (response.status === 401) {
                localStorage.removeItem('wishList');
                localStorage.removeItem('listBill');
                localStorage.removeItem('totalWishList');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('listProductInCart');
                localStorage.removeItem('totalProductInCart');
                localStorage.removeItem('userName');
                dispatch(setIsLogin(false));
                navigate(config.Routes.home);
            }
        } catch (e) {
            setErrorCallAPI(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const object: IAllProductAPI = {
            searchTerm: search,
            page: page,
            active: true,
            sortType: sortType,
            sortBy: filterType,
        };

        getAllProduct(object);
    }, [page, sortType, filterType, search]);

    if (errorCallAPI) {
        <Error404 />;
    }

    return (
        <>
            {listProduct.length > 0 ? (
                <div className="w-11/12 sm:w-10/12 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {listProduct.map((item, index) => (
                        <AnimationScale Scale={{ to: 0.9, from: 1 }} key={index}>
                            <Card itemProduct={item} isLoading={isLoading} />
                        </AnimationScale>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center py-32 text-xl text-grey-400 gap-5">
                    <ContentPasteSearch sx={{ fontSize: '100px' }} />
                    {t('noProducts')}
                </div>
            )}
        </>
    );
};

export default ListProductAPI;
