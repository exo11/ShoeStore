import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router'
import Header from '@components/header/Header'
import Footer from '@components/footer/Footer'
import Banner from '@components/main/Banner'
import Preloader from '@components/main/Preloader'

function LayoutPage() {

  const location = useLocation()

  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <Suspense key={location.pathname} fallback={<Preloader />}>
              <Outlet/>
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )

}

export default LayoutPage