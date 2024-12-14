import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import Error from '../Error/Error'
import React from 'react'
export default function CategorySliderHome() {
  const { data: categories, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategory,
    select: (categories) => categories.data.data
  })
  function getAllCategory() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }
  if (isError) {
    return  <Error/>
  }
  const settings = {
    dots: false,
    infinite: true,  // تغيير إلى infinite بدلاً من loop
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 800, // زيادة السرعة
    pauseOnHover: true,
    cssEase: "ease-out", // التأثير لتسريع السلاسة
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <div className="mb-10 container mx-auto outline-none">
      <h2 className='font-semibold text-lg mb-3 text-center text-textColor'>Shop Popular Categories</h2>
      <Slider {...settings}>
        {categories?.map((cat) => (
          <Link to={`/Categories/${cat.name}`} key={cat._id} className="p-2">
           {
            cat === 0 ?<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic, ipsa. </p> :
           <div>
           <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-[150px] sm:h-[200px] md:h-[250px] object-cover rounded-md shadow-md outline-none focus:outline-none"
            />
            <h3 className="text-center font-bold text-sm sm:text-lg mt-2">
              {cat.name}
            </h3>
           </div>
           }
          </Link>
        ))}
      </Slider>
    </div>
  )
}
