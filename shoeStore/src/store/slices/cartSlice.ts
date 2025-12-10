import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPostRequest, errorBuilder, loadingBuilder } from '../../utils'
import type { ICartState, ICartItem } from '../../model/model'

const storage = localStorage.getItem('cart')

const saveItems = (items: ICartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(items))
}

const initialState: ICartState = {
  items: storage ? JSON.parse(storage) : [],
  success: false,
  loading: false,
  error: null
}

export const fetchOrder = createAsyncThunk(
  'cart/fetchOrder', 
  fetchPostRequest
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  
  reducers: {
    
    addItem(state, action) {
      const {id, size, count} = action.payload
      const item = state.items.find((o) => {
        return o.id === id && o.size === size
      })
      if (item) {
        item.count = item.count + count
      } else {
        state.items.push(action.payload)
        state.success = false
      }
      saveItems(state.items)
    },
    
    removeItem(state, action) {
      state.items = state.items.filter(({id, size}) => { 
        return `${id}${size}` !== action.payload
      })
      saveItems(state.items)
    },

    cleanError(state, action) {
      state.error = action.payload
    }
  
  },
  
  extraReducers: (builder) => {
    
    builder.addCase(fetchOrder.pending, (state) => {
      loadingBuilder(state)
    })
    
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.loading = false
      state.success = action.payload
      state.items = []
      saveItems(state.items)
    })
    
    builder.addCase(fetchOrder.rejected, (state, action) => {
      errorBuilder(state, action)
    })
  
  }
})

export const { 
  addItem, 
  removeItem, 
  cleanError 
} = cartSlice.actions

export default cartSlice.reducer