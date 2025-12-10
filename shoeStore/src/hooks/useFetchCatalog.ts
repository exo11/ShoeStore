import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchCatalog } from '../store/slices/catalogSlice'
import { urlEnded } from '../utils'
import type { AppDispatch } from '../store/store'
import type { ICategories } from '../model/model'

interface UFCProps {
  category: number, 
  search: string, 
  offsetSum: number, 
  categories: ICategories[]
}

function useFetchCatalog(obj: UFCProps) {

  const dispatch = useDispatch<AppDispatch>()
  const {categories} = obj
  const url = urlEnded(obj)

  useEffect(() => {
    if (categories[0]) {dispatch(fetchCatalog(url))}
  }, [dispatch, url, categories])

  return url

}

export default useFetchCatalog