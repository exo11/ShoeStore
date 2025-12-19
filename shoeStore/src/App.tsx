import './App.css'
import { Routes, Route } from 'react-router'
import { lazy } from 'react'
import LayoutPage from '@pages/LayoutPage'
const HomePage = lazy(() => import('@pages/HomePage'))
const CatalogPage = lazy(() => import('@pages/CatalogPage'))
const ProductCardPage = lazy(() => import('@pages/ProductCardPage'))
const AboutPage = lazy(() => import('@pages/AboutPage'))
const ContactsPage = lazy(() => import('@pages/ContactsPage'))
const CartPage = lazy(() => import('@pages/CartPage'))
import NotFoundPage from '@pages/NotFoundPage'

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