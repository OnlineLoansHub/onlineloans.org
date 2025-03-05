'use client'
//Next
import Link from 'next/link'
import Script from 'next/script'
//Components
import { ArrowLeft, ArrowRight } from 'lucide-react'
import StepIndicator from '../components/StepIndicator'
import Step3 from '../components/Step3'
import TrustpilotFooter from '../components/TrustpilotFooter'

const Step3Page: React.FC = () => {
    return (
        <>
            {/* Google Tag Manager */}
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=AW-16834519489"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-16834519489');
            `}
            </Script>

            <div className='flex flex-col bg-white w-11/12 lg:w-8/12 mx-auto shadow-lg rounded-lg text-black relative'>
                <Link
                    href='/join/step2'
                    className='bg-blue text-white p-1 rounded-full absolute top-0 left-0 m-6'
                >
                    <ArrowLeft />
                </Link>

                {/* <Link
                    href='/join/step4'
                    className='bg-blue text-white p-1 rounded-full absolute top-0 right-0 m-6'
                >
                    <ArrowRight />
                </Link> */}

                <StepIndicator currentStep={3} />

                <main className='md:w-10/12 mx-auto lg:w-full'>
                    <Step3 />
                </main>

                <TrustpilotFooter />
            </div>
        </>
    )
}

export default Step3Page
