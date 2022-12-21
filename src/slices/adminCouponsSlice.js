import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
const Swal = require('sweetalert2');

const url = 'https://vue-course-api.hexschool.io/api/exploreu/admin/coupons?page=1';
const url2 = 'https://vue-course-api.hexschool.io/api/exploreu/admin/coupon';

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

export const addCoupon = createAsyncThunk('user/addCoupon',
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(url2, { data });
      const resCoupons = await axios.get(url, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        }
      });
      Swal.fire(
        '',
        `${res.data.message}`,
        'info',
      );
      return resCoupons.data.coupons
    } catch(err) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
)

export const editCoupon = createAsyncThunk('user/editCoupon',
  async (data, thunkAPI) => {
    try {
      const res = await axios.put(`${url2}/${data.id}`, { data });
      const resCoupons = await axios.get(url, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        }
      });
      Swal.fire(
        '',
        `${res.data.message}`,
        'info',
      );
      return resCoupons.data.coupons
      
    } catch(err) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
)

export const deleteCoupon = createAsyncThunk('user/deleteCoupon',
  async (data, thunkAPI) => {
    try {
      const res = await axios.delete(`${url2}/${data.id}`);
      const resCoupons = await axios.get(url, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        }
      });
      Swal.fire(
        '',
        `${res.data.message}`,
        'info',
      );
      return resCoupons.data.coupons
      
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
    },
    [addCoupon.pending]: (state) => {
      state.isLoading = true;
    },
    [addCoupon.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.coupons = action.payload;
    },
    [addCoupon.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [editCoupon.pending]: (state) => {
      state.isLoading = true;
    },
    [editCoupon.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.coupons = action.payload;
    },
    [editCoupon.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [deleteCoupon.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteCoupon.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.coupons = action.payload;
    },
    [deleteCoupon.rejected]: (state, action) => {
      state.isLoading = false;
    },
  }
})

export const { clearCoupons } = adminCouponsSlice.actions;

export default adminCouponsSlice.reducer;
