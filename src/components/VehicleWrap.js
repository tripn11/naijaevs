import { useRouter } from "next/router";
import { useVehicle } from "./context/VehicleContext";

const VehicleWrap = ({ vehicle }) => {
  const router = useRouter();

  const { setSelectedVehicle } = useVehicle();

  const handleClick = () => {
    setSelectedVehicle(vehicle);
    router.push(`/vehicles/${vehicle.vehicle_type.name}/${vehicle.model}`);
  };

  const formatNaira = (price) => {
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) return 'Invalid Price';
    const formatter = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    });
    return formatter.format(numericPrice);
  };

  const vehiclePrice = formatNaira(vehicle.price);

  return (
    <div onClick={handleClick} className='vehicle-wrap'>
      <img
        src={vehicle.images[0]?.thumbnailURL}
        alt={vehicle.model} 
      />
      <div>
        <span>{`${vehicle.year} ${vehicle.model}`}</span>
        <span>{vehiclePrice}</span>
      </div>
    </div>
  );
};

export default VehicleWrap;