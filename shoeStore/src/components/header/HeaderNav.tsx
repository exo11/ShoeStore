import { Link } from 'react-router'
import logoPng from '@img/header-logo.png'
import HeaderList from '@components/header/HeaderList'
import HeaderControls from '@components/header/HeaderControls'

function HeaderNav() {

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        <img src={logoPng} alt="Bosa Noga"></img>
      </Link>
      <div className="collapse navbar-collapse" id="navbarMain">
        <HeaderList />
        <HeaderControls />
      </div>
    </nav>
  )

}

export default HeaderNav