import { useParams } from 'react-router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductCard } from '@store/slices/productCardSlice'
import type { AppDispatch, RootState } from '@store/store'
import ProductCardDesc from '@components/main/productCard/ProductCardDesc'
import ProductCardForm from '@components/main/productCard/ProductCardForm'
import ProductCardError from '@components/main/productCard/ProductCardError'
import Preloader from '@components/main/Preloader'

function ProductCard() {
  
  const store = useSelector((state: RootState) => state.productCard)
  const dispatch = useDispatch<AppDispatch>()
  const {id} = useParams()
  
  useEffect(() => {dispatch(fetchProductCard({args: `items/${id}`}))}, [dispatch, id])

  const {product, loading, error} = store
  const {title, images} = product
 
  const сard = (
    <section className="catalog-item">
      <h2 className="text-center">{title}</h2>
      <div className="row">
        <div className="col-5">
          <img src={images[0]} className="img-fluid" alt=""></img>
        </div>
        <div className="col-7">
          <ProductCardDesc {...product} />
          <ProductCardForm {...product} /> 
        </div>
      </div>
    </section>
  )

  return (
    <>
      {loading ? <Preloader /> : error ? <ProductCardError status={error.status} id={id} /> : сard}
    </>
  )

}

export default ProductCard