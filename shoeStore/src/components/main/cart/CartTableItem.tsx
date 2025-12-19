import { Link } from 'react-router'
import type { CartItemProps } from '@model/model'

function CartTableItem({item, index, value, onRemove}: CartItemProps) {
  
  const {id, size, price, count, title} = item
  const position = index + 1
  const url = `/catalog/${id}.html`
  const total = price * count
  
  return (
    <>
      <td scope="row">{position}</td>
      <td><Link to={url}>{title}</Link></td>
      <td>{size}</td>
      <td>{count}</td>
      <td>{`${price} руб.`}</td>
      <td>{`${total} руб.`}</td>
      <td>
        <button 
          className="btn btn-outline-danger btn-sm" 
          value={value}
          onClick={onRemove}
        >
          Удалить
        </button>
      </td>
    </>
  )

}

export default CartTableItem