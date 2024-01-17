import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../redux/store';
import IBuyHistory from '../../types/IBuyHistory';

interface IInitialState {
    listBill: Array<IBuyHistory>;
}

const initialState: IInitialState = {
    listBill: [],
};

const savedListBill = localStorage.getItem('listBill');

if (savedListBill) {
    initialState.listBill = JSON.parse(savedListBill);
}

export const purchaseHistorySlice = createSlice({
    name: 'purchaseHistory',
    initialState,
    reducers: {
        setAddToBillHistory: (state, action: PayloadAction<IBuyHistory>) => {
            state.listBill.push({ ...action.payload, id: state.listBill.length });
            localStorage.setItem('listBill', JSON.stringify(state.listBill));
        },
        setDeteleBillHistory: (state, action: PayloadAction<number>) => {
            state.listBill = state.listBill.filter((product) => product.id !== action.payload);
            localStorage.setItem('listBill', JSON.stringify(state.listBill));
        },
    },
});

export const { setAddToBillHistory } = purchaseHistorySlice.actions;
export const { setDeteleBillHistory } = purchaseHistorySlice.actions;

export const selectListBillHistory = (state: RootState) => state.purchaseHistory.listBill;

export default purchaseHistorySlice.reducer;
