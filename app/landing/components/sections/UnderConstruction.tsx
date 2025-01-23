import ribbonPng from '@/public/assets/under-construction/ribbon.png'
import { MoreInfoSoonCard } from '@/app/landing/components/sections-components/UnderConstructionComponents'
import Image from 'next/image'

const UnderConstruction = () => {
  return (
    <section className='flex justify-center items-center'>
      <div className='sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1300px] w-full px-2 sm:px-6 md:px-8 lg:px-10 flex flex-col justify-between items-center gap-8'>
        <h2 className='text-[40px] font-semibold text-[#111827] leading-none text-center md:text-[64px] md:leading-tight md:font-medium'>
          <span className='mb-2'>Under </span>

          <div className='relative inline-block'>
            <span className='italic'>Construction</span>
            <Image
              src={ribbonPng}
              className='absolute -bottom-2 left-0 w-full'
              alt='decorative underline'
            />
          </div>
        </h2>

        <p className='text-[#303030A3] text-center font-light text-[14px] md:text-[16px]'>
          Our team is working to prepare a great and useful website for you. We
          <br className='hidden md:block' />
          continue to work hard to give you the best experience.
          <br className='hidden md:block' />
        </p>

        <MoreInfoSoonCard />
      </div>
    </section>
  )
}

export default UnderConstruction
