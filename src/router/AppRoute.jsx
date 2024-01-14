import { lazy, Suspense } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import ScrollToTopOnUrlChange from '../utils/scroll';

const Home = lazy(() => import('../pages/Home/Home'));

const Spinner = lazy(() => import('../components/Spinner/Spinner'));

export default function AppRoute() {
  return (
    <Suspense fallback={<Spinner />}>
      <Router>
        <ScrollToTopOnUrlChange />
        <Layout>
          <Routes>
            <Route exact path='/' element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </Suspense>
  );
}
