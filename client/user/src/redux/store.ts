import { configureStore } from '@reduxjs/toolkit';

import loginSlice from '../pages/LogIn/loginSlice';
import themeSlice from '../components/SpeedDial/themeSlice';
import cartSlice from '../pages/Cart/cartSlice';
import wishListSlice from '../pages/WishList/wishListSlice';
import purchaseHistorySlice from '../pages/PurchaseHistory/purchaseHistorySlice';

const store = configureStore({
    reducer: {
        login: loginSlice,
        theme: themeSlice,
        cart: cartSlice,
        wishList: wishListSlice,
        purchaseHistory: purchaseHistorySlice,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
