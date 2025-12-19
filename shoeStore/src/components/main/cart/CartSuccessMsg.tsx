import { Link } from "react-router"

function CartSuccessMsg() {

  return (
    <h2 className="text-center p-3">
      <span>Ваш заказ успешно оформлен!</span>
      <Link className="nav-link text-primary" to="/catalog.html"> 
        <button className="btn btn-primary pl-5 pr-5 mt-3">
          <span>Вернуться в каталог</span>
        </button>
      </Link>
    </h2>
  )

}

export default CartSuccessMsg