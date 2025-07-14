import axios from 'axios';
import { useRouter } from 'next/router';
import Brand from '../../../components/Brand';
import SEO from '../../../components/SEO';

export async function getStaticPaths() {
  return {
    paths: [
        { params: { VehicleType: 'cars' } },
        { params: { VehicleType: 'tricycles' } },
        { params: { VehicleType: 'motorcycles' } },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  let brands = [];
  let models = {};

  try {
    const res = await axios.get(`${apiUrl}/api/brands?where[vehicleType.name][equals]=${params.VehicleType}&depth=1`);
    brands = res?.data?.docs?.sort((a, b) => a.name.localeCompare(b.name));

    if (brands.length === 0) {
      throw new Error("no brands found");
    } else {
      await Promise.all(
        brands.map(async (brand) => {
          try {
            const modelResponse = await axios.get(`${apiUrl}/api/vehicles?where[brand.id][equals]=${brand.id}&depth=1`);
            models[brand.name] = modelResponse.data.docs;
          } catch (error) {
            console.log('Error fetching models for', brand.name, error);
            models[brand.name] = [];
          }
        })
      );
    }
  } catch (error) {
    console.log('Error fetching brands:', error);
  }
  return {
    props: {
      brands,
      models,
    },
    revalidate: 1,
  };
}

const VehicleType = ({ brands, models }) => {
    const router = useRouter();
    const vehicleType = router.query.VehicleType;

    if (!brands || brands.length === 0) {
        return <div className='brands-container'><p>No Vehicles in this category</p></div>;
    }

    return (
        <>
            <SEO
                title={`${vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)}`}
                description={`Discover the latest ${vehicleType} in the enerplaz.`}
                url={`https://enerplazevs.com/vehicles/${vehicleType}`}
            />

            <div className='brands-container'>
                {brands.map((brand, index) => (
                    <Brand key={brand.id} brand={brand} models={models[brand.name]} index={index} />
                ))}
            </div>
        </>

    );
};

export default VehicleType;