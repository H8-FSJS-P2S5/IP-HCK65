import {configureStore} from '@reduxjs/toolkit'
import campaignReducer from '../features/campaign/campaignSlice'
import balanceHistoryReducer from '../features/campaign/balanceHistorySlice'
import userReducer from '../features/campaign/userSlice.js'

export default configureStore({
    reducer: {
        campaign: campaignReducer,
        balanceHistory: balanceHistoryReducer,
        user: userReducer,
    },
})