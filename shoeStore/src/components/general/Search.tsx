import { memo } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import useDebounce from '@hooks/useDebounce'
import type { AppDispatch } from '@store/store'
import { addSearchValue, addSearch } from '@store/slices/catalogSlice'
import type { SearchProps } from '@model/model'

const Search = memo(function Search({searchValue, cls, id} : SearchProps) {
  
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  
  const debounceAddSearch = (q: string) => dispatch(addSearch(q))
  const debounceDispatch = useDebounce(debounceAddSearch, 500)
  
  const onChange = (evt: React.FormEvent) => {
    const {value} = evt.target as HTMLFormElement
    dispatch(addSearchValue(value))
    debounceDispatch(value)
  }

  const onSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()
    navigate('/catalog.html')
    if (searchValue.trim()) dispatch(addSearch(searchValue))
  }

  return (
    <form id={id} className={`${cls}-search-form form-inline`} onSubmit={onSubmit}>
      <input 
        name="search"
        onChange={onChange} 
        className="form-control" 
        placeholder="Поиск" 
        value={searchValue}
      ></input>
    </form>
  )

})

export default Search