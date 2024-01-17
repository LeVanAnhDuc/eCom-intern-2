import ShoppingCart from '@mui/icons-material/ShoppingCart';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Skeleton from '@mui/material/Skeleton';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import config from '../../config';
import { IProduct } from '../../types/IProduct';
import { setAddProductToCart } from '../../pages/Cart/cartSlice';
import { setAddProductToWishList, setDeteleProductInWishList } from '../../pages/WishList/wishListSlice';

interface Iprops {
    itemProduct: IProduct;
    isLoading?: boolean;
}

const Card = (props: Iprops) => {
    const { itemProduct, isLoading } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation('card');

    const [favourite, setFavourite] = useState<boolean>(itemProduct.favourite);
    const handleChangeFavorite = async () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                favourite
                    ? dispatch(setDeteleProductInWishList(itemProduct.id))
                    : dispatch(setAddProductToWishList(itemProduct));
                setFavourite((prev) => !prev);
                console.log('check');
            } catch (error) {
                toast.error(`${error}`);
            }
        } else {
            toast.info(t('requireLogin'));
            navigate(config.Routes.logIn);
        }
    };
    const handleNextDetailPage = () => {
        navigate(`${config.Routes.detailProduct}/${itemProduct.id}`);
    };

    const handleAddToCart = () => {
        dispatch(setAddProductToCart({ ...itemProduct }));
    };

    return (
        <div className="shadow-lg p-2 rounded-lg bg-white dark:bg-primary-600 transition hover:-translate-y-1.5 hover:-translate-x-1.5 border-b-4  border-r-4 border-transparent  hover:border-b-primary-100  hover:border-r-primary-100 hover:dark:border-b-primary-800 hover:dark:border-r-primary-800">
            <div onClick={handleNextDetailPage} className="cursor-pointer">
                <Box
                    sx={{
                        height: 270,
                        overflow: 'hidden',
                        margin: 1,
                        '&:hover .image': {
                            transform: 'scale(1.2)',
                        },
                    }}
                >
                    {isLoading ? (
                        <Skeleton animation="wave" variant="rounded" className="!h-full !w-full" />
                    ) : (
                        <CardMedia
                            className="image"
                            sx={{
                                width: '100%',
                                height: '100%',
                                transition: 'transform 0.2s',
                            }}
                            image={
                                itemProduct.ProductImage[0]?.url ||
                                'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b1d455eb-8447-4b51-a2b3-61db8b7a78fe/air-force-1-07-shoes-RgcF1Q.png'
                            }
                        />
                    )}
                </Box>
            </div>

            <CardContent>
                <div className="grid gap-1">
                    <div className="h-18 truncate font-medium ">
                        {isLoading ? <Skeleton animation="wave" variant="rounded" /> : itemProduct?.name}
                    </div>
                    <div className="flex justify-between mt-3 gap-5">
                        <div className="text-base not-italic font-medium text-red-500 flex w-full">
                            {isLoading ? (
                                <Skeleton animation="wave" variant="rounded" className=" !w-full" />
                            ) : (
                                <>
                                    <span className="text-sm pr-0.5">$</span>
                                    {itemProduct.price.toLocaleString('vi-VN')}
                                </>
                            )}
                        </div>
                        {isLoading ? (
                            <Skeleton animation="wave" variant="rounded" className="!w-full" />
                        ) : (
                            <Rating value={4.5} precision={0.5} readOnly size="small" />
                        )}
                    </div>
                </div>
            </CardContent>

            <CardActions>
                {isLoading ? (
                    <Skeleton animation="wave" variant="rounded" width={70} className="!h-9 !w-full" />
                ) : (
                    <Button fullWidth variant="outlined" onClick={handleAddToCart}>
                        <ShoppingCart />
                    </Button>
                )}
                {isLoading ? (
                    <Skeleton animation="wave" variant="rounded" width={70} className="!h-9 !w-full" />
                ) : (
                    <Button onClick={handleChangeFavorite}>
                        {favourite ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder sx={{ color: 'red' }} />}
                    </Button>
                )}
                {isLoading ? (
                    <Skeleton animation="wave" variant="rounded" width={70} className="!h-9 !w-full" />
                ) : (
                    <div className="flex place-content-center w-full ">
                        <span className="text-sm text-grey-600 dark:text-grey-300 font-medium ">Yêu thích 99</span>
                    </div>
                )}
            </CardActions>
        </div>
    );
};

export default Card;
