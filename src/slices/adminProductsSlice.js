import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const url = 'https://vue-course-api.hexschool.io/api/exploreu/admin/products?page=1';

const initialState = {
  products: [],
  isLoading: false
};

export const getProducts = createAsyncThunk('user/getProducts',
  async (param, thunkAPI) => {
    try {
      const res = await axios.get(url, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        }
      });
      return res.data.products;
      
    } catch(err) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
)

const adminProductsSlice = createSlice({
  name: 'adminProducts',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
    }
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    [getProducts.rejected]: (state, action) => {
      state.isLoading = false;
    }
  }
})

export const { clearProducts } = adminProductsSlice.actions;

export default adminProductsSlice.reducer;
