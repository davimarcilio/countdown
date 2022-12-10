import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment';
moment().format();
const nextRocketLaunchDate = moment('2023-01-08T16:30:00.000Z')
const nowDate = moment()

export const counterSlice = createSlice({
    name: 'countdown',
    initialState: {
        value: nextRocketLaunchDate,
    },
    reducers: {
        realTimeDays: (state) => {
            state = nextRocketLaunchDate.diff(nowDate, 'days')
        },
        realTimeHours: (state) => {
            state = nextRocketLaunchDate.diff(nowDate, 'hours')
        },
        realTimeMinutes: (state) => {
            nextRocketLaunchDate.diff(nowDate, 'minutes')
        },
        realTimeSeconds: (state) => {
            state.value = nextRocketLaunchDate.diff(nowDate, 'seconds')
        },
    },
})

// Action creators are generated for each case reducer function
export const { realTimeDays, realTimeHours, realTimeMinutes, realTimeSeconds } = counterSlice.actions

export default counterSlice.reducer