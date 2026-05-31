import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const MainPage = lazy(() => import("..//../pages/MainPage/MainPage.jsx"));
const Header = lazy(() => import("../Header/Header.jsx"));
const ProductsPage = lazy(() => import("../../pages/ProductsPage/ProductsPage.jsx"));
const AboutPage = lazy(() => import("../../pages/AboutPage/AboutPage.jsx"));
const ProductPage = lazy(() => import("../ProductModal/ProductModal.jsx"));
const ContactsPage = lazy(() => import("../../pages/ContactsPage/ContactsPage.jsx"));
const Footer = lazy(() => import("../Footer/Footer.jsx"));

function App() {
  

  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/aboutus" element={<AboutPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
};

export default App
