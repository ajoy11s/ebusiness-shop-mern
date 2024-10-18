import { Outlet } from "react-router-dom"
import Header from '../components/Header'
import Banner from '../components/Banner'
import Footer from '../components/Footer'

const MainLayout = () => {
    return (<>
      <Header />
      <Banner />
      <Outlet />
      <Footer />
    </>)
  }
  export default MainLayout