import {createSlice} from '@reduxjs/toolkit'

export const balanceHistorySlice = createSlice({
    name: 'balanceHistory',
    initialState: {
        list: [],
    },
    reducers: {
        setListBalanceHistory: (state, action) => {
            state.list = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {setListBalanceHistory} = balanceHistorySlice.actions

export default balanceHistorySlice.reducer