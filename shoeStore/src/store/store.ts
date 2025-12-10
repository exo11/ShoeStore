import { configureStore } from '@reduxjs/toolkit'
import catalogSlice from './slices/catalogSlice'
import hitsSlice from './slices/hitsSlice'
import productCardSlice from './slices/productCardSlice'
import cartSlice from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    catalog: catalogSlice,
    hits: hitsSlice,
    productCard: productCardSlice,
    cart: cartSlice
  }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = typeof store.dispatch