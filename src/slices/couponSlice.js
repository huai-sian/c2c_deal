import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const url = 'https://vue-course-api.hexschool.io/api/exploreu/order';
const url2 = 'https://vue-course-api.hexschool.io/api/exploreu';

const initialState = {
  user: {
    name: '',
    email: '',
    tel: '',
    address: '',
    payment: 'CVS'
  },
  orderId: '',
  isLoading: false,
  order: {},
  isPaid: false,
};

export const createOrder = createAsyncThunk('order/createOrder',
  async (order, thunkAPI) => {
    try {
      const res = await axios.post(url, {data: order});

      if(res.data.success) {
        return res.data.orderId;
      }
      
    } catch(err) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
)

export const getOrder = createAsyncThunk('order/getOrder',
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`${url}/-NHTMVj4BY-v_qO6xjuI`);

      if(res.data.success) {
        return res.data.order;
      }
      
    } catch(err) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
)

export const completePay = createAsyncThunk('order/completePay',
  async (id, thunkAPI) => {
    try {
      const res = await axios.post(`${url2}/pay/-NHTMVj4BY-v_qO6xjuI`);

      if(res.data.success) {
        return res.data.success;
      }
      
    } catch(err) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
)

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: {
    [createOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [createOrder.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.orderId = action.payload;
      console.log(state.orderId);
      localStorage.removeItem('cart');
    },
    [createOrder.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [getOrder.pending]: (state) => {
      state.isLoading = true;
      console.log(state.isLoading);
    },
    [getOrder.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.order = action.payload;
      console.log(state.order);
    },
    [getOrder.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [completePay.pending]: (state) => {
      state.isLoading = true;
      console.log(state.isLoading);
    },
    [completePay.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isPaid = action.payload;
      console.log(action.payload);
    },
    [completePay.rejected]: (state, action) => {
      state.isLoading = false;
    },
  }
})

export const { updateLoading } = orderSlice.actions;

export default orderSlice.reducer;
