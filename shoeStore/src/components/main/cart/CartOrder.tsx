function CartOrder({onSubmit}: {onSubmit: (evt: React.FormEvent) => void}) {

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={{'maxWidth': '30rem', 'margin': '0 auto'}}>
        
        <form id="orderId" className="card-body" onSubmit={onSubmit}>
          
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input 
              className="form-control" 
              name="phone" 
              id="phone" 
              placeholder="Ваш телефон"
              pattern="^((\+7|7|8)+([0-9]){10})$"
              required
            ></input>
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input 
              className="form-control" 
              name="address" 
              id="address" 
              placeholder="Адрес доставки" 
              required
            ></input>
          </div>
          
          <div className="form-group form-check">
            <input 
              type="checkbox" 
              className="form-check-input" 
              name="agreement" 
              id="agreement" 
              required
            ></input>
            <label 
              className="form-check-label" 
              htmlFor="agreement"
            >
              Согласен с правилами доставки
            </label>
          </div>
          
          <button type="submit" className="btn btn-outline-secondary">Оформить</button>
        
        </form>
      
      </div>
    </section>
  )

}

export default CartOrder