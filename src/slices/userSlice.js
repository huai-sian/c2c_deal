import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

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
      if (state.user.expired < Math.round(new Date().getTime() / 1000)) {
        state.user = {
          message: '',
          uid: '',
          token: '',
          expired: '',
        };
      }
    },
    testConsole() {
      console.log('dispatch!');
    }
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      document.cookie = `pureSavonVuex=${action.payload.token};expires=${new Date(action.payload.expired)};`;
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

export const { clearUser, checkExpAuth, testConsole } = userSlice.actions;

export default userSlice.reducer;
