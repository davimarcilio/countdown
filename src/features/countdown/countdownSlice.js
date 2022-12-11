import { createSlice } from '@reduxjs/toolkit'

import moment from 'moment';
moment().format();

export const counterSlice = createSlice({
    name: 'countdown',
    initialState: {
        value: 231312312
    },
    reducers: {
        realTime: (state, { payload }) => {
            return moment(payload).toObject()
        },
    },
})

// Action creators are generated for each case reducer function
export const { realTime } = counterSlice.actions

export default counterSlice.reducer

export const useCountDown = (state) => {
    return state.countdown
}