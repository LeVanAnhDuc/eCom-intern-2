import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import NavigateBefore from '@mui/icons-material/NavigateBefore';
import NavigateNext from '@mui/icons-material/NavigateNext';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Rating from '@mui/material/Rating';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Skeleton from '@mui/material/Skeleton';

import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { IProduct } from '../../types/IProduct';
import { getProductAPI } from '../../apis/product';
import config from '../../config';
import Error404 from '../Error404';
import AnimationScale from '../../components/AnimationScale';
import AnimationTransform from '../../components/AnimationTransform';
import { setAddProductToCart } from '../Cart/cartSlice';
import { selectListWishList, setAddProductToWishList, setDeteleProductInWishList } from '../WishList/wishListSlice';

interface Iprops {
    id?: string;
    setNameProduct: Dispatch<SetStateAction<string>>;
}
const InformationProduct = (props: Iprops) => {
    const { id, setNameProduct } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation('detailProduct');
    const listWishList = useSelector(selectListWishList);

    const [product, setProduct] = useState<IProduct>();
    const [isLoadingAPI, setIsLoadingAPI] = useState<boolean>(false);
    const [errorGetAPIProduct, setErrorGetAPIProduct] = useState<unknown>();
    const [favourite, setFavourite] = useState<boolean>(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const images = product?.ProductImage || [];

    const getProduct = async (id: number) => {
        setIsLoadingAPI(true);
        try {
            if (id && !isNaN(+id)) {
                const response = await getProductAPI(id);

                const item = response.data;
                if (response.status === 200) {
                    if (response?.data) {
                        let newItems: IProduct;
                        const isDuplicate = listWishList.some((product) => product.id === item.id);
                        isDuplicate
                            ? (newItems = { ...item, favourite: true })
                            : (newItems = { ...item, favourite: false });
                        setProduct(newItems);
                        setFavourite(newItems.favourite || false);
                        setNameProduct(response.data.name);
                    }
                } else if (response.status === 401) {
                    navigate(config.Routes.logIn);
                } else {
                    toast.error(response.data.message);
                    navigate(config.Routes.shop);
                }
            } else {
                navigate(config.Routes.shop);
            }
        } catch (e) {
            setErrorGetAPIProduct(e);
        } finally {
            setIsLoadingAPI(false);
        }
    };

    if (errorGetAPIProduct) {
        <Error404 />;
    }

    useEffect(() => {
        if (id) {
            getProduct(+id);
        }
        window.scroll(0, 0);
    }, [id]);

    const handleAddCart = async () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                product && dispatch(setAddProductToCart({ ...product }));
            } catch (error) {
                toast.error(`${error}`);
            }
        } else {
            toast.info(t('requireLogin'));
            navigate(config.Routes.logIn);
        }
    };

    const handleToggleFavorite = async () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                if (product) {
                    favourite
                        ? dispatch(setDeteleProductInWishList(product.id))
                        : dispatch(setAddProductToWishList(product));
                    setFavourite((prev) => !prev);
                }
            } catch (error) {
                toast.error(`${error}`);
            }
        } else {
            toast.info(t('requireLogin'));
            navigate(config.Routes.logIn);
        }
    };

    const handleNextClickImage = () => {
        const newIndex = (currentImageIndex + 1) % images.length;
        setCurrentImageIndex(newIndex);
    };
    const handlePreviousClickImage = () => {
        if (currentImageIndex === 0) {
            setCurrentImageIndex(images.length - 1);
        } else {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };
    const handleChangePic = (index: number) => {
        setCurrentImageIndex(index);
    };
    return (
        <>
            <div className="grid grid-flow-row md:grid-flow-col grid-cols-12 gap-2">
                <div className="hidden col-span-1 lg:flex flex-col gap-2 overflow-y-scroll scroll-smooth hide-scrollbar h-[34rem]">
                    {images.length > 0
                        ? images.map((item, index) =>
                              isLoadingAPI ? (
                                  <Skeleton animation="wave" variant="rounded" className="!h-full !w-full" />
                              ) : (
                                  <AnimationScale Scale={{ to: 0.7, from: 1 }} className="">
                                      <img
                                          src={item?.url}
                                          key={index}
                                          alt={item?.url}
                                          className="w-full h-20 bg-contain rounded-md hover:opacity-40"
                                          onMouseEnter={() => handleChangePic(index)}
                                      />
                                  </AnimationScale>
                              ),
                          )
                        : Array(12)
                              .fill(null)
                              .map((item, index) => (
                                  <AnimationScale Scale={{ to: 0.7, from: 1 }} className="">
                                      <img
                                          src={
                                              'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b1d455eb-8447-4b51-a2b3-61db8b7a78fe/air-force-1-07-shoes-RgcF1Q.png'
                                          }
                                          key={index}
                                          alt={item?.url}
                                          className="w-full h-20 bg-contain rounded-md hover:opacity-40"
                                          onMouseEnter={() => handleChangePic(index)}
                                      />
                                  </AnimationScale>
                              ))}
                </div>
                <AnimationScale Scale={{ to: 0.7, from: 1 }} className="col-span-12 md:col-span-6">
                    <div className="h-[34rem] relative flex gap-1">
                        {isLoadingAPI ? (
                            <Skeleton animation="wave" variant="rounded" className="!h-full !w-full" />
                        ) : (
                            <div
                                className="w-full bg-cover bg-no-repeat bg-center relative rounded-md border-2"
                                style={{
                                    backgroundImage: `url(${
                                        images[currentImageIndex]?.url ||
                                        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b1d455eb-8447-4b51-a2b3-61db8b7a78fe/air-force-1-07-shoes-RgcF1Q.png'
                                    })`,
                                }}
                            >
                                <div className="w-full flex justify-end ">
                                    <AnimationTransform TransX={{ to: 100, from: 0 }}>
                                        <IconButton onClick={handlePreviousClickImage}>
                                            <NavigateBefore
                                                className="bg-white dark:bg-primary-600 rounded-full"
                                                sx={{ fontSize: 35 }}
                                            />
                                        </IconButton>
                                    </AnimationTransform>
                                    <AnimationTransform TransX={{ to: -100, from: 0 }}>
                                        <IconButton onClick={handleNextClickImage}>
                                            <NavigateNext
                                                className="bg-white dark:bg-primary-600 rounded-full"
                                                sx={{ fontSize: 35 }}
                                            />
                                        </IconButton>
                                    </AnimationTransform>
                                </div>
                            </div>
                        )}
                    </div>
                </AnimationScale>

                <div className="col-span-12 md:col-span-6 lg:col-span-5 md:ml-10 flex flex-col gap-3">
                    {isLoadingAPI ? (
                        <Skeleton animation="wave" variant="rounded" className="!h-20 !w-full" />
                    ) : (
                        <AnimationTransform TransY={{ to: -100, from: 0 }}>
                            <div className="text-3xl not-italic font-normal">{product?.name}</div>
                        </AnimationTransform>
                    )}
                    <AnimationTransform TransX={{ to: 200, from: 0 }}>
                        <div className="text-lg not-italic font-medium pt-5 flex">
                            {isLoadingAPI ? (
                                <Skeleton animation="wave" variant="rounded" className="!h-full !w-full" />
                            ) : (
                                <>
                                    <span className="text-sm pr-1 text-red-500">$</span>
                                    <span className="text-red-500">{product?.price.toLocaleString('vi-VN')}</span>
                                </>
                            )}
                            <span className="text-gray-600 px-3">|</span>
                            {isLoadingAPI ? (
                                <Skeleton animation="wave" variant="rounded" className="!h-full !w-full" />
                            ) : (
                                <div>
                                    <span className="text-lg  font-semibold pr-2">3.7/5</span>
                                    <Rating readOnly value={3.7} precision={0.5} sx={{ fontSize: '16px' }} />
                                </div>
                            )}
                            <span className="text-gray-600 px-3">|</span>
                            {isLoadingAPI ? (
                                <Skeleton animation="wave" variant="rounded" className="!h-full !w-full" />
                            ) : (
                                <div className="flex gap-2 items-center ">
                                    <span className="text-lg  font-semibold">10</span>
                                    <span className="text-base text-gray-500">{t('review')}</span>
                                </div>
                            )}
                        </div>
                    </AnimationTransform>
                    {isLoadingAPI ? (
                        <Skeleton animation="wave" variant="rounded" className="!h-full !w-full" />
                    ) : (
                        <AnimationTransform TransX={{ to: 200, from: 0 }}>
                            <div className="mt-5 whitespace-pre-line">{product?.description}</div>
                        </AnimationTransform>
                    )}

                    {isLoadingAPI ? (
                        <Skeleton animation="wave" variant="rounded" className="!h-20 !w-full" />
                    ) : (
                        <AnimationTransform TransY={{ to: 200, from: 0 }}>
                            <div className="flex gap-2">
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ height: 50, marginTop: 2 }}
                                    onClick={handleAddCart}
                                >
                                    <div className="flex gap-2">
                                        <span>
                                            + <ShoppingCart />
                                        </span>
                                        <span>{t('AddToCart')}</span>
                                    </div>
                                </Button>
                                <Button
                                    sx={{ height: 50, marginTop: 2, color: 'red', border: '1px solid red' }}
                                    variant="outlined"
                                    onClick={handleToggleFavorite}
                                >
                                    {favourite ? (
                                        <Favorite sx={{ color: 'red' }} />
                                    ) : (
                                        <FavoriteBorder sx={{ color: 'red' }} />
                                    )}
                                </Button>
                            </div>
                        </AnimationTransform>
                    )}
                </div>
            </div>
        </>
    );
};

export default InformationProduct;
