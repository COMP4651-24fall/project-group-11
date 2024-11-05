import React from 'react';
import './common.css';
import Banner from './HOME/banner.js';
import Product from './HOME/Product.js';
import { useSelector, useDispatch } from "react-redux";

const Home =() => {
  
  return (
    <div>
    <div  className='Square'>
      <Banner/>
    </div>
      <div className='Product'><Product/></div>
    </div>
    
   
  );
}

export default Home;