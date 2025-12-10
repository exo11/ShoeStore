import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import type { AppDispatch } from '../../store/store'
import { addSearchValue, addSearch } from '../../store/slices/catalogSlice'

interface SearchProps {
  searchValue: string, 
  cls: string, 
  id?: string
}

function Search({searchValue, cls, id} : SearchProps) {
  
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const onChange = (evt: React.FormEvent) => {
    const {value} = evt.target as HTMLFormElement
    dispatch(addSearchValue(value))
    if (!value) dispatch(addSearch(value))
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

}

export default Search