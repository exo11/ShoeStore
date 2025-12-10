import type { ICategories } from '../../model/model'

interface ICategoriesProps {
  categories: ICategories[], 
  category: number,
  onCategory: (evt: React.MouseEvent) => void
}

function Categories({categories, category, onCategory}: ICategoriesProps) {

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