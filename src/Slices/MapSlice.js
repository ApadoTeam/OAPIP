import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const API_URL = 'https://dapi.kakao.com/v2/local/search/keyword.json';
const API_KEY = 'bb10b2a5cc7da58fb075c6b428ff9ed1';

export const getMapInfo = createAsyncThunk('map/getMapInfo', async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    result = await axios.get(API_URL, {
      params: {
        query: payload.query ? payload.query : '', //빈문자열을 기본값으로 해서 일부러 오류 발생
        page: payload.page ? payload.page : 1,
        size: payload.size ? payload.size : 20,
      },

      headers: { Authorization: `KakaoAK ${API_KEY}` },
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
    meta: null,
    same_name: null,
    documents: null,
    loading: false,
    error: null,
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
        meta: payload?.data?.meta,
        same_name: payload?.data?.same_name,
        documents: payload?.data?.documents,
        loading: false,
        error: null
      }
    },
    [getMapInfo.rejected]: (state, { payload }) => {
      return {
        meta: null,
        same_name: null,
        documents: null,
        loading: false,
        toggle: +true,
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