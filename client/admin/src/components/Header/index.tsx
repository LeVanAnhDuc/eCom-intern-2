import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Popper from '@mui/material/Popper';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Fab from '@mui/material/Fab';
import Menu from '@mui/icons-material/Menu';
import Close from '@mui/icons-material/Close';

import config from '../../config';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { selectUserName, setIsLogin } from '../../pages/LogIn/loginSlice';

function Header() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation('header');

    const userName = useAppSelector(selectUserName);
    const avatarUrl = '';

    const [popover, setPopover] = useState<HTMLElement | null>(null);
    const [menuResponsive, setMenuResponsive] = useState<boolean>(false);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userName');
        dispatch(setIsLogin(false));
        navigate(config.Routes.logIn);
        handlePopoverClose();
    };

    const handlePopoverToggle = (event: React.MouseEvent<HTMLElement>) => {
        setPopover(popover ? null : event.currentTarget);
    };
    const handlePopoverClose = () => {
        setPopover(null);
    };
    const openPopover = Boolean(popover);

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

    return (
        <header className="h-20 mx-5">
            <div className="flex justify-end lg:justify-between items-center h-full">
                <div className="hidden lg:flex items-center gap-5 justify-end  w-full">
                    <Button onClick={handlePopoverToggle}>
                        <Avatar src={avatarUrl || undefined} alt="Avatar" sx={{ width: 32, height: 32 }} />
                        <span className="text-base ml-1 font-medium normal-case text-black dark:text-white">
                            {userName}
                        </span>
                    </Button>
                    <Popper
                        open={openPopover}
                        anchorEl={popover}
                        onMouseLeave={handlePopoverClose}
                        sx={{ zIndex: 60, minWidth: '130px' }}
                    >
                        <div className="flex flex-col text-sm font-medium !rounded-lg bg-primary-100 dark:bg-primary-600 ">
                            <div
                                className="hover:bg-primary-200 dark:hover:bg-primary-500 dark:hover:text-grey-100 p-3 transition !rounded-lg"
                                onClick={handleLogout}
                            >
                                {t('logOut')}
                            </div>
                        </div>
                    </Popper>
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

                        <div className="flex flex-col gap-3 my-10">
                            <Button size="large" variant="outlined" fullWidth onClick={handleLogout}>
                                {t('logOut')}
                            </Button>
                        </div>
                    </div>
                </SwipeableDrawer>
            </div>
        </header>
    );
}
export default Header;
