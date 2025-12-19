import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { useState, useCallback } from 'react'
import { addItem } from '@store/slices/cartSlice'
import type { AppDispatch } from '@store/store'
import type { IProduct } from '@model/model'
import ProductCardSizes from '@components/main/productCard/ProductCardSizes'
import ProductCardCount from '@components/main/productCard/ProductCardCount'

function ProductCardForm(product: IProduct) {

  const [valid, setValid] = useState<boolean>(true)
  const {id, title, price, sizes} = product
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const sizeExist = sizes.find((o) => o.available)
  
  const onSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()
    const formData = new FormData(evt.target as HTMLFormElement)
    const obj = Object.fromEntries(formData)
    
    if (obj.size) {
      dispatch(addItem({
        ...obj, 
        id: Number(obj.id), 
        count: Number(obj.count), 
        price: Number(obj.price)
      }))
      navigate('/cart.html')
    } else {
      setValid(false)
    }
  
  }

  const onChange = useCallback((evt: React.FormEvent) => {
    const {checked} = evt.target as HTMLInputElement
    setValid(checked)
  }, [])

  const form = (
    <form onSubmit={onSubmit}>
      <div className="text-center">
        <input name="id" type="hidden" value={id}></input>
        <input name="title" type="hidden" value={title}></input>
        <input name="price" type="hidden" value={price}></input>
        <ProductCardSizes sizes={sizes} onChange={onChange}/>
        <ProductCardCount/>
        {!valid && <h6 className="text-danger p-2">ВЫБЕРИТЕ РАЗМЕР</h6>}
      </div>
      <button className="btn btn-danger btn-block btn-lg">В корзину</button>
    </form>  
  )

  const notSize = <h5 className="text-center pt-3">Нет размеров</h5>

  return (
    <>{sizeExist ? form : notSize}</>
  )

}

export default ProductCardForm