import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const url = 'https://vue-course-api.hexschool.io/api/exploreu/admin/coupons?page=1';

const initialState = {
  coupons: [],
  isLoading: false
};

export const getCoupons = createAsyncThunk('user/getCoupons',
  async (param, thunkAPI) => {
    try {
      const res = await axios.get(url, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        }
      });
      console.log(res.data.coupons);
      return res.data.coupons;
      
    } catch(err) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
)

const adminCouponsSlice = createSlice({
  name: 'adminCoupons',
  initialState,
  reducers: {
    clearCoupons: (state) => {
      state.coupons = [];
    }
  },
  extraReducers: {
    [getCoupons.pending]: (state) => {
      state.isLoading = true;
    },
    [getCoupons.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.coupons = action.payload;
    },
    [getCoupons.rejected]: (state, action) => {
      state.isLoading = false;
    }
  }
})

export const { clearCoupons } = adminCouponsSlice.actions;

export default adminCouponsSlice.reducer;
