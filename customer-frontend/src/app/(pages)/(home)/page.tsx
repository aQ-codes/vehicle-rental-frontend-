import Hero from '@/components/Hero'
import QuickSearch from '@/components/QuickSearch'
import LocationPicker from '@/modules/vehicles/components/location-filter'
import React from 'react'

const page = () => {
  return (
    <>
      <Hero/>
      <LocationPicker/>
      <QuickSearch/>
    </>

  )
}

export default page