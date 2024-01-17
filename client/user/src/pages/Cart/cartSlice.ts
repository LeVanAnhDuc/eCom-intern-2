import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../redux/store';
import { IProduct } from '../../types/IProduct';

interface IInitialState {
    total: number;
    listProductInCart: Array<IProduct>;
}

const initialState: IInitialState = {
    total: 0,
    listProductInCart: [],
};

const savedTotal = localStorage.getItem('totalProductInCart');
const savedListProductInCart = localStorage.getItem('listProductInCart');
if (savedTotal) {
    initialState.total = JSON.parse(savedTotal);
}
if (savedListProductInCart) {
    initialState.listProductInCart = JSON.parse(savedListProductInCart);
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setClearProductInCart: (state, action: PayloadAction<boolean>) => {
            if (action.payload) {
                state.listProductInCart = [];
                state.total = 0;
                localStorage.setItem('listProductInCart', JSON.stringify(state.listProductInCart));
                localStorage.setItem('totalProductInCart', JSON.stringify(state.total));
            }
        },
        setAddProductToCart: (state, action: PayloadAction<IProduct>) => {
            const isDuplicate = state.listProductInCart.some((product) => product.id === action.payload.id);

            if (!isDuplicate) {
                state.listProductInCart.push({ ...action.payload, totalPrice: action.payload.price, quantity: 1 });
            } else {
                const listProductNew = state.listProductInCart.map((item) =>
                    item.id === action.payload.id ? { ...item, quantity: item.quantity ? item.quantity + 1 : 1 } : item,
                );
                state.listProductInCart = listProductNew;
            }
            state.total += 1;
            localStorage.setItem('totalProductInCart', JSON.stringify(state.total));
            localStorage.setItem('listProductInCart', JSON.stringify(state.listProductInCart));
        },
        setDeteleToCart: (state, action: PayloadAction<number>) => {
            const isDuplicate = state.listProductInCart.filter((product) => product.id === action.payload);

            if (isDuplicate.length !== 0) {
                state.listProductInCart = state.listProductInCart.filter((product) => product.id !== action.payload);
                state.total -= isDuplicate[0].quantity || 1;
            }
            if (state.total < 0) {
                state.total = 0;
            }
            localStorage.setItem('totalProductInCart', JSON.stringify(state.total));
            localStorage.setItem('listProductInCart', JSON.stringify(state.listProductInCart));
        },
        setQuantityProductInCart: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            state.listProductInCart = state.listProductInCart.map((product) => {
                if (product.id === action.payload.id) {
                    state.total = state.total - (product.quantity || 1) + action.payload.quantity;
                    return {
                        ...product,
                        quantity: action.payload.quantity,
                        totalPrice: action.payload.quantity * product.price,
                    };
                }
                return product;
            });
            if (state.total < 0) {
                state.total = 0;
            }
            localStorage.setItem('totalProductInCart', JSON.stringify(state.total));
            localStorage.setItem('listProductInCart', JSON.stringify(state.listProductInCart));
        },
    },
});

export const { setClearProductInCart } = cartSlice.actions;
export const { setAddProductToCart } = cartSlice.actions;
export const { setDeteleToCart } = cartSlice.actions;
export const { setQuantityProductInCart } = cartSlice.actions;

export const selectToTalProductCart = (state: RootState) => state.cart.total;
export const selectListProductCart = (state: RootState) => state.cart.listProductInCart;

export default cartSlice.reducer;
