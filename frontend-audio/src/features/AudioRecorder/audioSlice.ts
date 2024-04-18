import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { parseText } from './audioThunks.ts';
import { ParsedTextResponse } from '../../types';
import { RootState } from '../../app/store.ts';

interface AudioState {
  audioBlob: Blob | null;
  parsing: boolean;
  parseText: ParsedTextResponse | null;
  recording: boolean;
}

const initialState: AudioState = {
  audioBlob: null,
  parsing: false,
  parseText: null,
  recording: false,
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    startRecording(state) {
      state.recording = true;
    },
    stopRecording(state, action: PayloadAction<Blob>) {
      state.audioBlob = action.payload;
      state.recording = false;
    },
    clearAudio(state) {
      state.audioBlob = null;
    },
  },
  extraReducers: (builder => (
    builder.addCase(parseText.pending, (state) => {
      state.parsing = true;
    }).addCase(parseText.fulfilled, (state, { payload }) => {
      state.parseText = payload;
      state.parsing = false;
    }).addCase(parseText.rejected, (state) => {
      state.parsing = false;
    })
  )),
});

export const { startRecording, stopRecording, clearAudio } = audioSlice.actions;

export const audioReducer = audioSlice.reducer;
export const selectText = (state: RootState) => state.audio.parseText;