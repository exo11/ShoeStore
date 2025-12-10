import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem, cleanError, fetchOrder } from '../../../store/slices/cartSlice'
import { Link } from 'react-router'
import type { AppDispatch, RootState } from '../../../store/store'
import CartTable from './CartTable'
import CartOrder from './CartOrder'
import Preloader from '../../main/Preloader'
import Modal from '../../general/Modal'

function Cart() {

  const {items, loading, error, success} = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {dispatch(cleanError(null))}, [dispatch])

  const onRemove = (evt: React.MouseEvent) => {
    dispatch(removeItem((evt.target as HTMLButtonElement).value))
  }

  const onSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()
    const {phone, address} = evt.target as HTMLFormElement
    const owner = {phone: phone.value, address: address.value}
    if (address.value.trim() && items) dispatch(fetchOrder({owner, items}))
  }

  const sucсessMsg = (
    <h2 className="text-center p-3">
      <span>Ваш заказ успешно оформлен! </span>
      <Link className="nav-link text-primary" to="/catalog.html"> 
        <span>вернуться в каталог</span>
      </Link>
    </h2>
  )

  const modal = (
    <Modal content={`Ошибка ${error?.status}`}>
      <button form="orderId" className="btn">
        <span>Попробовать еще раз</span>
      </button>
    </Modal>
  )
  
  const cart = (
    <>
      <CartTable items={items} onRemove={onRemove}/>
      <CartOrder onSubmit={onSubmit}/>
      {loading && <Preloader/>}
      {error && modal}
    </>
  )

  return <>{success ? sucсessMsg : cart}</>
  
}

export default Cart