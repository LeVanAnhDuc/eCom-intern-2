import Divider from '@mui/material/Divider';
import Home from '@mui/icons-material/Home';
import Inventory from '@mui/icons-material/Inventory';
import Logout from '@mui/icons-material/Logout';
import ArrowLeft from '@mui/icons-material/ArrowLeft';
import Menu from '@mui/icons-material/Menu';

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import ButtonSideBar from '../ButtonSideBar';
import { setIsLogin } from '../../pages/LogIn/loginSlice';

const Navbar = () => {
    const { t } = useTranslation('sideBar');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userName');
        dispatch(setIsLogin(false));
        navigate(config.Routes.logIn);
    };

    const [toggleSideBar, setToggleSideBar] = useState<boolean>(false);
    const handleChangeToggleSideBar = useCallback(() => {
        setToggleSideBar((prev) => !prev);
    }, []);

    return (
        <>
            <motion.div
                className="relative h-full bg-primary-200 dark:bg-primary-700 rounded-tr-[2.5rem] rounded-br-[2.5rem] overflow-y-auto scroll-smooth hide-scrollbar"
                initial={{ width: 300 }}
                animate={{ width: toggleSideBar ? 100 : 300 }}
            >
                {!toggleSideBar ? (
                    <div className="flex justify-between items-center ml-7">
                        <Link
                            to={config.Routes.home}
                            className={`${
                                toggleSideBar ? 'text-transparent cursor-default' : 'hover:text-grey-500'
                            } flex justify-center px-3 py-5 tracking-widest uppercase text-4xl font-serif font-semibold transition`}
                        >
                            leduc
                        </Link>
                        <div onClick={handleChangeToggleSideBar} className=" bg-transparent p-1 rounded-3xl h-full">
                            <ArrowLeft className="!text-5xl hover:!opacity-60 cursor-pointer" />
                        </div>
                    </div>
                ) : (
                    <div className="flex place-content-center m-auto w-full px-3 py-5">
                        <Menu
                            onClick={handleChangeToggleSideBar}
                            className="text-center !text-4xl hover:!opacity-60 cursor-pointer"
                        />
                    </div>
                )}
                <div className="flex flex-col gap-80">
                    <div>
                        <Divider variant="middle" className="!mb-7" />
                        <nav className="flex flex-col gap-2 ">
                            <NavLink to={config.Routes.home}>
                                {({ isActive }) => (
                                    <>
                                        <ButtonSideBar
                                            isActive={isActive}
                                            content={t('home')}
                                            startIcon={<Home />}
                                            toggleSideBar={toggleSideBar}
                                        />
                                    </>
                                )}
                            </NavLink>
                            <NavLink to={config.Routes.listProducts}>
                                {({ isActive }) => (
                                    <>
                                        <ButtonSideBar
                                            isActive={isActive}
                                            content={t('product')}
                                            startIcon={<Inventory fontSize="small" />}
                                            toggleSideBar={toggleSideBar}
                                        />
                                    </>
                                )}
                            </NavLink>
                            <Divider variant="middle" className="!mt-7" />
                        </nav>
                    </div>
                    <ButtonSideBar
                        content={t('logOut')}
                        startIcon={<Logout />}
                        toggleSideBar={toggleSideBar}
                        onClick={handleLogout}
                    />
                </div>
            </motion.div>
        </>
    );
};

export default Navbar;
