import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
const Swal = require('sweetalert2');

const url = 'https://vue-course-api.hexschool.io/admin/signin';

const url2 = 'https://vue-course-api.hexschool.io/api/user/check';

const initialState = {
  user: {
    message: '',
    uid: '',
    token: '',
    expired: '',
  },
  loggedIn: false,
  isLoading: false
};

export const login = createAsyncThunk('user/login',
  async ({ username, password }, thunkAPI) => {
    try {
      const res = await axios.post(url, { username, password }, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        }
      });

      if(res.data.success) {
        return res.data;
      } else {
        return res.data.message;
      }
      
      
    } catch(err) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
)

export const checkLoggedIn = createAsyncThunk('user/checkLoggedIn',
  async (param, thunkAPI) => {
    try {
      const res = await axios.post(url2, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        }
      });
      if(res.data.success) {
        return res.data.success;
      }
    } catch(err) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = {
        message: '',
        uid: '',
        token: '',
        expired: '',
      };
    },
    checkExpAuth: (state) => {
      console.log(state.user.expired, Math.round(new Date().getTime()));
      if (state.user.expired < Math.round(new Date().getTime())) {
        state.user = {
          message: '',
          uid: '',
          token: '',
          expired: '',
        };
        localStorage.removeItem('c2cToken');
        localStorage.removeItem('c2cUser');
      }
    },
    getTokenFromLocal: (state, action) => {
      state.user.token = action.payload;
    },
    getUserFromLocal: (state, action) => {
      state.user = JSON.parse(localStorage.getItem('c2cUser')) || [];
      console.log(state.user);
    },
    removeTokenFromLocal: (state, action) => {
      localStorage.removeItem('c2cToken');
    },
    setTokenLocal: (state, action) => {
      document.cookie = `c2cDeal=${state.user.token};expires=${new Date(state.user.expired)};`;
      localStorage.setItem('c2cToken', JSON.stringify(state.user.token));
    }
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      if(action.payload.token) {
        state.user = action.payload;
        console.log(state.user);
        document.cookie = `c2cDeal=${action.payload.token};expires=${new Date(action.payload.expired)};`;
        localStorage.setItem('c2cToken', JSON.stringify(action.payload.token));
        localStorage.setItem('c2cUser', JSON.stringify(action.payload));
      } else {
        Swal.fire(
          '',
          `${action.payload}`,
          'info',
        );
      }
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [checkLoggedIn.pending]: (state) => {
      state.isLoading = true;
    },
    [checkLoggedIn.fulfilled]: (state) => {
      state.loggedIn = true;
    },
    [checkLoggedIn.rejected]: (state) => {
      state.isLoading = true;
    },
  }
})

export const { clearUser, checkExpAuth, getTokenFromLocal, getUserFromLocal, setTokenLocal } = userSlice.actions;

export default userSlice.reducer;
