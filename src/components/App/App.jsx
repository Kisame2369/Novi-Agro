import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const MainPage = lazy(() => import("..//../pages/MainPage/MainPage.jsx"));
const Header = lazy(() => import("../Header/Header.jsx"));
const ProductsPage = lazy(() => import("../../pages/ProductsPage/ProductsPage.jsx"));


function App() {
  

  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </Suspense>
    </>
  )
};

export default App
