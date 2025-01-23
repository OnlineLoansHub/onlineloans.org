import Image from 'next/image'
import securityHelmet from '@/public/assets/under-construction/security-helmet.png'

export const MoreInfoSoonCard = () => {
  return (
    <section className='w-full max-w-[450px] lg:max-w-[550px] rounded-2xl p-4 sm:p-8 lg:p-10 bg-[#0477FE]'>
      <h3 className='text-white font-semibold italic text-[32px] md:text-[48px] lg:text-[64px] text-center'>
        More info soon!
      </h3>

      <div className='flex justify-center mt-2'>
        <Image
          src={securityHelmet}
          className='object-contain xl:size-16'
          height={56}
          width={56}
          alt='Helmet symbol'
          title='Helmet symbol'
        />
      </div>
    </section>
  )
}
