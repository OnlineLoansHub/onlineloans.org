import whiteStar from '@/public/assets/hero/white-star.png'
import whiteStarGray from '@/public/assets/hero/white-star-gray.png'
import greenStar from '@/public/assets/hero/green-star.png'
import ribbonPng from '@/public/assets/hero/ribbon.png'
import arrow from '@/public/assets/hero/arrow.png'
import ctaRibbon from '@/public/assets/hero/cta-ribbon.png'
import Image from 'next/image'

export const TrustPilot = () => {
  return (
    <article className='bg-white rounded-2xl flex justify-center items-center gap-1.5 shadow-[0px_0px_20px_-9px_#00000024] py-3.5 w-full sm:max-w-max max-w-[350px] sm:px-8 relative z-40'>
      <Image
        src={greenStar}
        className='object-contain'
        height={16}
        width={16}
        alt=''
      />

      <span className='font-medium text-sm sm:text-base md:text-lg'>
        Trustpilot
      </span>

      <div className='flex items-center gap-1 md:gap-2'>
        <Image
          src={whiteStar}
          className='object-contain'
          height={16}
          width={16}
          alt=''
        />
        <Image
          src={whiteStar}
          className='object-contain'
          height={16}
          width={16}
          alt=''
        />
        <Image
          src={whiteStar}
          className='object-contain'
          height={16}
          width={16}
          alt=''
        />
        <Image
          src={whiteStar}
          className='object-contain'
          height={16}
          width={16}
          alt=''
        />
        <Image
          src={whiteStarGray}
          className='object-contain'
          height={16}
          width={16}
          alt=''
        />
      </div>

      <span className='font-light text-xs sm:font-normal sm:text-sm md:text-base'>
        4.9 Rating
      </span>
    </article>
  )
}

export const HeroHeader = () => {
  return (
    <>
      <h1 className='text-[40px] font-semibold text-[#111827] leading-none text-center md:text-[64px] md:leading-tight md:font-medium lg:font-bold'>
        <span className='mb-2'>Empowering Your </span>
        <br className='hidden lg:block' />
        <span className='mb-2'>Business with </span>

        <div className='relative inline-block'>
          <span className='italic'>AI-Driven</span>
          <Image
            src={ribbonPng}
            className='absolute -bottom-2 left-0 w-full'
            alt='decorative underline'
          />
        </div>
        <br className='hidden lg:block' />
        <span className='mt-2'>Working Capital</span>
      </h1>

      <p className='text-[#303030A3] text-center font-light text-[14px] md:text-[16px]'>
        Unlock Fast, Easy Money for Your Business. At ProCash.ai, we know every
        business is different.
        <br className='hidden md:block' />
        Whether you want to grow, need money for daily costs, or new things, our
        AI-Driven working
        <br className='hidden md:block' />
        capital gives you the money you need quickly.
      </p>
    </>
  )
}

export const ApplyNowButton = () => {
  return (
    <article className='relative'>
      <button className='flex items-center justify-center gap-3 py-6 px-12 bg-[#0477FE] border-[1px] border-[#201564] rounded-full hover:scale-95 transition-all duration-200 hover:bg-[#201564]'>
        <span className='text-white text-[18px]'>Apply now</span>
        <Image
          src={arrow}
          className='object-contain'
          height={20}
          width={20}
          alt=''
        />
      </button>

      <Image
        className='hidden absolute md:block md:top-0 md:right-0 md:-mt-20 md:-mr-56'
        src={ctaRibbon}
        alt='Arrow to CTA button'
        title='Arrow to CTA button'
      />
    </article>
  )
}
