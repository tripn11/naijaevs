import { useRouter } from "next/router";
import { useVehicle } from "./context/VehicleContext";

const VehicleWrap = ({ vehicle }) => {
  const router = useRouter();

  const { setSelectedVehicle } = useVehicle();

  const handleClick = () => {
    setSelectedVehicle(vehicle);
    router.push(`/vehicles/${vehicle.vehicle_type.name}/${vehicle.model}`);
  };

  return (
    <div onClick={handleClick} className='vehicle-wrap'>
      <img
        src={vehicle.images[0]?.thumbnailURL}
        alt={vehicle.model} 
      />
      <div>
        <span>{`${vehicle.year} ${vehicle.model}`}</span>
      </div>
    </div>
  );
};

export default VehicleWrap;