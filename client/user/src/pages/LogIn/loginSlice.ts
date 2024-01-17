import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../redux/store';

// Define a type for the slice state
interface IInitialStateLogin {
    isLogin: boolean;
    userName: string;
}

// Define the initial state using that type
const initialState: IInitialStateLogin = {
    isLogin: false,
    userName: '',
};

const savedIsLogin = localStorage.getItem('isLogin');
const savedUserName = localStorage.getItem('userName');
if (savedIsLogin) {
    initialState.isLogin = JSON.parse(savedIsLogin);
}
if (savedUserName) {
    initialState.userName = JSON.parse(savedUserName);
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setIsLogin: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload;
            localStorage.setItem('isLogin', JSON.stringify(action.payload));
        },
        setUserName: (state, action: PayloadAction<string>) => {
            state.userName = action.payload;
            localStorage.setItem('userName', JSON.stringify(action.payload));
        },
    },
});

export const { setIsLogin } = loginSlice.actions;
export const { setUserName } = loginSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsLogin = (state: RootState) => state.login.isLogin;
export const selectUserName = (state: RootState) => state.login.userName;

export default loginSlice.reducer;
