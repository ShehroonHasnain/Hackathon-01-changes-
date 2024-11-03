import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import noteReducer from "./slices/noteSlice"
import commentReducer from "./slices/commentSlice"
export const store = configureStore({
    reducer:{
        noteSlice:noteReducer,
        authSlice:authReducer,
        commentSlice:commentReducer,

    }
})