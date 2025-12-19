import { useRef } from "react"

const useDebounce = (func: (q: string) => void, delay: number) => {
  const ref = useRef(0)
  return (value: string) => {
    clearTimeout(ref.current)
    ref.current = setTimeout(() => func(value), delay)
  }
}

export default useDebounce