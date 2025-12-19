import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHits } from '@store/slices/hitsSlice'
import type { AppDispatch, RootState } from '@store/store'
import Preloader from '@components/main/Preloader'
import Products from '@components/main/Products'

function TopSales() {

  const {products, loading} = useSelector((state: RootState) => state.hits)
  const dispatch = useDispatch<AppDispatch>()
 
  useEffect(() => {
    dispatch(fetchHits({args: 'top-sales', network: false}))
  }, [dispatch])

  const topSales = (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {loading ? <Preloader /> : <Products products={products}/>}
    </section>
  )

  return (
    <>{products.length ? topSales : null}</>
  )

}

export default TopSales