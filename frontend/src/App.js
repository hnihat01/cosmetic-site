//import Navbar from './components/Homepage/Navbar';
import Navbar from './components/Navbar/Navbar';
import Categories from './components/Homepage/Categories';
import Card from './components/Homepage/Card';
import Products from './components/Homepage/Products';
import BioProductsCard from './components/Homepage/BioProductsCard';
import Footer from './components/Footer/Footer';
import IconsContainer from './components/Homepage/IconsContainer';
import VideoComponent from './components/Homepage/VideoComponent';
import NotFoundPage from './components/404/NotFoundPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetails from './components/ProductPage/ProductDetails';
import SimilarProducts from './components/ProductPage/SimilarProducts';
import TextContainer from './components/ProductPage/TextContainer';
import CartPage from './components/Cart/CartPage';
import FavouritePage from './components/Favourites/FavouritesPage';
import CategoryPage from './components/Category/CategoryPage';
import ProductsPage from './components/Products/ProductsPage';
import OrderConfirmation from './components/Orders/OrderConfirmation';
import AboutUsPage from './components/AboutUs/AboutUsPage';
import Search from './components/Search/Search';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import { UserProvider } from './components/Auth/UserContext';
import { useState, useEffect } from 'react';

// import Input from './components/Input/Input';
// import TabComponent from './components/ProductPage/TabComponent';
function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Retrieve the user ID from local storage
    const storedUserId = localStorage.getItem('userId');
    console.log(localStorage.getItem('userId'));
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);


  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query) => {
    console.log(query);
    setSearchQuery(query);
  };
  return  (
 <UserProvider value={userId}>
    <Router>
        <div className="App">
    <Routes>
      
      <Route path="/" element={
        <>
         <Navbar/>
          <VideoComponent />
          <IconsContainer />
          <Categories />
          <BioProductsCard />
          <Card />
          <Products />
          <Footer />
          
          
        </>
        
      } />
         <Route path="/cart" element={<>
       <Navbar/>
       <CartPage/>
       <Footer />
    </>
    } />
        <Route path="/favourite" element={<>
       <Navbar/>
       <FavouritePage/>
       <Footer />
    </>
    } />
    <Route path="/feed/posts/products/:productId" element={<>
    <Navbar/>
    <ProductDetails />
    <SimilarProducts />
    <TextContainer/>
    <Footer />
    </>
    } />
    <Route path="/products" element={<><Navbar/><Search setSearchQuery={handleSearch}/> <ProductsPage searchQuery={searchQuery} /><Footer/></>} />
    <Route path="/category/:category" element={<><Navbar/><CategoryPage /><Footer/></>} />
    <Route path="/orders" element={<><Navbar/><OrderConfirmation/><Footer/></>} />
    <Route path="/about" element={<><Navbar/><AboutUsPage/><Footer/></>} />
    <Route path="/register" element={<><Navbar/><RegisterPage/><Footer/></>} />
    <Route path="/login" element={<><Navbar/><LoginPage /><Footer/></>} />
    <Route path="*" element={<><Navbar/> <NotFoundPage /> </>} />

    </Routes>
       </div>
    </Router>
  
    </UserProvider>

  
  );
}


export default App;
/* <Typography level="body-xs" sx={{ display: 'flex', alignItems: 'center', marginTop:'20px' }}>
<CheckCircleOutlineIcon sx={{ marginRight: '5px', color:'#db5122' }} /> Available online
</Typography>
<Typography level="body-xs" sx={{ display: 'flex', alignItems: 'center', marginTop:'10px' }}>
<PriorityHighIcon sx={{ marginRight: '5px', color:'#db5122'  }} /> Stock in a store
</Typography> */