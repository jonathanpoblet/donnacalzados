import AboutUsBody from '../../components/AboutUs/AboutUsBody/AboutUsBody';
import AboutUsHeader from '../../components/AboutUs/AboutUsHeader/AboutUsHeader';
import './aboutUs.css';

export default function AboutUs() {
  return (
    <main className='aboutUs fade-in'>
      <AboutUsHeader />
      <AboutUsBody />
    </main>
  );
}
