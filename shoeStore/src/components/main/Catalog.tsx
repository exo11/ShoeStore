import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import useFetchCatalog from '../../hooks/useFetchCatalog'
import { addCategory, addOffsetSum, fetchCatalog } from '../../store/slices/catalogSlice'
import type { RootState, AppDispatch } from '../../store/store'
import Categories from './Categories'
import Products from './Products'
import Preloader from './Preloader'
import Search from '../general/Search'
import Modal from '../general/Modal'

function Catalog({withSearch}: {withSearch?: boolean}) {

  const store = useSelector((state: RootState) => state.catalog)
  const {searchValue, products, loading, categoryObj, offsetObj, search, error} = store
  const {categories, category, categoryEnd} = categoryObj
  const {offsetSum, offset} = offsetObj
 
  const dispatch = useDispatch<AppDispatch>()
  
  useEffect(() => {dispatch(fetchCatalog('categories'))}, [dispatch])
  
  const url = useFetchCatalog({category, search, offsetSum, categories})

  const onCategory = (evt: React.MouseEvent) => {
    const id = (evt.target as HTMLButtonElement).dataset.id
    dispatch(addCategory(Number(id)))
  }

  const onOffset = () => dispatch(addOffsetSum(offsetSum + offset))

  const onReload = () => {
    if (error) {
      const {type} = error
      const urlEnded = type === 'categories' ? type : url
      dispatch(fetchCatalog(urlEnded))
    }
  }

  const btn = (
    <div className="text-center w-100">
      <button onClick={onOffset} className="btn btn-outline-primary">
        Загрузить еще
      </button>
    </div>
  )

  const catalogProducts = (
    <Products products={products}>
      {loading ? <Preloader /> : categoryEnd ? null : btn}
    </Products>
  )

  const notFound = <h3 className="text-center">По вашему запросу ничего не найдено</h3> 

  const catalog = (
    <>
      {withSearch ? <Search searchValue={searchValue} cls={'catalog'}/> : null}
      <Categories {...categoryObj} onCategory={onCategory}/>
      {search && !products[0] ? notFound : catalogProducts}
    </>
  )

  const modal = (
    <Modal content={`Ошибка ${error?.status}`}>
      <button onClick={onReload} className="btn">Попробовать еще раз</button>
    </Modal>
  )

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {loading ? <Preloader /> : categories[0] ? catalog : null}
      {error && modal}
    </section>
  )

}

export default Catalog