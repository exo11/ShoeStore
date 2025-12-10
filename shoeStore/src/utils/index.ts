import type { IPostRequest, IState } from '../model/model'
import type { GetThunkAPI, AsyncThunkConfig } from '@reduxjs/toolkit'

export const urlEnded = (obj: {category: number, search: string, offsetSum: number}) => {
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

type RFR = {urlEnded: string, ms: number, times: number}
type GA = GetThunkAPI<AsyncThunkConfig>
type IA = {payload: unknown, meta: {arg: string | IPostRequest | RFR}}

const errorStatus = (error: unknown) => error instanceof Error ? error.message : 'unstatus'
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const retryFetchRequest = async(obj: RFR, {rejectWithValue}: GA,) => {
  const {urlEnded, ms, times} = obj
  for (let i = 0; i < times; i++) {
    try {
      const res = await fetch(`http://localhost:7070/api/${urlEnded}`)
      if (!res.ok) {
        throw new Error(String(res.status))
      }
      const data = await res.json()
      return data
    } catch(error) {
      if (i === times - 1) {
        return rejectWithValue(errorStatus(error))
      }
      await delay(ms)
    } 
  }
}

export const fetchRequest = async(urlEnded: string, {rejectWithValue}: GA) => {
  try {
    const res = await fetch(`http://localhost:7070/api/${urlEnded}`)
    if (!res.ok) {
      return rejectWithValue(String(res.status))
    }
    const data = await res.json()
    return data
  } catch(error) {
    return rejectWithValue(errorStatus(error))
  } 
}  

export const fetchPostRequest = async(obj: IPostRequest, {rejectWithValue}: GA) => {
  try {
    const headers = { 'Content-Type': 'application/json' }
    const options = {method: 'POST', headers, body: JSON.stringify(obj)}
    const res = await fetch('http://localhost:7070/api/order', options)
    return res.ok ? true : rejectWithValue(String(res.status))
  } catch(error) {
    return rejectWithValue(errorStatus(error))
  } 
}

export const errorBuilder = (state: IState, {payload, meta}: IA) => {
  const status = payload as string
  const type = meta.arg instanceof Object ? 'obj' : meta.arg
  state.loading = false
  state.error = {type, status}
}

export const loadingBuilder = (state: IState) => {
  state.loading = true
  state.error = null
}