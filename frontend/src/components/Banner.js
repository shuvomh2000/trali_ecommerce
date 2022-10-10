import React, { useEffect, useState } from 'react'
import { Carousel} from 'rsuite';
import axios from 'axios'

const Banner = () => {
    let [banner,setBanner] = useState([])

    useEffect(async()=>{
        let bannerData = await axios.get('http://localhost:8000/banner')
        setBanner(bannerData.data)
    },[])
  return (
    <>
    <Carousel autoplay className="custom-slider">
    {banner.map(item=>(
        <div className='sliderItem' style={{backgroundImage: `url(${item.img})`}}>
            <div className='container'>
            <h3>{item.subheading}</h3>
            <h1>{item.heading}</h1>
            <a>{item.button}</a>
            </div>
        </div>
    ))}
       
    </Carousel>
    </>
  )
}

export default Banner