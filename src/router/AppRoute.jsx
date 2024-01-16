import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import ScrollToTopOnUrlChange from '../utils/scroll';

const Home = lazy(() => import('../pages/Home/Home'));
const Products = lazy(() => import('../pages/Products/Products'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

const Spinner = lazy(() => import('../components/Spinner/Spinner'));

export default function AppRoute() {
  return (
    <Suspense fallback={<Spinner />}>
      <ScrollToTopOnUrlChange />
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='./productos' element={<Products />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </Suspense>
  );
}
