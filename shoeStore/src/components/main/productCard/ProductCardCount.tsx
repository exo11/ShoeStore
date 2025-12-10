import { useState } from 'react'

function ProductCardCount() {

  const [count, setCount] = useState<number>(1)

  const onCount = (evt: React.MouseEvent) => {
    const {sign} = (evt.target as HTMLButtonElement).dataset
    if (sign === 'plus') {
      setCount(prev => prev < 10 ? prev + 1 : prev)
    } else if (sign === 'minus') {
      setCount(prev => prev > 1 ? prev - 1 : prev)
    }
  }

  return (
    <p>Количество: 
      <span className="btn-group btn-group-sm pl-2" onClick={onCount}>
        <button type="button" data-sign={'minus'} className="btn btn-secondary">-</button>
        
        <span className="count-input-wrapper">
          <input 
            name="count" 
            readOnly 
            className="count-input" 
            type="text" 
            value={count}
          >
          </input>
          <span className="count-input-curtain"></span>
        </span>
        
        <button type="button" data-sign={'plus'} className="btn btn-secondary">+</button>
      </span>
    </p>
  )

}

export default ProductCardCount