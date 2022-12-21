import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  messages: [],
};

const alertMessageSlice = createSlice({
  name: 'alertMessage',
  initialState,
  reducers: {
    testConsole(state) {
      console.log('dispatch!');
    },
    updateMessage(state, action) {
      const timestamp = Math.floor(new Date() / 1000);
      state.messages.push({ message: action.payload.message, status: action.payload.status, timestamp });
      console.log(state.messages[0]);
      window.setTimeout(() => {
        state.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            state.messages.splice(i, 1);
          }
        })
      }, 3000);
    },
    removeMessage(state, action) {
      state.messages.splice(action.payload, 1);
    },
  },
  extraReducers: {
    
  }
})

export const { updateMessage, removeMessage } = alertMessageSlice.actions;

export default alertMessageSlice.reducer;
