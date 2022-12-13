import { createSlice } from '@reduxjs/toolkit'

import moment from 'moment';
moment().format();

export const counterSlice = createSlice({
    name: 'countdown',
    initialState: {
        value: {
            years: 0,
            months: 0,
            date: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
        },
        loading: true,
        modal: false
    },
    reducers: {
        realTime: (state, { payload }) => {
            state.value = moment(payload).utc().toObject()
        },
        loadingState: (state, { payload }) => {
            state.loading = payload
        },
        modalState: (state, { payload }) => {
            state.modal = payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { realTime, loadingState, modalState } = counterSlice.actions

export default counterSlice.reducer

export const useCountDown = (state) => {
    return state.countdown
}