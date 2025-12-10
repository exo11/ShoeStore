import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { retryFetchRequest, errorBuilder, loadingBuilder } from '../../utils'
import { type IHitsState } from '../../model/model'

const initialState: IHitsState = {
  products: [],
  loading: false,
  error: null
}

export const fetchHits = createAsyncThunk(
  'hits/fetchHits', 
  retryFetchRequest
)

const hitsSlice = createSlice({
  name: 'hits',
  initialState,
  reducers: {},
  
  extraReducers: (builder) => {
    
    builder.addCase(fetchHits.pending, (state) => {
      loadingBuilder(state)
    })
    
    builder.addCase(fetchHits.fulfilled, (state, action) => {
      state.loading = false
      state.products = action.payload
    })
    
    builder.addCase(fetchHits.rejected, (state, action) => {
      errorBuilder(state, action)
    })
  
  }
})

export default hitsSlice.reducer