import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://vue-course-api.hexschool.io/api/exploreu/products/all';
const url2 = 'https://vue-course-api.hexschool.io/api/exploreu/product';

const initialState = {
  products: [],
  product: [],
  allSeries: [],
  currentSeries: '全部商品',
  isLoading: false,
  wish: [],
  wishLength: 0,
  relatedProducts: [],
  productId: '',
};

export const getProducts = createAsyncThunk('products/getProducts',
  async (page, thunkAPI) => {
    try {
      const res = await axios.get(url);
      
      if(res.data.success) {
        return res.data.products;
      }
      
    } catch(err) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
)

export const getProduct = createAsyncThunk('products/getProduct',
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`${url2}/${id}`);
      if(res.data.success) {
        return res.data.product;
      }
    } catch(err) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    renderSeriesList: (state) => {
      
    },
    updateWish: (state, action) => {
      console.log('dispatch');
      let wishIndex = -1;
      if(state.wish.length > 0) {
        state.wish.forEach((item, index) => {
          if (item.id === action.payload.id) {
            wishIndex = index
          }
        })
      }
      if(wishIndex === -1) {
        state.wish.push(action.payload)
      } else {
        state.wish.splice(wishIndex, 1)
      }
      localStorage.setItem('wish', JSON.stringify(state.wish));
      state.wish = JSON.parse(localStorage.getItem('wish')) || [];
    },
    getWishLength: (state) => {
      state.wishLength = state.wish.length;
    },
    getWishFromLocal: (state) => {
      state.wish = JSON.parse(localStorage.getItem('wish')) || [];
    },
    deleteWish: (state, action) => {
      let wishIndex = -1;
      state.wish.forEach((item, index) => {
        if (item.id === action.payload.id) {
          wishIndex = index
        }
      })
      state.wish.splice(wishIndex, 1);
      localStorage.setItem('wish', JSON.stringify(state.wish));
    },
    getCurrentSeries: (state, action) => {
      state.currentSeries = action.payload;
    }
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      if(state.currentSeries !== '全部商品') {
        state.products = action.payload.filter((item) => item.category === state.currentSeries);
      } else {
        state.products = action.payload;
      }
      action.payload.forEach((item) => state.allSeries.push(item.category));
      let tempSeries = [];
      tempSeries = state.allSeries.filter((item, i, arr) => arr.indexOf(item) === i);
      state.allSeries = ['全部商品', ...tempSeries];
    },
    [getProducts.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [getProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [getProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.productId = action.payload.id;
      state.relatedProducts = state.products.filter(item => (item.id !== state.productId) && (item.category == state.product.category))
    },
    [getProduct.rejected]: (state, action) => {
      state.isLoading = false;
    },
  }
})

export const { renderSeriesList, updateWish, getWishLength, getWishFromLocal, deleteWish, getCurrentSeries } = productsSlice.actions;

export default productsSlice.reducer;

