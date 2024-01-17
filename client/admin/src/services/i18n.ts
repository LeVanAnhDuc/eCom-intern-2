import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import * as en from '../locales/en';
import * as vi from '../locales/vi';

export const resources = {
    en: {
        home: en.HOME_EN,
        login: en.LOGIN_EN,
        SpeedDial: en.DIALOG_EN,
        header: en.HEADER_EN,
        sideBar: en.SIDEBAR_EN,
        listProduct: en.LISTPRODUCT_EN,
        detailProduct: en.DETAILPRODUCT_EN,
        error404: en.ERROR404_EN,
    },
    vi: {
        home: vi.HOME_VI,
        login: vi.LOGIN_VI,
        SpeedDial: vi.DIALOG_VI,
        header: vi.HEADER_VI,
        sideBar: vi.SIDEBAR_VI,
        listProduct: vi.LISTPRODUCT_VI,
        detailProduct: vi.DETAILPRODUCT_VI,
        error404: vi.ERROR404_VI,
    },
} as const;

export const defaultNS = 'home';

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    ns: ['home', 'login', 'SpeedDial', 'header', 'sideBar', 'listProduct', 'detailProduct', 'error404'],
    defaultNS,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
