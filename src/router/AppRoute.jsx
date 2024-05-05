import { lazy, Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import ScrollToTopOnUrlChange from '../utils/scroll';

const Home = lazy(() => import('../pages/Home/Home'));
const Products = lazy(() => import('../pages/Products/Products'));
const Wholesaler = lazy(() => import('../pages/Wholesaler/Wholesaler'));
const AboutUs = lazy(() => import('../pages/AboutUs/AboutUs'));
const Detail = lazy(() => import('../pages/Detail/Detail'));
const Checkout = lazy(() => import('../pages/Checkout/Checkout'));
const CheckoutTest = lazy(() => import('../pages/CheckoutTest/Checkout'));
const Success = lazy(() => import('../pages/Success/Success'));
const Failure = lazy(() => import('../pages/Failure/Failure'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));
const Admin = lazy(() => import('../pages/Admin/Admin'));
const AdminProduct = lazy(() => import('../pages/AdminProduct/AdminProduct'));
const AdminOrders = lazy(() => import('../pages/AdminOrders/AdminOrders'));

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
            <Route path='/productos/detalle' element={<Detail />} />
            <Route path='/nosotros' element={<AboutUs />} />
            <Route path='/compras-mayoristas' element={<Wholesaler />} />
            <Route path='/pagos' element={<Checkout />} />
            <Route path='/pagoss' element={<CheckoutTest />} />
            <Route path='/pago-confirmado' element={<Success />} />
            <Route path='/pago-rechazado' element={<Failure />} />
            <Route path='/secure-admin-panel' element={<Admin />} />
            <Route path='/secure-admin-panel-product' element={<AdminProduct />} />
            <Route path='/secure-admin-panel-orders' element={<AdminOrders />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Layout>
      </HashRouter>
    </Suspense>
  );
}
