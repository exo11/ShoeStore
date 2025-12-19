import type { ISize, ProductCardSizesProps } from '@model/model'

function ProductCardSizes({sizes, onChange} : ProductCardSizesProps) {

  const addSize = (size: string) => (
    <span key={size} className="catalog-item-radio-wrapper">
      <input 
        className="d-none" 
        type="radio" 
        id={size} 
        name="size" 
        value={size}
      ></input>
      <label htmlFor={size}>{size}</label>
    </span>
  )

  const addSizes = (arr: ISize[]) => arr.map((obj) => {
    const {size, available} = obj
    return available ? addSize(size) : null
  })

  return (
    <p onChange={onChange}>
      Размеры в наличии: {addSizes(sizes)}
    </p>
  )

}

export default ProductCardSizes