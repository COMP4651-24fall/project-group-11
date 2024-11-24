import React from 'react';
import './subPages_CSS/common.css';
import Banner from './Home_Components/Banner.js';
import Product from './Home_Components/Products.js';


const Home = () => {
  return (
    <div>
      <div className='banner'>
        <Banner />
      </div>
      <div className='Product'>
        <Product />
      </div>
    </div>
  );
}
export default Home;