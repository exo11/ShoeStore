import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchCatalog } from '@store/slices/catalogSlice'
import { urlEnded } from '@utils/index'
import type { AppDispatch } from '@store/store'
import type { UFCProps } from '@model/model'

function useFetchCatalog(obj: UFCProps) {

  const dispatch = useDispatch<AppDispatch>()
  const {categories} = obj
  const url = urlEnded(obj)

  useEffect(() => {
    if (categories.length) {dispatch(fetchCatalog({args: url}))}
  }, [dispatch, url, categories])

  return url

}

export default useFetchCatalog