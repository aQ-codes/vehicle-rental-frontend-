// "use client"
import Hero from '@/components/Hero'
import QuickSearch from '@/components/QuickSearch'
import { Brands } from '@/modules/vehicles/components/brand-cards'
import React from 'react'

const page = () => {
  return (
    <>
      <Hero/>
      <QuickSearch/>
      <Brands/>
    </>
  )
}
  
export default page