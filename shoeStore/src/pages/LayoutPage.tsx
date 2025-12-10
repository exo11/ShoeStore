import { Outlet } from 'react-router'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Banner from '../components/main/Banner'

function LayoutPage() {

  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <Outlet/>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )

}

export default LayoutPage