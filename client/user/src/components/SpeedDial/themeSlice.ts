import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../redux/store';

// Define a type for the slice state
interface IInitialStateSpeedDial {
    theme: string;
}

// Define the initial state using that type
const initialState: IInitialStateSpeedDial = {
    theme: 'light',
};
const savedIsTheme = localStorage.getItem('theme');
if (savedIsTheme) {
    initialState.theme = savedIsTheme;
}

export const themeSlice = createSlice({
    name: 'SpeedDial',
    initialState,
    reducers: {
        setIsTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload;
            localStorage.setItem('theme', action.payload);
        },
    },
});

export const { setIsTheme } = themeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsTheme = (state: RootState) => state.theme.theme;

export default themeSlice.reducer;
