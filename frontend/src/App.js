import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import Menubar from "./components/Menubar";
import Home from "./pages/Home";
import Registration from './pages/Registration'
import Login from "./pages/Login";
import Vendor from "./pages/Vendor";
import Dashboard from "./pages/Dashboard";
import ProductUpload from "./pages/ProductUpload";
import StoreName from "./pages/StoreName";
import AdminDashboard from './pages/AdminDashboard'
import ProductPosition from "./pages/ProductPosition";
import Cart from "./pages/Cart";
import Coupon from "./pages/Coupon";
import Productdetails from "./pages/Productdetails";
import Compare from "./pages/Compare";
import Shop from "./pages/Shop";
import Counter from "./pages/Counter";

function App() {
  return (
    <>
      <BrowserRouter>
        <Menubar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Registration" element={<Registration/>}/>
            <Route path="/login" element={<Login/>} />     
            <Route path="/vendor" element={<Vendor/>} />     
            <Route path="/dashboard" element={<Dashboard/>} />     
            <Route path="/productupload" element={<ProductUpload/>} />      
            <Route path="/storename" element={<StoreName/>} />      
            <Route path="/admin" element={<AdminDashboard/>} />   
            <Route path="/productposition" element={<ProductPosition/>} />   
            <Route path="/cartpage" element={<Cart/>} />   
            <Route path="/coupon" element={<Coupon/>} />   
            <Route path="/productdetails/:id" element={<Productdetails/>} />   
            <Route path="/compare" element={<Compare/>} />   
            <Route path="/shop" element={<Shop/>} />   
            <Route path="/counter" element={<Counter/>} />   
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
