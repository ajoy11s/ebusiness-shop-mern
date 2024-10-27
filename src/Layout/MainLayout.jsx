import { Outlet } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Banner from '../components/Banner';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Outlet />
      <FAQ/>
      <Footer />
    </div>
  )
}
export default MainLayout