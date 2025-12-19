import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { retryFetchProductCard, errorBuilder, loadingBuilder } from '@utils/index'
import type { IProductCardState } from '@model/model'

const product = {
  id: 0,
  title: '', 
  images: [], 
  sizes: [], 
  sku: '', 
  manufacturer: '', 
  color: '', 
  material: '',  
  season: '', 
  reason: '',
  price: 0
}

const initialState: IProductCardState = {
  product, 
  loading: false, 
  error: null
}

export const fetchProductCard = createAsyncThunk(
  'productCard/fetchProductCard', 
  retryFetchProductCard
)

const productCardSlice = createSlice({
  name: 'productCard',
  initialState,
  reducers: {},
  
  extraReducers: (builder) => {
    
    builder.addCase(fetchProductCard.pending, (state) => {
      loadingBuilder(state)
    })
    
    builder.addCase(fetchProductCard.fulfilled, (state, action) => {
      if (action.payload) {
        state.product = action.payload
        state.loading = false
      }
    })
    
    builder.addCase(fetchProductCard.rejected, (state, action) => {
      errorBuilder(state, action)
    })
  
  }
})

export default productCardSlice.reducer