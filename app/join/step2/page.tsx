'use client'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import StepIndicator from '../components/stepper/StepIndicator'
import Step2 from '../components/stepper/Step2'
import TrustpilotFooter from '../components/stepper/TrustpilotFooter'

const Step2Page: React.FC = () => {
  return (
    <div className='flex flex-col bg-white w-11/12 lg:w-8/12 mx-auto shadow-lg rounded-lg text-black relative'>
      <Link
        href='/join'
        className='bg-blue text-white p-1 rounded-full absolute top-0 left-0 m-6'
      >
        <ArrowLeft />
      </Link>

      <StepIndicator currentStep={2} />

      <main className='md:w-10/12 mx-auto lg:w-full'>
        <Step2 currentStep={2} />
      </main>

      <TrustpilotFooter />
    </div>
  )
}

export default Step2Page
