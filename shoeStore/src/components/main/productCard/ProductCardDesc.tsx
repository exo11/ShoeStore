import type { IProduct } from '../../../model/model'

function ProductCardDesc(product: IProduct) {

  const {
    sku, 
    manufacturer, 
    color, 
    material,  
    season, 
    reason
  } = product

  return (
    <table className="table table-bordered">
      <tbody>
        <tr>
          <td>Артикул</td>
          <td>{sku}</td>
        </tr>
        <tr>
          <td>Производитель</td>
          <td>{manufacturer}</td>
        </tr>
        <tr>
          <td>Цвет</td>
          <td>{color}</td>
        </tr>
        <tr>
          <td>Материалы</td>
          <td>{material}</td>
        </tr>
        <tr>
          <td>Сезон</td>
          <td>{season}</td>
        </tr>
        <tr>
          <td>Повод</td>
          <td>{reason}</td>
        </tr>
      </tbody>
    </table>
  )

}

export default ProductCardDesc