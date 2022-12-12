import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const url = 'https://vue-course-api.hexschool.io/api/exploreu/admin/orders?page=1';

const initialState = {
  orders: [],
  isLoading: false
};

export const getOrders = createAsyncThunk('user/getOrders',
  async (param, thunkAPI) => {
    try {
      const res = await axios.get(url, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        }
      });
      console.log(res.data.orders);
      return res.data.orders;
      
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
      state.orders = action.payload;
    },
    [getOrders.rejected]: (state, action) => {
      state.isLoading = false;
    }
  }
})

export const { clearOrders } = adminOrdersSlice.actions;

export default adminOrdersSlice.reducer;
