import bgTop from '@/public/assets/hero/bg-top.png'
import bgBottom from '@/public/assets/hero/bg-bottom.png'

import financeDisplay from '@/public/assets/hero/finance-display.png'
import {
  ApplyNowButton,
  HeroHeader,
  TrustPilot,
} from '@/app/landing/components/sections-components/HeroComponents'
import Image from 'next/image'

const Hero = () => {
  return (
    <section
      className='flex justify-center items-center relative bg-[#F7F8FA] z-20'
      id='hero-section'
    >
      <Image
        src={bgTop}
        className=' absolute top-0 left-0 h-[30%] w-screen mt-[80px]'
        alt=''
      />
      <Image
        src={bgBottom}
        className='absolute bottom-0 left-0 h-[20%] w-screen'
        alt=''
      />

      <div className='sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1300px] w-full px-2 sm:px-6 md:px-8 lg:px-10 flex flex-col justify-between items-center gap-8 pt-[110px] lg:pt-[110px]'>
        <TrustPilot />

        <HeroHeader />

        <ApplyNowButton />

        <Image
          src={financeDisplay}
          className='object-contain relative bottom-0 max-w-[800px] w-full'
          alt='Mobile financial display'
          title='Mobile financial display'
        />
      </div>
    </section>
  )
}

export default Hero
