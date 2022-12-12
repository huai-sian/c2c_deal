import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import adminProductsReducer from './slices/adminProductsSlice';
import adminOrdersSlice from './slices/adminOrdersSlice';
import adminCouponsSlice from './slices/adminCouponsSlice';
import productsSlice from './slices/productsSlice';
import cartSlice from './slices/cartSlice';
import orderSlice from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    adminProducts: adminProductsReducer,
    adminOrders: adminOrdersSlice,
    adminCoupons: adminCouponsSlice,
    products: productsSlice,
    cart: cartSlice,
    order: orderSlice
  }
});