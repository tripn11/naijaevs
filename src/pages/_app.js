import "../styles/app.scss";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { VehicleProvider } from "@/components/context/VehicleContext";

export default function App({ Component, pageProps }) {
  return (
    <VehicleProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </VehicleProvider>
  )
}