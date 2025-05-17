import { createSlice } from "@reduxjs/toolkit";

interface settingSliceType {
    email: string;
    phone: string;
    userInputValue: string;
    isLoading: boolean; 
}

const initialState: settingSliceType = {
    email: 'glebivanov@gmail.com',
    phone: '+79774116351',
    userInputValue: '',
    isLoading: false
}

export const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        userInputValueSet: (state, action) => {
            state.userInputValue = action.payload;
        },
        isLoadingSet: (state, action) => {
            state.isLoading = action.payload;
        }
    }
});

export default settingSlice.reducer;
export const { userInputValueSet, isLoadingSet } = settingSlice.actions;