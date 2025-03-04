'use client'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import StepIndicator from '../components/stepper/StepIndicator'
import Step3 from '../components/stepper/Step3'
import TrustpilotFooter from '../components/stepper/TrustpilotFooter'

const Step3Page: React.FC = () => {
    return (
        <div className='flex flex-col bg-white w-11/12 lg:w-8/12 mx-auto shadow-lg rounded-lg text-black relative'>
            <Link
                href='/join/step2'
                className='bg-blue text-white p-1 rounded-full absolute top-0 left-0 m-6'
            >
                <ArrowLeft />
            </Link>

            <StepIndicator currentStep={3} />

            <main className='md:w-10/12 mx-auto lg:w-full'>
                <Step3 currentStep={3} />
            </main>

            <TrustpilotFooter />
        </div>
    )
}

export default Step3Page
