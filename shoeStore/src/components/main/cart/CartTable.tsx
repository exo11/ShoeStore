import type { ICartItem } from '../../../model/model'
import CartTableItem from './CartTableItem'
import CartTableLayout from './CartTableLayout'

interface CartTableProps {
  items: ICartItem[], 
  onRemove: (evt: React.MouseEvent) => void
}

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