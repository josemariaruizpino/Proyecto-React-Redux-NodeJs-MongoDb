import {configureStore} from '@reduxjs/toolkit';
import {homeInfoSlice} from './slices/homeInfo.slice';
import {eventsSlice} from './slices/events.slice';

export const store = configureStore({
    reducer:{
        data: homeInfoSlice.reducer,
        events: eventsSlice.reducer
    }
})