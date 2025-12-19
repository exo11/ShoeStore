import type { ICategories, CategoriesProps } from '@model/model'

const Categories = function Categories({categories, category, onCategory}: CategoriesProps) {

  const addCategories = (arr: ICategories[]) => arr.map(({id, title}) => {
    const active = category === id ? 'active' : ''
    return (
      <li key={id} className="nav-item">
        <button 
          data-id={id} 
          onClick={onCategory} 
          className={`nav-link ${active}`}
        >
        {title}
        </button>
      </li>
    )
  })

  return (
    <ul className="catalog-categories nav justify-content-center">
      {addCategories(categories)}
    </ul>
  )

}

export default Categories