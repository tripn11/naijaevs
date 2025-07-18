import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';
import { useVehicle } from '@/components/context/VehicleContext';
import SEO from '@/components/SEO';

const overviewIcons = {
  "fuel_type": { icon: 'flash', color: '#ffa502' },
  "body_style": { icon: 'car-outline', color: '#1e90ff' },
  "dimensions(mm)": { icon: 'expand-outline', color: '#ffa502' },
  condition: { icon: 'build-outline', color: '#2ed573' },
  seats: { icon: 'people-outline', color: '#3742fa' },
  "seat_technology": { icon: 'square-outline', color: '#5352ed' },
  "sound_system": { icon: 'musical-notes-outline', color: '#ff7f50' },
  ambiance: { icon: 'color-palette-outline', color: '#eccc68' },
  "charging_speed": { icon: 'battery-charging-outline', color: '#70a1ff' },
  "bidirectional_charging": { icon: 'swap-horizontal-outline', color: '#2f3542' },
  safety: { icon: 'shield-checkmark-outline', color: '#2ed573' },
  assistance: { icon: 'accessibility-outline', color: '#1e90ff' },
  'power_output(hp)': { icon: 'speedometer-outline', color: '#ff4757' },
  'battery_capacity(kwh)': { icon: 'battery-half', color: '#3742fa' },
  'range(km)': { icon: 'map-outline', color: '#ffa502' },
  drivetrain: { icon: 'cog-outline', color: '#a29bfe' },
  'top_speed(km/h)': { icon: 'rocket-outline', color: '#ff6b81' },
  'acceleration(0-100)s': { icon: 'timer-outline', color: '#00b894' },
};

const Vehicle = () => {
  const router = useRouter();
  const { selectedVehicle } = useVehicle();

  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    if (selectedVehicle && selectedVehicle.images?.length > 0) {
      setImages(selectedVehicle.images);

      const imgPromises = selectedVehicle.images.map(img => {
        return new Promise(resolve => {
          const image = new Image();
          image.src = img.url;
          image.onload = resolve;
          image.onerror = resolve;
        });
      });

      Promise.all(imgPromises).then(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [selectedVehicle]);

  useEffect(() => {
    if (!selectedVehicle) {
      router.push('/vehicles/cars');
    }
  }, [selectedVehicle, router]);

  const imageChanger = (action) => {
    if (action === 'next') {
      setCurrentImage(prev => (prev + 1) % images.length);
    } else {
      setCurrentImage(prev => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  const handleTestDrive = () => router.push('/support/test-drive');
  const handleOrderNow = () => router.push('/support/order');

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) imageChanger('next');
    else if (diff < -50) imageChanger('prev');

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!selectedVehicle) return <div>Vehicle data not found.</div>;
  if (loading) return <Loading />;

  return (
    <>
      <SEO
        title={`${selectedVehicle.year} ${selectedVehicle.model}`}
        description={`${selectedVehicle.year} ${selectedVehicle.model} is available for sale. Explore its features, specifications, and pricing. Book a test drive or order now.`}
        url='https://enerplazevs.com/vehicles'
      />
      <div className='vehicle'>
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {images.length > 0 && (
            <>
              {images[currentImage]?.mimeType?.startsWith('video') ? (
                <video src={images[currentImage].url} controls />
              ) : (
                <img
                  src={images[currentImage]?.url}
                  alt={images[currentImage]?.alt}
                />
              )}
            </>
          )}
          <ion-icon name="chevron-forward-outline" id='next' onClick={() => imageChanger('next')}></ion-icon>
          <ion-icon name="chevron-back-outline" id='prev' onClick={() => imageChanger('prev')}></ion-icon>
          <div className='guide'>
            {images.map((_, index) => (
              <div key={index} className={currentImage === index ? 'active' : ''}></div>
            ))}
          </div>
        </div>

        <h3 className='model'>{selectedVehicle.year} {selectedVehicle.model}</h3>
        <div className='price'><a href={`https://wa.me/2348037543295?text=Hi, what is the price of the ${selectedVehicle.year} ${selectedVehicle.model}?`}>Ask for Price</a></div>

        <div className='overview'>
          <h3>Overview</h3>
          <div className='overview-grid'>
            {Object.entries(selectedVehicle.overview || {})
              .filter(([_, value]) => value !== '' && value !== null && value !== undefined)
              .map(([key, value]) => {
                const icon = overviewIcons[key];
                const label = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

                return (
                  <div className='overview-item' key={key}>
                    {icon && <ion-icon name={icon.icon} style={{ color: icon.color }} />}
                    <div>
                      <strong>
                        {typeof value === 'string'
                          ? value.charAt(0).toUpperCase() + value.slice(1)
                          : value}
                      </strong>
                      <div>{label}</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div>
          <button onClick={handleTestDrive}>Book a Test Drive</button>
          <button onClick={handleOrderNow}>Order Now</button>
        </div>
      </div>
    </>
  );
};

export default Vehicle;