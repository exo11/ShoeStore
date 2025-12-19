import { memo } from "react"
import { useDispatch } from "react-redux"
import { fetchProductCard } from "@store/slices/productCardSlice"
import type { AppDispatch } from "@store/store"
import type { ProductCardErrorProps } from "@model/model"
import Modal from "@components/general/Modal"
import NotFound from "@components/main/NotFound"

const ProductCardError = memo(function ProductCardError({status, id} : ProductCardErrorProps) {

  const dispatch = useDispatch<AppDispatch>()

  const modal = (
    <Modal content={<h3>{status}</h3>}>
      <button 
        onClick={() => dispatch(fetchProductCard({args: `items/${id}`}))}
        className="btn"
      >
        Попробовать еще раз
      </button>
    </Modal>
  )

  return (<>{status === 'Ошибка 404' ? <NotFound /> : modal}</>)

})

export default ProductCardError