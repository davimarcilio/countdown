import { configureStore } from '@reduxjs/toolkit'
import countDownReducer from '../countdown/countdownSlice';
const store = configureStore({
    reducer: {
        countdown: countDownReducer
    }
})
export default store
