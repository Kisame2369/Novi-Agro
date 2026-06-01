import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../Loader/Loader.jsx";

const MainPage = lazy(() => import("../../pages/MainPage/MainPage.jsx"));
const Header = lazy(() => import("../Header/Header.jsx"));
const ProductsPage = lazy(() => import("../../pages/ProductsPage/ProductsPage.jsx"));
const AboutPage = lazy(() => import("../../pages/AboutPage/AboutPage.jsx"));
const ProductPage = lazy(() => import("../ProductModal/ProductModal.jsx"));
const ContactsPage = lazy(() => import("../../pages/ContactsPage/ContactsPage.jsx"));
const Footer = lazy(() => import("../Footer/Footer.jsx"));
const EventsPage = lazy(() => import("../../pages/EventsPage/EventsPage.jsx"));

function App() {
    return (
        <Suspense fallback={<Loader />}>
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/aboutus" element={<AboutPage />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/products/:id" element={<ProductPage />} />
                <Route path="/events" element={<EventsPage />} />
            </Routes>
            <Footer />
        </Suspense>
    );
}

export default App;