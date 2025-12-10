import FooterInfo from './FooterInfo'
import FooterPay from './FooterPay'
import FooterCopyright from './FooterCopyright'
import FooterContacts from './FooterContacts'

function Footer() {

  return (  
    <footer className="container bg-light footer">
      <div className="row">
        <div className="col">
          <FooterInfo />
        </div>
        <div className="col">
          <FooterPay />
          <FooterCopyright />
        </div>
        <div className="col text-right">
          <FooterContacts />
        </div>
      </div>
    </footer>
  )

}

export default Footer