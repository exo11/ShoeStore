import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { retryFetchOrder, saveItems } from '@utils/index'
import { errorBuilder, loadingBuilder } from '@utils/index'
import type { ICartState } from '@model/model'

const storage = localStorage.getItem('cart')

const initialState: ICartState = {
  items: storage ? JSON.parse(storage) : [],
  changes: null,
  success: false,
  loading: false,
  error: null
}

export const fetchCart = createAsyncThunk(
  'cart/fetchCart', 
  retryFetchOrder
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
    
    builder.addCase(fetchCart.pending, (state) => {
      loadingBuilder(state)
    })
    
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      if (action.payload) {
        const {actual, changes, success} = action.payload
        state.items = success ? [] : actual
        state.changes = changes
        state.success = success
        state.loading = false
        saveItems(state.items)
      }
    })
    
    builder.addCase(fetchCart.rejected, (state, action) => {
      errorBuilder(state, action)
    })

  }

})

export const { addItem, removeItem, cleanError } = cartSlice.actions
export default cartSlice.reducer