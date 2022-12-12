import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://vue-course-api.hexschool.io/api/exploreu/cart';
const url2 = 'https://vue-course-api.hexschool.io/api/exploreu/coupon';
const url3 = 'https://vue-course-api.hexschool.io/api/exploreu/order';

const initialState = {
  isLoading: false,
  cartApi: [],
  cartlength: 0,
  cart: [],
  total: 0,
  addToCart: false,
  couponSuccess: false,
  orderId: '',
};

export const getCart = createAsyncThunk('cart/getCart',
  async (page, thunkAPI) => {
    try {
      const res = await axios.get(url);
      
      if(res.data.success) {
        return res.data.data;
      }
      
    } catch(err) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
)

export const confirmCart = createAsyncThunk('cart/confirmCart',
  async (cart, thunkAPI) => {
    try {
      const cartinfo = {
        product_id: cart.id,
        qty: cart.qty
      }
      const res = await axios.post(url, {data: cartinfo});
      if(res.data.success) {
        return 'success'
      } else {
        return 'failed'
      }
    } catch(err) {
      console.log(err);
    }
  }
)

export const createOrder = createAsyncThunk('cart/createOrder',
  async (order, thunkAPI) => {
    try {
      const res = await axios.post(url3, {data: order});

      if(res.data.success) {
        return res.data.orderId;
      }
      
    } catch(err) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
)

export const deleteCart = createAsyncThunk('cart/deleteCart',
  async (item, thunkAPI) => {
    try {
      const res = await axios.delete(`${url}/${item.id}`);
      if(res.data.success) {
        return 'success'
      } else {
        return 'failed'
      }
    } catch(err) {
      console.log(err);
    }
  }
)

export const addCouponCode = createAsyncThunk('cart/addCouponCode',
  async (couponNum, thunkAPI) => {
    const coupon = { code: couponNum };
    try {
      const res = await axios.post(url2, { data: coupon });
      if(res.data.success) {
        return true;
      } else {
        return false;
      }
      
    } catch(err) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addTocart: (state, action) => {
      let productIndex = -1;
      if (state.cart.length > 0) {
        state.cart.forEach((item, index) => {
          if (item.id === action.payload.product.id) {
            productIndex = index
          }
        })
      }
      if (productIndex === -1) {
        const total = parseInt((action.payload.product.origin_price * action.payload.qty), 10)
        let tempProduct = { ...action.payload.product }
        tempProduct.qty = parseInt(action.payload.qty, 10);
        tempProduct.total = total
        state.cart.push(tempProduct)
      } else {
        let tempProduct =  { ...state.cart[productIndex]}
        tempProduct.qty += parseInt(action.payload.qty, 10);
        const total = parseInt((action.payload.product.origin_price * action.payload.qty), 10)
        tempProduct.total += total
        state.cart.splice(productIndex, 1)
        state.cart.push(tempProduct)
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    changeCartnum: (state, action) => {
      // action.payload.product
      // action.payload.qty
      let productIndex;
      let num = action.payload.qty;
      if(state.cart.length > 0) {
        state.cart.forEach((item, idx) => {
          if(item.id === action.payload.product.id) {
            productIndex = idx;
          }
        })
      }
      if(action.payload.qty >= 10) {
        num = 10;
        state.cart[productIndex].qty = num;
      } else if(action.payload.qty <= 1) {
        num = 1;
        state.cart[productIndex].qty = num;
      } else {
        num = action.payload.qty;
        state.cart[productIndex].qty = num;
      }
      const total = parseInt((state.cart[productIndex].origin_price * state.cart[productIndex].qty), 10);
      state.cart[productIndex].total = total;
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    getCartLength: (state) => {
      state.cartlength = 0
      state.cart.forEach(item =>{
        state.cartlength += parseInt(item.qty, 10);
      })
    },
    getCartTotal: (state) => {
      state.total = 0
      state.cart.forEach((item) => {
        state.total += item.total
      })
    },
    pushToCart: (state, action) => {
      state.cart.push(action.payload)
    },
    removeCart: (state, action) => {
      let removingIndex = -1
      if (state.cart.length > 0) {
        state.cart.forEach((item, index) => {
          if (item.id === action.payload.id) {
            removingIndex = index
          }
        })
      }
      state.cart.splice(removingIndex, 1) 
    },
    updateCart: (state) => {
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    getCartLocal: (state) => {
      state.cart = JSON.parse(localStorage.getItem('cart')) || []
    }
  },
  extraReducers: {
    [getCart.pending]: (state) => {
      state.isLoading = true;
    },
    [getCart.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartApi = action.payload;
      state.cartlength = action.payload.carts.length;
    },
    [getCart.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [confirmCart.pending]: (state) => {
      state.isLoading = true;
    },
    [confirmCart.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.addToCart = true;
    },
    [confirmCart.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [createOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [createOrder.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.orderId = action.payload;
      console.log(state.orderId);
      localStorage.removeItem('cart');
      state.cart = JSON.parse(localStorage.getItem('cart')) || [];
      state.cartlength = 0;
      state.total = 0;
    },
    [createOrder.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [deleteCart.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteCart.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [deleteCart.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [addCouponCode.pending]: (state) => {
      state.isLoading = true;
    },
    [addCouponCode.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.couponSuccess = true;
    },
    [addCouponCode.rejected]: (state, action) => {
      state.isLoading = false;
    },
  }
})

export const { addTocart, changeCartnum, getCartLength, getCartTotal, pushToCart, removeCart, updateCart, getCartLocal } = cartSlice.actions;

export default cartSlice.reducer;

