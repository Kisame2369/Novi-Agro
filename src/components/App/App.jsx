import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const MainPage = lazy(() => import("..//../pages/MainPage/MainPage.jsx"));
const Header = lazy(() => import("../Header/Header.jsx"));
const ProductsPage = lazy(() => import("../../pages/ProductsPage/ProductsPage.jsx"));
const AboutPage = lazy(() => import("../../pages/AboutPage/AboutPage.jsx"));

function App() {
  

  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/aboutus" element={<AboutPage />} />
        </Routes>
      </Suspense>
    </>
  )
};

export default App
