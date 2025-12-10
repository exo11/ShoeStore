import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import Search from '../general/Search'

function HeaderControls() {
   
  const [field, setField] = useState<boolean>(false)
  const {searchValue} = useSelector((state: RootState) => state.catalog)
  const {length} = useSelector((state: RootState) => state.cart.items)
  const navigate = useNavigate()
  const cls = 'header-controls'

  const onToggle = () => setField(prev => !prev)
  const onNavigate = () => {if (length) navigate('/cart.html')}

  const searchControl = (
    <div className={`${cls}-pic ${cls}-search`} onClick={onToggle}></div>
  )

  const searchBtn = (
    <button form="searchForm" className={`${cls}-pic ${cls}-search-btn`}></button>
  )

  const cartCount = (<div className={`${cls}-cart-full`}>{length}</div>)
  
  return (
    <div>
      <div className={`${cls}-pics`}>
        {field && searchValue.trim() ? searchBtn : searchControl}
        <div className={`${cls}-pic ${cls}-cart`} onClick={onNavigate}>
          {length ? cartCount : null}
          <div className={`${cls}-cart-menu`}></div>
        </div>
      </div>
      {field && <Search id={'searchForm'} searchValue={searchValue} cls={cls}/>}
    </div>
  )

}

export default HeaderControls