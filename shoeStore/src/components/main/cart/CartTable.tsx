import CartTableItem from '@components/main/cart/CartTableItem'
import CartTableLayout from '@components/main/cart/CartTableLayout'
import type { ICartItem, CartTableProps } from '@model/model'

function CartTable({items, onRemove}: CartTableProps) {
  
  const addRows = (arr: ICartItem[]) => arr.map((item, index) => {
    const value = `${item.id}${item.size}`
    return (
      <tr key={value}>
        <CartTableItem 
          item={item} 
          index={index} 
          value={value} 
          onRemove={onRemove} 
        />
      </tr>
    )
  })

  return (
    <CartTableLayout items={items}>
      {addRows(items)}
    </CartTableLayout>    
  )

}

export default CartTable