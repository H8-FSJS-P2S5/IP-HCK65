import {createSlice} from '@reduxjs/toolkit'

export const campaignSlice = createSlice({
    name: 'campaign',
    initialState: {
        list: [],
    },
    reducers: {
        setListCampaign: (state, action) => {
            state.list = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {setListCampaign} = campaignSlice.actions

export default campaignSlice.reducer