import { useState, useEffect } from 'react';
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



  const handleOrderNow = () => {
    router.push(`/support/order`);
  };

  const handleTestDrive = () => {
    router.push(`/support/test-drive`);
  };

  const imageChanger = (action) => {
    if (action === 'next') {
      setCurrentImage(prev => (prev + 1) % images.length);
    } else {
      setCurrentImage(prev => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  const formatNaira = (price) => {
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) return 'Invalid Price';

    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(numericPrice);
  };

  const vehiclePrice = formatNaira(selectedVehicle?.price);

  if (!selectedVehicle) return <div>Vehicle data not found.</div>;
  if (loading) return <Loading />;

  return (
    <>

    <SEO
      title={`${selectedVehicle.year} ${selectedVehicle.model}`} 
      description={`${selectedVehicle.year} ${selectedVehicle.model} is available for sale. Price: ${vehiclePrice}.`}
      url='https://enerplazevs.com/vehicles'
    />
      <div className='vehicle'>
      <div>
        {images.length > 0 && (
          <>
            {images[currentImage]?.mimeType?.startsWith('video') ? (
              <video
                src={images[currentImage].url}
                controls
              />
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
      <div className='price'>{vehiclePrice}</div>

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
