import { useState, useEffect } from 'react';
import VehicleWrap from './VehicleWrap';

const Brand = ({ brand, models, index }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (index === 0) {
      setVisible(true);
    }
  }, [index]);

  return models.length === 0 ? null : (
    <div className='brand'>
      <h2 onClick={() => setVisible(!visible)}>{brand.name}</h2>

      {visible &&<div className='brand-vehicles'>
        {models.map((model) => (
            <VehicleWrap key={model.id} vehicle={model} />
        ))}
      </div>}
    </div>
  );
};

export default Brand;

