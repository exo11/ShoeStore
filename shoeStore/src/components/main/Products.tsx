import { Link } from 'react-router'
import { type IProducts } from '../../model/model'

interface ProductsProps {products: IProducts[], children?: React.ReactNode}

function Products({products, children}: ProductsProps) {
  
  const addProducts = (arr:IProducts[]) => arr.map((o) => {
    return (
      <div key={o.id} className="col-4 pb-3">
        <div className="card catalog-item-card h-100">
          <img src={o.images[0]}
            className="card-img-top img-fluid" alt={o.title}></img>
          <div className="card-body d-flex flex-column justify-content-end">
            <p className="card-text">{o.title}</p>
            <p className="card-text">{`${o.price} руб.`}</p>
            <Link to={`/catalog/${o.id}.html`} className="btn btn-outline-primary">Заказать</Link>
          </div>
        </div>
      </div>
    )
  })

  return (
   <div className="row">
    {addProducts(products)}
    {children}
  </div>
  )

}

export default Products