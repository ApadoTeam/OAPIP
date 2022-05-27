import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const postJoin = createAsyncThunk('join/postJoin', async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    result = await axios.post('http://localhost:3001/userInfo');
  } catch (err) {
    result = rejectWithValue(err.response);
  }

  return result;
});

const JoinSlice = createSlice({
  name: 'join',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: {
    [postJoin.pending]: (state, { payload }) => {
      return { ...state, loading: true }
    },
    [postJoin.fulfilled]: (state, { payload }) => {
      return {
        data: payload?.data,
        loading: false,
        error: null
      }
    },
    [postJoin.rejected]: (state, { payload }) => {
      return {
        data: payload?.data,
        loading: false,
        error: {
          code: payload?.status ? payload.status : 500,
          message: payload?.statusText ? payload.statusText : 'Server Error'
        }
      }
    }
  },
});

export default JoinSlice.reducer;