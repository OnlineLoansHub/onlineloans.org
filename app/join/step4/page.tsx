'use client'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import StepIndicator from '../components/StepIndicator'
import Step4 from '../components/Step4'
import TrustpilotFooter from '../components/TrustpilotFooter'

const Step4Page: React.FC = () => {
    return (
        <div className='flex flex-col bg-white w-11/12 lg:w-8/12 mx-auto shadow-lg rounded-lg text-black relative'>
            <Link
                href='/join/step3'
                className='bg-blue text-white p-1 rounded-full absolute top-0 left-0 m-6'
            >
                <ArrowLeft />
            </Link>

            <Link
                href='/join/step4'
                className='bg-blue text-white p-1 rounded-full absolute top-0 right-0 m-6'
            >
                <ArrowRight />
            </Link>

            <StepIndicator currentStep={4} />

            <main className='md:w-10/12 mx-auto lg:w-full'>
                <Step4 />
            </main>

            <TrustpilotFooter />
        </div>
    )
}

export default Step4Page
