import { memo } from "react"
import Modal from "@components/general/Modal" 

const CartErrorModal = memo(function CartErrorModal({status}: {status: string}) {

  return (
    <Modal content={<h3>{status}</h3>}>
      <button form="orderId" className="btn">
        <span>Попробовать еще раз</span>
      </button>
    </Modal>
  )

})

export default CartErrorModal