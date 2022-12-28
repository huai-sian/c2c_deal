import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
const Swal = require('sweetalert2');

const url = `https://vue-course-api.hexschool.io/api/exploreu/admin/products`;
const url2= 'https://vue-course-api.hexschool.io/api/exploreu/admin/product';

const initialState = {
  products: [],
  isLoading: false,
  pagination: '',
};

export const getProducts = createAsyncThunk('user/getProducts',
  async (page, thunkAPI) => {
    try {
      const res = await axios.get(`${url}?page=${page}`, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        }
      });
      return res.data;
      
    } catch(err) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
)

export const editProduct = createAsyncThunk('user/editProduct',
  async (data, thunkAPI) => {
    try {
      const res = await axios.put(`${url2}/${data.data.id}`, data, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        }
      });
      const resProducts = await axios.get(`${url}?page=1`, {
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
      return resProducts.data;
    } catch(err) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
)

export const addProduct = createAsyncThunk('user/addProduct',
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${url2}`, data, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        }
      });
      const resProducts = await axios.get(`${url}?page=1`, {
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
      return resProducts.data;

    } catch(err) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
)

export const deleteProduct = createAsyncThunk('user/deleteProduct',
  async (data, thunkAPI) => {
    try {
      const res = await axios.delete(`${url2}/${data.id}`, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        }
      });
      const resProducts = await axios.get(`${url}?page=1`, {
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
      return resProducts.data;

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
      state.products = action.payload.products;
      state.pagination = action.payload.pagination;
    },
    [getProducts.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [editProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [editProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload.products;
      state.pagination = action.payload.pagination;
    },
    [editProduct.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [deleteProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload.products;
      state.pagination = action.payload.pagination;
    },
    [deleteProduct.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [addProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload.products;
      state.pagination = action.payload.pagination;
    },
    [addProduct.rejected]: (state, action) => {
      state.isLoading = false;
    },
  }
})

export const { clearProducts } = adminProductsSlice.actions;

export default adminProductsSlice.reducer;
