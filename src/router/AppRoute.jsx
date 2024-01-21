import { lazy, Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import ScrollToTopOnUrlChange from '../utils/scroll';

const Home = lazy(() => import('../pages/Home/Home'));
const Man = lazy(() => import('../pages/Man/Man'));
const Woman = lazy(() => import('../pages/Woman/Woman'));
const Child = lazy(() => import('../pages/Child/Child'));
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
            <Route path='/hombre' element={<Man />} />
            <Route path='/mujer' element={<Woman />} />
            <Route path='/niño' element={<Child />} />
            <Route path='/nosotros' element={<AboutUs />} />
            <Route path='/detalle' element={<Detail />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Layout>
      </HashRouter>
    </Suspense>
  );
}
