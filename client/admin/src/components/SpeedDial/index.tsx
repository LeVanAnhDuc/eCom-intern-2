import Settings from '@mui/icons-material/Settings';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Close from '@mui/icons-material/Close';
import LightMode from '@mui/icons-material/LightMode';
import DarkMode from '@mui/icons-material/DarkMode';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import { selectIsTheme, setIsTheme } from './themeSlice';

const SpeedDial = () => {
    const dispatch = useDispatch();
    const { i18n } = useTranslation();
    const { t } = useTranslation('SpeedDial');
    const theme = useSelector(selectIsTheme);

    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [language, setLanguage] = useState<string>(config.Language.english);
    const [mode, setMode] = useState<string>(theme);

    const toggleDrawer = () => {
        setOpenDrawer((prev) => !prev);
    };

    const handleGetLanguage = (event: SelectChangeEvent) => {
        setLanguage(event.target.value as string);
        i18n.changeLanguage(event.target.value as string);
    };

    const handleChangeMode = (value: string) => {
        setMode(value);
    };

    // useEffect(() => {
    //     if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //         setMode('dark');
    //         dispatch(setIsTheme('dark'));
    //     } else {
    //         setMode('light');
    //         dispatch(setIsTheme('light'));
    //     }
    // }, []);

    useEffect(() => {
        if (mode === 'dark') {
            document.documentElement.classList.add('dark');
            dispatch(setIsTheme('dark'));
        } else {
            document.documentElement.classList.remove('dark');
            dispatch(setIsTheme('light'));
        }
    }, [mode]);

    return (
        <>
            <div className="fixed bottom-5 right-5 animate-spin-slow z-40">
                <Fab color="primary" onClick={toggleDrawer}>
                    <Settings />
                </Fab>
            </div>
            <Drawer anchor={'right'} open={openDrawer} onClose={toggleDrawer}>
                <div className="flex justify-between items-center px-5 py-5">
                    <div className="text-2xl font-bold tracking-wide">{t('settings')}</div>
                    <Fab color="error" size="small">
                        <Close onClick={toggleDrawer} />
                    </Fab>
                </div>
                <div className="flex flex-col gap-3 pt-5 px-3 w-screen sm:w-96 ">
                    <div className="text-base font-normal text-gray-600 dark:text-gray-300">{t('language')}</div>
                    <FormControl fullWidth>
                        <InputLabel>{t('language')}</InputLabel>
                        <Select
                            input={<OutlinedInput label={t('language')} />}
                            value={language}
                            onChange={handleGetLanguage}
                            // className="dark:!border-grey-700 dark:bg-grey-800 dark:!text-white"
                        >
                            <MenuItem value={config.Language.vietNam}>{t('vietNam')}</MenuItem>
                            <MenuItem value={config.Language.english}>{t('english')}</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="flex flex-col gap-3 pt-5 px-3">
                    <div className="text-base font-normal text-gray-600 dark:text-gray-300">{t('mode')}</div>
                    <ButtonGroup variant="outlined" size="large">
                        <Button
                            variant={mode === 'dark' ? 'contained' : 'outlined'}
                            fullWidth
                            startIcon={<DarkMode />}
                            onClick={() => handleChangeMode('dark')}
                        >
                            {t('dark')}
                        </Button>
                        <Button
                            variant={mode === 'light' ? 'contained' : 'outlined'}
                            fullWidth
                            startIcon={<LightMode />}
                            onClick={() => handleChangeMode('light')}
                        >
                            {t('light')}
                        </Button>
                    </ButtonGroup>
                </div>
            </Drawer>
        </>
    );
};

export default SpeedDial;
