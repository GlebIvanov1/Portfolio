import { configureStore } from "@reduxjs/toolkit";
import settingReducer from '../redux/slices/settingsSlice';
import projectReducer from './slices/ProjectsSlice';
import userReducer from './slices/userSlice';
import verifyPageReducer from './slices/VerifyPageSlice';

export const store = configureStore({
    reducer: {
        setting: settingReducer,
        user: userReducer,
        project: projectReducer,
        verifyPage: verifyPageReducer,
    }
})

export type AppDispatch = typeof store.dispatch;