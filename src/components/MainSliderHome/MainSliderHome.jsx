import sliderOne from "../../assets/images/slider-image-1.jpeg"
import sliderTow from "../../assets/images/slider-image-2.jpeg"
import sliderThree from "../../assets/images/slider-image-3.jpeg"
import sliderFirst from "../../assets/images/grocery-banner-2.jpeg"
import sliderSecond from "../../assets/images/grocery-banner.png"
import React from "react"
export default function MainSliderHome() {
    return (
        <>
            <div className=' my-10 grid grid-cols-12'>
               <div className='col-span-12  sm:col-span-8'>  
               <swiper-container slides-per-view="1"
                    speed="500"
                    loop="true"
                    autoplay="true"
                    autoplay-delay="3000"  // الوقت بين التبديلات (بالملي ثانية)
                    autoplay-disable-on-interaction="false" // stop action when i hover on slider 
                    events-prefix="swiper-"
                    scrollbar="true"
                    style={{height:"100%"}}>                  
                    <swiper-slide  style={{height:"100%"}}>
                            <img src={sliderOne} className='w-full h-full object-cover' alt="This is image for slider  one" />
                    </swiper-slide>
                    <swiper-slide   style={{height:"100%"}} >
                 
                            <img src={sliderTow} className='w-full  h-full object-cover' alt="This is image for slider two " />

                    </swiper-slide>
                    <swiper-slide   style={{height:"100%"}}>
         
                            <img src={sliderThree} className='w-full h-full object-cover' alt="This is image for slider three "  />

         
                    </swiper-slide>
                </swiper-container>
               </div>
                <div className='col-span-4   hidden sm:block'>
                    <div className='h-1/2'> 
                    <img src={sliderFirst}   className='w-full  h-full  object-cover' alt="his is image for slider four " />

                    </div>
                    <div className='h-1/2'>
                    <img src={sliderSecond}   className='w-full  h-full  object-cover' alt="his is image for slider five " />

                    </div>
                </div>
            </div>

        </>
    )
}
