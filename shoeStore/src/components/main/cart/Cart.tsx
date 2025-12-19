import { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCart } from '@store/slices/cartSlice'
import { removeItem, cleanError } from '@store/slices/cartSlice'
import type { AppDispatch, RootState } from '@store/store'
import CartTable from '@components/main/cart/CartTable'
import CartOrder from '@components/main/cart/CartOrder'
import CartSuccessMsg from '@components/main/cart/CartSuccessMsg'
import CartErrorModal from '@components/main/cart/CartErrorModal'
import CartChangesModal from '@components/main/cart/CartChangesModal'
import Preloader from '@components/main/Preloader'

function Cart() {

  const {items, changes, success, loading, error} = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {dispatch(cleanError(null))}, [dispatch])
  
  const onRemove = useCallback((evt: React.MouseEvent) => {
    dispatch(removeItem((evt.target as HTMLButtonElement).value))
  }, [dispatch])

  const onSubmit = useCallback((evt: React.FormEvent) => {
    evt.preventDefault()
    const {phone, address} = evt.target as HTMLFormElement
    const owner = {phone: phone.value, address: address.value}
    if (address.value.trim() && items) dispatch(fetchCart({args: {owner, items}}))
  }, [dispatch, items])

  const showChanges = changes ? <CartChangesModal {...changes}/> : null

  const cart = (
    <>
      <CartTable items={items} onRemove={onRemove}/>
      <CartOrder onSubmit={onSubmit}/>
      {loading && <Preloader/>}
      {error ? <CartErrorModal status={error.status} /> : showChanges}  
    </>
  )

  return <>{success ? <CartSuccessMsg /> : cart}</>
  
}

export default Cart