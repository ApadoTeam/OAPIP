import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getCommnet = createAsyncThunk('comment/getCommnet', async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    result = await axios.get('http://localhost:3001/comment');

    if(result.data.faultInfo !== undefined) {
      const err = new Error();
      err.reponse = { status: 500, statusText: result.data.faultInfo.message };
      throw err;
    };

  } catch (err) {
    result = rejectWithValue(err.response);
  }

  return result;
});

const CommentSlice = createSlice({
  name: 'comment',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: {
    [getCommnet.pending]: (state, { payload }) => {
      return { ...state, loading: true }
    },
    [getCommnet.fulfilled]: (state, { payload }) => {
      return {
        data: payload?.data,
        loading: false,
        error: null
      }
    },
    [getCommnet.rejected]: (state, { payload }) => {
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

export default CommentSlice.reducer;