import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Popper from '@mui/material/Popper';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Fab from '@mui/material/Fab';
import Store from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Menu from '@mui/icons-material/Menu';
import Favorite from '@mui/icons-material/Favorite';
import Close from '@mui/icons-material/Close';

import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import config from '../../config';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { selectIsLogin, selectUserName, setIsLogin } from '../../pages/LogIn/loginSlice';
import MouseOverPopover from '../MouseOverPopover';
import Search from '../Search';
import { selectToTalProductCart } from '../../pages/Cart/cartSlice';
import CartModal from '../../pages/Cart/CartModal';
import { selectToTalWishList } from '../../pages/WishList/wishListSlice';

function Header() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation('header');

    const userName = useAppSelector(selectUserName);
    const checkLogin = useAppSelector(selectIsLogin);
    const totalProductCart = useAppSelector(selectToTalProductCart);
    const totalWishList = useAppSelector(selectToTalWishList);
    const avatarUrl = '';

    const [scrollFixHeader, setScrollFixHeader] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [isDoneSearch, setDoneSearch] = useState<boolean>(false);
    const [popoverAvatar, setPopoverAvatar] = useState<HTMLElement | null>(null);
    const [menuResponsive, setMenuResponsive] = useState<boolean>(false);
    const [openCartModal, setOpenCartModal] = useState<boolean>(false);

    const handleLogout = () => {
        localStorage.removeItem('wishList');
        localStorage.removeItem('listBill');
        localStorage.removeItem('totalWishList');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('listProductInCart');
        localStorage.removeItem('totalProductInCart');
        localStorage.removeItem('userName');
        dispatch(setIsLogin(false));
        navigate(config.Routes.home);
        handlePopoverClose();
    };

    useEffect(() => {
        const listenScrollEvent = () => {
            window.scrollY > 100 ? setScrollFixHeader(true) : setScrollFixHeader(false);
        };

        window.addEventListener('scroll', listenScrollEvent);
        return () => {
            window.removeEventListener('scroll', listenScrollEvent);
        };
    }, []);

    useEffect(() => {
        if (isDoneSearch === true) {
            navigate(config.Routes.shop + '#' + search);
        }
        return () => setDoneSearch(false);
    });

    const handlePopoverToggle = (event: React.MouseEvent<HTMLElement>) => {
        setPopoverAvatar(popoverAvatar ? null : event.currentTarget);
    };
    const handlePopoverClose = () => {
        setPopoverAvatar(null);
    };

    const toggleMenuResponsive = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setMenuResponsive(open);
    };

    const toggleDrawerCartModal = () => {
        setOpenCartModal((prev) => !prev);
    };

    return (
        <>
            <div
                className={`${
                    scrollFixHeader
                        ? 'w-screen shadow-xl fixed top-0 bg-white dark:bg-grey-800'
                        : 'w-full bg-transparent dark:bg-grey-800'
                }  flex flex-col justify-center items-center z-50 py-3 `}
            >
                <div className="w-11/12 sm:w-10/12 flex justify-between gap-10 lg:gap-15 xl:gap-40">
                    <Link
                        to={config.Routes.home}
                        className="flex items-center tracking-widest uppercase  text-4xl font-serif font-semibold hover:text-primary-300 transition"
                    >
                        leduc
                    </Link>
                    <div className="w-full hidden lg:flex justify-center items-center ">
                        <Search
                            setSearch={setSearch}
                            setDoneSearch={setDoneSearch}
                            placeholder={t('placeholder')}
                            titleButton={t('titleButton')}
                        />
                    </div>
                    <div className="hidden lg:flex items-center gap-3">
                        <Link to={config.Routes.shop}>
                            <MouseOverPopover content={t('product')}>
                                <IconButton>
                                    <Store />
                                </IconButton>
                            </MouseOverPopover>
                        </Link>
                        {checkLogin ? (
                            <>
                                <Link to={config.Routes.wishList}>
                                    <MouseOverPopover content={t('wishList')}>
                                        <IconButton>
                                            <Badge
                                                badgeContent={totalWishList}
                                                color="secondary"
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                overlap="circular"
                                            >
                                                <Favorite />
                                            </Badge>
                                        </IconButton>
                                    </MouseOverPopover>
                                </Link>
                                <MouseOverPopover content={t('cart')}>
                                    <IconButton onClick={toggleDrawerCartModal}>
                                        <Badge
                                            badgeContent={totalProductCart}
                                            color="secondary"
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            overlap="circular"
                                        >
                                            <ShoppingCartIcon />
                                        </Badge>
                                    </IconButton>
                                </MouseOverPopover>
                                <CartModal
                                    openCartModal={openCartModal}
                                    toggleDrawerCartModal={toggleDrawerCartModal}
                                />

                                <Button onClick={handlePopoverToggle} className="!rounded-full">
                                    <Avatar src={avatarUrl || undefined} alt="Avatar" sx={{ width: 32, height: 32 }} />
                                    <span className="text-base ml-1 font-medium normal-case text-black dark:text-white">
                                        {userName}
                                    </span>
                                </Button>
                                <Popper
                                    open={Boolean(popoverAvatar)}
                                    anchorEl={popoverAvatar}
                                    onMouseLeave={handlePopoverClose}
                                    sx={{ zIndex: 60 }}
                                >
                                    <div className="flex flex-col text-sm font-medium rounded bg-white dark:bg-grey-700">
                                        <Link
                                            to={config.Routes.purchaseHistory}
                                            className="hover:bg-primary-50 hover:text-primary-300 p-3 transition"
                                        >
                                            {t('purchaseOrder')}
                                        </Link>
                                        <div
                                            className="hover:bg-primary-50 hover:text-primary-300 p-3 transition"
                                            onClick={handleLogout}
                                        >
                                            {t('logOut')}
                                        </div>
                                    </div>
                                </Popper>
                            </>
                        ) : (
                            <>
                                <Link
                                    to={config.Routes.register}
                                    className="cursor-pointer font-medium hover:text-primary-300 transition"
                                >
                                    <Button sx={{ width: '120px' }}>{t('register')}</Button>
                                </Link>
                                <Link
                                    to={config.Routes.logIn}
                                    className="cursor-pointer font-medium hover:text-primary-300 transition"
                                >
                                    <Button variant="contained" sx={{ width: '120px' }}>
                                        {t('login')}
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="flex lg:hidden items-center justify-center">
                        <Menu fontSize="large" onClick={toggleMenuResponsive(true)} />
                    </div>
                    <SwipeableDrawer
                        anchor={'top'}
                        open={menuResponsive}
                        onClose={toggleMenuResponsive(false)}
                        onOpen={toggleMenuResponsive(true)}
                    >
                        <div className="h-screen py-5 px-7">
                            <div className="flex justify-between items-center mb-10">
                                <span className="text-2xl font-bold tracking-wide">{t('navigation')}</span>
                                <Fab color="error" size="small">
                                    <Close onClick={toggleMenuResponsive(false)} />
                                </Fab>
                            </div>
                            <Search
                                setSearch={setSearch}
                                setDoneSearch={setDoneSearch}
                                placeholder={t('placeholder')}
                                titleButton={t('titleButton')}
                            />
                            <div className="flex flex-col gap-3 my-10">
                                <NavLink to={config.Routes.shop}>
                                    {({ isActive }) => (
                                        <Button size="large" variant={isActive ? 'contained' : 'text'} fullWidth>
                                            {t('product')}
                                        </Button>
                                    )}
                                </NavLink>
                                <NavLink to={config.Routes.cart}>
                                    {({ isActive }) => (
                                        <Button size="large" variant={isActive ? 'contained' : 'text'} fullWidth>
                                            {t('cart')}
                                        </Button>
                                    )}
                                </NavLink>
                                <NavLink to={config.Routes.wishList}>
                                    {({ isActive }) => (
                                        <Button size="large" variant={isActive ? 'contained' : 'text'} fullWidth>
                                            {t('wishList')}
                                        </Button>
                                    )}
                                </NavLink>
                                {checkLogin ? (
                                    <Button size="large" variant="outlined" fullWidth onClick={handleLogout}>
                                        {t('logOut')}
                                    </Button>
                                ) : (
                                    <div className="flex gap-5">
                                        <NavLink to={config.Routes.register} className="w-full">
                                            <Button size="large" variant="outlined" color="success" fullWidth>
                                                {t('register')}
                                            </Button>
                                        </NavLink>
                                        <NavLink to={config.Routes.logIn} className="w-full">
                                            <Button size="large" variant="contained" color="success" fullWidth>
                                                {t('login')}
                                            </Button>
                                        </NavLink>
                                    </div>
                                )}
                            </div>
                        </div>
                    </SwipeableDrawer>
                </div>
            </div>
        </>
    );
}
export default Header;
