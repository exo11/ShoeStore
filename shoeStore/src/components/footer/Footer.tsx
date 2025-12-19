import FooterInfo from '@components/footer/FooterInfo'
import FooterPay from '@components/footer/FooterPay'
import FooterCopyright from '@components/footer/FooterCopyright'
import FooterContacts from '@components/footer/FooterContacts'

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