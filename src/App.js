import  { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  Header  from './components/header'
import Home from './pages/home'
import Asaid from './components/asaid'
import Footer from './components/footer'
import SingleProduct from "./pages/singleProduct";
import CategoryPage from "./pages/categoryPage/CategoryPage";
import LoginForm from "./pages/login";
import About from "./pages/about/About";
import Register from "./pages/register";

import AdminMainPage from "./admin/admin_main_page/AdminMainPage";
import AddCat from "./admin/addCat/AddCat";
import AddProduct from "./admin/AddProduct/AddProduct";
import ProductControll from "./admin/productControll/ProductControll";
import './App.scss'

function App() {

  const [ active, setActive ] = useState(false)
  // const [ admin, setAdmin ] = useState(false); 
  return (
    <div className="App">
      <Router>
        <Header active={active} setActive={setActive}/>
        <Asaid active={active} setActive={setActive}/>
        <div className="Content" >
          <Routes>
            <Route path="/" element = {<Home />} />
            <Route path="/prod/:id" element = {<SingleProduct />} />
            <Route path="/cat/:id" element = {<CategoryPage />} />
            <Route path="/login" element = {<LoginForm />} />
            <Route path="/about" element = {<About />} />
            <Route path="/register" element = {<Register />} />

            <Route path="/admin" element = {<AdminMainPage />} />
            <Route path="/add-cat" element = {<AddCat /> } />
            <Route path="/add-prod" element = {<AddProduct /> } />
            <Route path="product-controll" element = {<ProductControll />} />

          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
