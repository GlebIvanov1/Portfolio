import { createSlice } from "@reduxjs/toolkit";

interface initialStateType  {
    verifyColdown: number;
}

const initialState: initialStateType = {
    verifyColdown: 0,
}

const VerifyPageSlice = createSlice({
    name: 'verifyPage',
    initialState,
    reducers: {
        setVerifyColdown: (state, action) => {
            state.verifyColdown = action.payload;
        },
        decrementVerifyCooldown: (state) => {  
            console.log(state.verifyColdown);
            
            state.verifyColdown -= 1;
        }
    }
})

export const { setVerifyColdown, decrementVerifyCooldown } = VerifyPageSlice.actions;
export default VerifyPageSlice.reducer;