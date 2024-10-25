import { Outlet } from "react-router-dom";
import Header from '../components/Header';
import Banner from '../components/Banner';
import AllCategory from "../components/AllCategory";
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Banner />
      <AllCategory />
      <FAQ/>
      <Footer />
    </div>
  )
}
export default MainLayout