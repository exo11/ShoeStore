import { useCallback } from "react"
import Modal from "@components/general/Modal"
import type { IChanges, ICartItem } from "@model/model"

const CartChangesModal = function CartChangesModal({absent, price} : IChanges) {

  const addChangesContent = useCallback((absent: ICartItem[], price: ICartItem[]) => {
   
    const addAbsent = (arr: ICartItem[]) => arr.map((o) => {
      return (
        <p key={`changes${o.id}`}>
          {`Товар ${o.title} отсутствует`}
        </p>
      )
    })

    const addNewPrice = (arr: ICartItem[]) => arr.map((o) => {
      return (
        <p key={`changes${o.id}`}>
          {`Цена на товар ${o.title} изменилась. Новая цена ${o.price} руб.`}
        </p>
      )
    })
    
    return (
      <>
        <h4 className="mb-4">Ваша корзина изменилась</h4>
        {addAbsent(absent)}
        {addNewPrice(price)}
      </>
    )
  }, [])

  return (
    <Modal content={addChangesContent(absent, price)}>
      <button form="orderId" className="btn">
        <span>Оформить</span>
      </button>
    </Modal>
  )
}

export default CartChangesModal