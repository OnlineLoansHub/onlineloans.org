'use client'
import { MontserratFont } from '@/app/Fonts'

import MainFooter from './components/Footer'
import { useClarity } from '../Clarity'

import Logo from '@/public/assets/apply/header/logo.png'
import Image from 'next/image'

import useStore from './stores/stepperStore'

import { ArrowLeft } from 'lucide-react'

import Footer from './components/stepper/Footer'

import StepIndicator from './components/stepper/StepIndicator'
import Step1 from './components/stepper/Step1'


const Test: React.FC = () => {
  
  const { currentStep, decrementCurrentStep } = useStore()
  useClarity({ id: 'q2nk0pkquq' })
  //q2nk0pkquq
  
  return (
    <main className={MontserratFont.className}>
      {/* ------------ MAIN ------------ */}

      <div className='flex flex-col items-center justify-center py-3 relative'>
        <Image src={Logo} alt='logo' width={200} height={200} />
      </div>
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

      {/* ------------ BUSINESS STEPPER ------------ */}

      <div className='flex flex-col bg-white w-11/12 lg:w-8/12 mx-auto shadow-lg  rounded-lg  text-black relative'>
      <button
        className='bg-blue text-white p-1 rounded-full absolute top-0 left-0 m-3'
        onClick={decrementCurrentStep}
      >
        <ArrowLeft />
      </button>
      <StepIndicator currentStep={currentStep} />

      <main className=' md:w-10/12 mx-auto lg:w-full  '>
        <Step1 currentStep={currentStep} />
      </main>

      <Footer />
    </div>

      <div className='bg-blue text-white py-1 h-[25vh] lg:py-7 lg:h-[35vh] w-full md:py-8 absolute top-16 -z-[50]'></div>
      <MainFooter />
    </main>
  )
}
export default Test
