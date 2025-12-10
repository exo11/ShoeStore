import type { ICartItem } from '../../../model/model'

interface CartTableLayoutProps {
  items: ICartItem[],
  children: React.ReactNode
}

function CartTableLayout({items, children}: CartTableLayoutProps) {

  const totalAmount = (arr: ICartItem[]) => { 
    return arr.reduce((sum, {price, count}) => sum + (price * count), 0)
  }

  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Размер</th>
            <th scope="col">Кол-во</th>
            <th scope="col">Стоимость</th>
            <th scope="col">Итого</th>
            <th scope="col">Действия</th>
          </tr>
        </thead>
        <tbody>
          {children}
          <tr>
            <td colSpan={5} className="text-right">Общая стоимость</td>
            <td>{`${totalAmount(items)} руб.`}</td>
          </tr>
        </tbody>
      </table>
    </section>
  )

}

export default CartTableLayout