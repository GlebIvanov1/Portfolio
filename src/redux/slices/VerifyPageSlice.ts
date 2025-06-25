import { createSlice } from "@reduxjs/toolkit";

interface initialStateType  {
    verifyColdown: number;
    verifyPageOpen: boolean;
}

const initialState: initialStateType = {
    verifyColdown: 0,
    verifyPageOpen: false
}

const VerifyPageSlice = createSlice({
    name: 'verifyPage',
    initialState,
    reducers: {
        setVerifyPageOpen: (state, action) => {
            state.verifyPageOpen = action.payload;
        },
        setVerifyColdown: (state, action) => {
            state.verifyColdown = action.payload;
        },
        decrementVerifyCooldown: (state) => {  
            state.verifyColdown -= 1;
        }
    }
})

export const { setVerifyColdown, decrementVerifyCooldown, setVerifyPageOpen } = VerifyPageSlice.actions;
export default VerifyPageSlice.reducer;