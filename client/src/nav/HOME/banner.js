import React from 'react'
import './banner.css'
import Carousel from 'react-material-ui-carousel'

const data=[
    "https://cdn.shopify.com/s/files/1/0651/6670/4885/files/Best_Motherboard.webp?v=1695560087",
    "https://gamextreme.ph/cdn/shop/files/ps5-banner-desktop-new-1.jpg?v=1614367681"
]
const Banner = ()=>{
    return(
    <div className='Banner'>
    <Carousel
    className='banner'
    autoPlay={true}
    animation='slide'
    navButtonsAlwaysInvisible={true}
    cycleNavigation={true}
   >
        {
        data.map((image,i)=>{
            return(
                <>
                    <img src ={image} alt="" className='banner_img'/>
                </>
            )
        })
    }

    </Carousel>
    </div>
    );

    
}
export default Banner;