// app/join/layout.jsx (o .tsx si usas TypeScript)
'use client'
import { MontserratFont } from '@/app/Fonts'
import MainFooter from './components/Footer'
import { useClarity } from '../Clarity'
import Logo from '@/public/assets/apply/header/logo.png'
import Image from 'next/image'

const JoinLayout = ({ children }) => {
  useClarity({ id: 'q2nk0pkquq' })

  return (
    <main className={MontserratFont.className}>
      <div className='flex flex-col items-center justify-center py-3 relative'>
        <Image src={Logo} alt='logo' width={200} height={200} />
      </div>

      <div className='bg-blue text-white py-1 h-[25vh] lg:py-7 lg:h-[35vh] w-full md:py-8 absolute top-16 -z-[50]'></div>

      <div className='py-6 lg:py-9 px-4 lg:px-0'>
        <section className='px-2 flex flex-col gap-2'>
          <p className='text-center text-white text-[26px] lg:text-[45px] font-bold  lg:leading-[56px]'>
            Find The Perfect Loan For Your Business
          </p>
          <p className=' text-center text-white text-base lg:text-2xl font-medium lg:leading-[31px]'>
            Qualify For A $5,000 - $5,000,000 Business Loan or Credit Line In
            Minutes
          </p>
        </section>
      </div>

      {/* Aquí va el contenido específico de cada página (children) */}
      {children}

      <section className='mt-10'>
        <MainFooter />
      </section>
    </main>
  )
}

export default JoinLayout