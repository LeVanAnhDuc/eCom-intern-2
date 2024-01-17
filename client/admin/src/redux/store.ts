import { configureStore } from '@reduxjs/toolkit';

import loginSlice from '../pages/LogIn/loginSlice';
import themeSlice from '../components/SpeedDial/themeSlice';

const store = configureStore({
    reducer: {
        login: loginSlice,
        theme: themeSlice,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
