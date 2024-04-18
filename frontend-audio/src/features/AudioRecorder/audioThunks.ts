import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { TOKEN } from '../../constants.ts';
import { ParsedTextResponse } from '../../types';

export const parseText = createAsyncThunk<ParsedTextResponse, Blob>(
  'audio/parse',
  async (audio) => {
    const formData = new FormData();
    formData.append('audio', audio);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${TOKEN}`
      }
    };

    const response = await axiosApi.post<ParsedTextResponse>('https://asr.ulut.kg/api/receive_data', formData, config);
    console.log(response);
    return response.data;
  }
);
