import useStore from '../../stores/stepperStore'

import { ArrowLeft } from 'lucide-react'
import Step1 from './Step1'

import Footer from './Footer'

import StepIndicator from './StepIndicator'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'
import Step6 from './Step6'
import Step7 from './Step7'
import Step8 from './Step8'
import Step9 from './Step9'
import Step10 from './Step10'
import Step11 from './Step11'

const BusinessStepper: React.FC = () => {
  const { currentStep, decrementCurrentStep } = useStore()

  return (
    <div className='flex flex-col bg-white w-11/12 lg:w-8/12 mx-auto shadow-lg -mt-[36px] md:-mt-[18%] lg:-mt-[150px] rounded-lg relative  2xl:-mt-[150px] text-black'>
      <button
        className='bg-blue-500 text-white p-1 rounded-full absolute top-0 left-0 m-3'
        onClick={decrementCurrentStep}
      >
        <ArrowLeft />
      </button>
      <StepIndicator currentStep={currentStep} />

      <main className=' md:w-10/12 mx-auto lg:w-full  '>
        <Step1 currentStep={currentStep} />
        <Step2 currentStep={currentStep} />
        <Step3 currentStep={currentStep} />
        <Step4 currentStep={currentStep} />
        <Step5 currentStep={currentStep} />
        <Step6 currentStep={currentStep} />
        <Step7 currentStep={currentStep} />
        <Step8 currentStep={currentStep} />
        <Step9 currentStep={currentStep} />
        <Step10 currentStep={currentStep} />
        <Step11 currentStep={currentStep} />
      </main>

      <Footer />
    </div>
  )
}

export default BusinessStepper
