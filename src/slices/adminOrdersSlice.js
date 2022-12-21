import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const url = 'https://vue-course-api.hexschool.io/api/exploreu/admin/orders';

const initialState = {
  orders: [],
  isLoading: false,
  pagination: ''
};

export const getOrders = createAsyncThunk('user/getOrders',
  async (page, thunkAPI) => {
    try {
      const res = await axios.get(`${url}?page=${page}`, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        }
      });
      res.data.orders.splice(0, 1);
      return res.data;
    } catch(err) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
)

const adminOrdersSlice = createSlice({
  name: 'adminOrders',
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
    }
  },
  extraReducers: {
    [getOrders.pending]: (state) => {
      state.isLoading = true;
    },
    [getOrders.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.orders = action.payload.orders;
      console.log(state.orders);
      state.pagination = action.payload.pagination;
    },
    [getOrders.rejected]: (state, action) => {
      state.isLoading = false;
    }
  }
})

export const { clearOrders } = adminOrdersSlice.actions;

export default adminOrdersSlice.reducer;
