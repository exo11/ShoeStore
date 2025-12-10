import './App.css'
import { Routes, Route } from 'react-router'
import LayoutPage from './pages/LayoutPage'
import HomePage from './pages/HomePage'
import CatalogPage from './pages/CatalogPage'
import ProductCardPage from './pages/ProductCardPage'
import AboutPage from './pages/AboutPage'
import ContactsPage from './pages/ContactsPage'
import CartPage from './pages/CartPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<LayoutPage />} >
        <Route index element={<HomePage />} />
        <Route path="/catalog.html" element={<CatalogPage />} />
        <Route path="/catalog/:id.html" element={<ProductCardPage />} /> 
        <Route path="/about.html" element={<AboutPage />} />
        <Route path="/contacts.html" element={<ContactsPage />} />
        <Route path="/cart.html" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App