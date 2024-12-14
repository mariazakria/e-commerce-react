import MainSliderHome from '../../components/MainSliderHome/MainSliderHome'
import CategorySliderHome from '../../components/CategorySliderHome/CategorySliderHome'
import TopProducts from '../../components/TopProducts/TopProducts'
import CustomerReviews from '../../components/CustomerReviews/CustomerReviews'
import Faq from '../../components/Faq/Faq'
import React from 'react'

export default function Home() {
  return (
    <>
      <MainSliderHome />
      <CategorySliderHome />
      <TopProducts />
      <CustomerReviews />
      <Faq />
    </>
  )
}
