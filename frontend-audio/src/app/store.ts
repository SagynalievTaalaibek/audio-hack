import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { audioReducer } from '../features/AudioRecorder/audioSlice.ts';

const rootReducer = combineReducers({
  audio: audioReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
