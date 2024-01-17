import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../redux/store';
import { IProduct } from '../../types/IProduct';

interface IInitialState {
    totalWishList: number;
    listWishList: Array<IProduct>;
}

const initialState: IInitialState = {
    totalWishList: 0,
    listWishList: [],
};
const savedTotalWishList = localStorage.getItem('totalWishList');
const savedWishList = localStorage.getItem('wishList');

if (savedTotalWishList) {
    initialState.totalWishList = JSON.parse(savedTotalWishList);
}
if (savedWishList) {
    initialState.listWishList = JSON.parse(savedWishList);
}

export const wishListSlice = createSlice({
    name: 'wishList',
    initialState,
    reducers: {
        setAddProductToWishList: (state, action: PayloadAction<IProduct>) => {
            const isDuplicate = state.listWishList.some((product) => product.id === action.payload.id);

            if (!isDuplicate) {
                state.listWishList.push({ ...action.payload, totalPrice: action.payload.price });
                state.totalWishList += 1;
            }
            localStorage.setItem('wishList', JSON.stringify(state.listWishList));
            localStorage.setItem('totalWishList', JSON.stringify(state.totalWishList));
        },
        setDeteleProductInWishList: (state, action: PayloadAction<number>) => {
            const isDuplicate = state.listWishList.some((product) => product.id === action.payload);

            if (isDuplicate) {
                state.listWishList = state.listWishList.filter((product) => product.id !== action.payload);
                state.totalWishList -= 1;
            }

            localStorage.setItem('wishList', JSON.stringify(state.listWishList));
            localStorage.setItem('totalWishList', JSON.stringify(state.totalWishList));
        },
    },
});

export const { setAddProductToWishList } = wishListSlice.actions;
export const { setDeteleProductInWishList } = wishListSlice.actions;

export const selectToTalWishList = (state: RootState) => state.wishList.totalWishList;
export const selectListWishList = (state: RootState) => state.wishList.listWishList;

export default wishListSlice.reducer;
