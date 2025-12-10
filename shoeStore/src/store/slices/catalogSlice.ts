import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { type ICatalogState } from '../../model/model'
import { fetchRequest, errorBuilder, loadingBuilder } from '../../utils'

const initialState: ICatalogState = {
  categoryObj: {categories: [], category: 0, categoryEnd: false},
  offsetObj: {offsetSum: 0, offset: 6},
  products: [],
  loading: false,
  error: null,
  search: '',
  searchValue: ''
}

const addLastId = (arr: {id: number}[]) => arr[arr.length - 1]?.id

export const fetchCatalog = createAsyncThunk(
  'catalog/fetchCatalog', 
  fetchRequest
)

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  
  reducers: {
    
    addSearch(state, action) {
      state.offsetObj.offsetSum = 0
      state.search = action.payload
    },
    
    addSearchValue(state, action) {
      state.searchValue = action.payload
    },
    
    addCategory(state, action) {
      state.offsetObj.offsetSum = 0
      state.categoryObj.category = action.payload
    },
    
    addOffsetSum(state, action) {
      state.offsetObj.offsetSum = action.payload
    }
  
  },
  
  extraReducers: (builder) => {
    
    builder.addCase(fetchCatalog.pending, (state) => {
      loadingBuilder(state)
    })
    
    builder.addCase(fetchCatalog.fulfilled, (state, action) => {
      const data = action.payload
      const {offset} = state.offsetObj
      const {arg} = action.meta
      
      if (arg === 'categories') {
        
        state.categoryObj.categories = [{id: 0, title: 'Все'}, ...data]
      
      } else if (arg.includes('offset=')) {
        
        const equal = addLastId(state.products) === addLastId(data)
        state.products = !equal ? [...state.products, ...data] : state.products
      
      } else {
        
        state.products = data
      
      }
      
      state.categoryObj.categoryEnd = data.length < offset
      state.loading = false
    })
    
    builder.addCase(fetchCatalog.rejected, (state, action) => {
      errorBuilder(state, action)
    })
  
  }
})

export const { 
  addSearchValue, 
  addCategory, 
  addOffsetSum, 
  addSearch 
} = catalogSlice.actions

export default catalogSlice.reducer