import { Outlet } from "react-router-dom";
import Header from '../components/Header';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Outlet />
      <Footer />
    </div>
  )
}
export default MainLayout