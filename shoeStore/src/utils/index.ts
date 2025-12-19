import type { SerializedError, WritableDraft } from '@reduxjs/toolkit'
import type { IOrder, IState, IProduct, IChanges } from '@model/model'
import type {  ICartItem, IProducts, IOrderRTR } from '@model/model'

const api = import.meta.env.VITE_API_URL

//URLENDED

type UE = {category: number, search: string, offsetSum: number}

export const urlEnded = (obj: UE) => {
  const {category, search, offsetSum} = obj
  let url = 'items'
  if (category) {
    url += `?categoryId=${category}`
    if (search) url += `&q=${search}`
    if (offsetSum) url += `&offset=${offsetSum}`
  } else if (search) {
    url += `?q=${search}`
    if (offsetSum) url += `&offset=${offsetSum}`
  } else if (offsetSum) {
    url += `?offset=${offsetSum}`
  }
  return url
}

//SEARCH CHANGES

export const searchChanges = (arr: IProduct[], items: ICartItem[]) => {
  const changes: IChanges = {absent: [], price: []}
  const actual: ICartItem[] = []
  arr.forEach((obj) => {
    const item = items.find((item) => item.id === obj.id)
    if (item) {
      const {price, size} = item
      const absent = obj.sizes.find((o) => o.size === size && !o.available)
      if (absent) { 
        changes.absent.push(item) 
      } else if (obj.price !== price) {
        const data = {...item, price: obj.price}
        changes.price.push(data)
        actual.push(data)
      } else {
        actual.push(item)
      } 
    }
  })
  const shift = changes.absent.length || changes.price.length ? changes : null
  return {changes: shift, actual}
}

//SAVE ITEMS

export const saveItems = (items: ICartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(items))
}

//RESPONSE ERROR

const responseError = ({status}: {status: number}) => {
  const e = new Error(String(status))
  e.name = 'RES'
  return e
}

//ERROR STATUS

const errorStatus = (e: unknown) => {
  if (e instanceof Error) {
    return e.name === 'RES' ? `Ошибка ${e.message}` : 'Ошибка сети'
  }
  return 'Неизвестная ошибка'
}

//RETRY

interface IOptions {network?: boolean, ms?: number, times?: number}
interface IRetryArgs<T> extends IOptions { args: T}
interface IRetry<T,U> extends IOptions { args: T, fn: U}

type FN<T,V> = ((urlEnded: T) => Promise<V>) | ((order: T) => Promise<V>)

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
  
const retry = async<T,V,U extends FN<T,V>>(obj: IRetry<T,U>) => {
  const {args, network = true, ms = 5000, times = 5, fn} = obj
  for (let i = 0; i < times; i++) {
    try {
      return await fn(args)
    } catch(e) {
      const err = new Error(errorStatus(e))
      const resError = e instanceof Error && e.name === 'RES' && network
      if (resError || (i === times - 1)) throw err
      await delay(ms)
    } 
  }
}

//FETCH REQUEST

const fetchRequest = async(urlEnded: string) => {
  const res = await fetch(`${api}${urlEnded}`)
  if (!res.ok) throw responseError(res)
  const data = await res.json()
  return data
} 

type WDPS = WritableDraft<IProducts>[]

export const retryFetchRequest = (obj: IRetryArgs<string>) => {
  return retry<string, WDPS, FN<string, WDPS>>({...obj, fn: fetchRequest})
}

//FETCH PRODUCT CARD

type WDP = WritableDraft<IProduct>

export const retryFetchProductCard = (obj: IRetryArgs<string>) => {
  return retry<string, WDP, FN<string, WDP>>({...obj, fn: fetchRequest})
}

//FETCH ORDER

const fetchPostRequest = async(order: IOrder) => {
  const headers = { 'Content-Type': 'application/json' }
  const options = {method: 'POST', headers, body: JSON.stringify(order)}
  const res = await fetch(`${api}order`, options)
  if (!res.ok) throw responseError(res)
  return true  
}

const fetchOrderRequest = async(order: IOrder) => {
  const {items} = order
  const urls = items.map(({id}) => `items/${id}`)
  const data = await Promise.all(urls.map((url) => fetchRequest(url)))
  const {changes, actual} = searchChanges(data, items)
  if (changes) return {changes, actual, success: false}
  const success = await fetchPostRequest(order)
  return {changes, actual, success}
}

type WDO = WritableDraft<IOrderRTR>

export const retryFetchOrder = (obj: IRetryArgs<IOrder>) => {
  return retry<IOrder, WDO, FN<IOrder, WDO>>({...obj, fn: fetchOrderRequest})
}

//BUILDERS

type IA = {error: SerializedError, meta: {arg: IRetryArgs<string> | IRetryArgs<IOrder>}}

export const errorBuilder = (state: IState, {error, meta}: IA) => { 
  const status = error.message as string
  const {args} = meta.arg
  const type = args instanceof Object ? null : args
  state.loading = false
  state.error = {type, status}
}

export const loadingBuilder = (state: IState) => {
  state.loading = true
  state.error = null
}