import { useEffect, useState } from 'react';
import Link from 'next/link';
import Loading from '../components/Loading';
import SEO from '../components/SEO';

const images = [
  '/home/hero1.jpg',
  '/home/hero2.jpg',
  '/home/hero3.jpg',
];

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const promises = images.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    Promise.all(promises).then(() => {
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [loaded]);

  if (!loaded) return <Loading />;

  return (
    <>
      <SEO 
      title="Home" 
      description="Welcome to Enerplaz EVs, 
      your number one source for electric vehicles in Nigeria."
      url='https://enerplazevs.com' />
      <main className="home-hero">
        <div
          className="hero-bg"
          style={{
            backgroundImage: `url(${images[current]})`,
          }}
        >
          <div className="dark-overlay"></div>
        </div>
        <h2>Drive the Future Today</h2>
        <p>
          Experience the thrill of electric driving with our range of high performance EVs.
          Sustainable, stylish and ready for you.
        </p>
        <Link href="/vehicles/cars" className="button-link">
          Explore Models
        </Link>
      </main>
    </>
    
  );
};

export default Home;
