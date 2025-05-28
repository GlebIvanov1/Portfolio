import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
    email: string;
    token: string;
    id: string;
    profileImg: {profileImg: string};
}

const initialState: initialStateType = {
    email: '',
    token: '',
    id: '',
    profileImg: {profileImg: ''}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        removeUser: (state) => {
            state.email = '';
            state.token = '';
            state.id = '';
        },
        setProfileImg: (state, action) => {
            state.profileImg.profileImg = action.payload.profileImg;
        }
    }
})

export const { setUser, removeUser, setProfileImg } = userSlice.actions;
export default userSlice.reducer;