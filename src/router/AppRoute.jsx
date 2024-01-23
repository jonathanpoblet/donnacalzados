import { lazy, Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import ScrollToTopOnUrlChange from '../utils/scroll';

const Home = lazy(() => import('../pages/Home/Home'));
const Products = lazy(() => import('../pages/Products/Products'));
const Wholesaler = lazy(() => import('../pages/Wholesaler/Wholesaler'));
const AboutUs = lazy(() => import('../pages/AboutUs/AboutUs'));
const Detail = lazy(() => import('../pages/Detail/Detail'));

const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

const Spinner = lazy(() => import('../components/Spinner/Spinner'));

export default function AppRoute() {
  return (
    <Suspense fallback={<Spinner />}>
      <HashRouter>
        <ScrollToTopOnUrlChange />
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/productos' element={<Products />} />
            <Route path='/nosotros' element={<AboutUs />} />
            <Route path='/detalle' element={<Detail />} />
            <Route path='/compras-mayoristas' element={<Wholesaler />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Layout>
      </HashRouter>
    </Suspense>
  );
}
