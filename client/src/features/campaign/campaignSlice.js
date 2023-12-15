import {createSlice} from '@reduxjs/toolkit'

export const campaignSlice = createSlice({
    name: 'campaign',
    initialState: {
        list: [],
        detail: {},
    },
    reducers: {
        setListCampaign: (state, action) => {
            state.list = action.payload
        },
        setDetailCampaign: (state, action) => {
            state.detail = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {setListCampaign, setDetailCampaign} = campaignSlice.actions

export default campaignSlice.reducer