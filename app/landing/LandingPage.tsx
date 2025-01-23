import React from 'react'
import FloatBtn from './components/FloatBtn'
import Hero from './components/sections/Hero'
import UnderConstruction from './components/sections/UnderConstruction'

const LandingPage: React.FC = () => {
  return (
    <main className='flex flex-col gap-10 md:gap-16 lg:gap-20 xl:gap-28'>
      <Hero />
      <UnderConstruction />

      <FloatBtn />
    </main>
  )
}

export default LandingPage
