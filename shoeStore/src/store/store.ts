import { configureStore } from '@reduxjs/toolkit'
import catalogSlice from '@store/slices/catalogSlice'
import hitsSlice from '@store/slices/hitsSlice'
import productCardSlice from '@store/slices/productCardSlice'
import cartSlice from '@store/slices/cartSlice'

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