import { useEffect, useRef, useState } from 'react';
import SEO from '../components/SEO';

const Mission = () => {
  const elementRefs = useRef([]);
  const [purpose, setPurpose] = useState('')
  const purposeStatement = "Our Journey into electric mobility wasn't just a business move — it was a conscious decision rooted in sustainability, innovation, and a desire to shape a cleaner, smarter future.";
  const [index,setIndex] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(()=>{entry.target.classList.add('in-view')},500);
          observer.unobserve(entry.target);
        }
      });
    }
    ,{
        root: null,
        rootMargin: '-5% 0px', 
      }
    );

    elementRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
    }, []);

  useEffect(() => {
    if (index < purposeStatement.length) {
      const timeout = setTimeout(() => {
        setPurpose((prev) => prev + purposeStatement[index]);
        setIndex(index + 1);
      }, 30); 

      return () => clearTimeout(timeout);
    }
  }, [index, purposeStatement]);



  return (
    <>
        <SEO title='Our Mission' 
        description='Discover our mission to revolutionize transportation 
        with electric vehicles—promoting a cleaner future, solar charging, 
        and beautiful interiors for a new era of sustainable mobility.' 
        url='https://enerplazevs.com/mission' />
        <div id='mission'>
        <section>
            <video autoPlay muted loop playsInline>
            <source src="/mission/1.mp4" type='video/mp4' />
            Your browser does not support the video tag
            </video>
            <div>
            <h2>Why Electric?</h2>
            <p>
                {purpose}
            </p>
            </div>
        </section>

        <section>
            {[{
            img:"/mission/green earth.jpg",
            title: 'Zero Emissions',
            text: 'Reduce your carbon footprint and help build a healthier planet for future generations.'
            }, {
            img: "/mission/car.jpg",
            title: 'Cost-Effective',
            text: 'Forget fuel queues. EVs cost less to run, especially when charged with solar power.'
            }, {
            img: "/mission/acceleration.jpg",
            title: 'Instant Performance',
            text: 'Feel the thrill of instant torque and responsive acceleration — every ride is a smooth rush.'
            }, {
            img: "/mission/interior.jpg",
            title: 'Elegant by Design',
            text: 'EVs combine silence and sophistication with interiors and designs that command attention.'
            }].map((item, index) => (
            <article key={index}>
                <div></div>
                <img src={item.img} alt={item.title} />
                <h3 ref={(el) => (elementRefs.current[index * 2] = el)}>{item.title}</h3>
                <p ref={(el) => (elementRefs.current[index * 2 + 1] = el)}>{item.text}</p>
            </article>
            ))}
        </section>
        </div>
    </>
  );
};

export default Mission;
