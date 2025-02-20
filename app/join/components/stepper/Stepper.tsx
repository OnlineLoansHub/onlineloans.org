import useStore from '../../stores/stepperStore'

import { ArrowLeft } from 'lucide-react'

import Footer from './Footer'

import StepIndicator from './StepIndicator'
import Step1 from './Step1'
import Step3 from './Step3'
import Step4 from './Step4'

const BusinessStepper: React.FC = () => {
  const { currentStep, decrementCurrentStep } = useStore()

  return (
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
        <Step3 currentStep={currentStep} />
        <Step4 currentStep={currentStep} />
      </main>

      <Footer />
    </div>
  )
}

export default BusinessStepper
