import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getMapInfo = createAsyncThunk('map/getMapInfo', async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    result = await axios.get(`https://dapi.kakao.com/v2/local/search/address.json`, {
      header: { Authorization: '8dd322609444f19d7248550cf5fba7a2' },
  });
  } catch (err) {
    result = rejectWithValue(err.response);
  }

  return result;
});

const MapSlice = createSlice({
  name: 'map',
  initialState: {
    toggle: +true,
  },
  reducers: {
    toggleBtn: (state, action) => {
      let fls = action.payload;
      if (state.toggle === +true) {
        return {toggle: fls};
      } else {
        return {toggle: +true}
      }
    }
  },
  extraReducers: {
    [getMapInfo.pending]: (state, { payload }) => {
      return { ...state, loading: true }
    },
    [getMapInfo.fulfilled]: (state, { payload }) => {
      return {
        data: payload?.data,
        loading: false,
        error: null
      }
    },
    [getMapInfo.rejected]: (state, { payload }) => {
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

export const { toggleBtn } = MapSlice.actions;

export default MapSlice.reducer;