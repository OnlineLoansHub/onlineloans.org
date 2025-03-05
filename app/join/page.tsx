'use client'
import Link from 'next/link'
import Script from 'next/script'
import StepIndicator from './components/StepIndicator'
import Step1 from './components/Step1'
import TrustpilotFooter from './components/TrustpilotFooter'

import { ArrowRight } from 'lucide-react'

const JoinPage = () => {
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

      {/* Contenido del Stepper */}
      <div className='flex flex-col bg-white w-11/12 lg:w-8/12 mx-auto shadow-lg rounded-lg text-black relative mb-12'>
        <Link
          href='/join/step2'
          className='bg-blue text-white p-1 rounded-full absolute top-0 right-0 m-6'
        >
          <ArrowRight />
        </Link>

        <StepIndicator currentStep={1} />

        <main className='md:w-10/12 mx-auto lg:w-full'>
          <Step1 />
        </main>

        <TrustpilotFooter />
      </div>
    </>
  )
}

export default JoinPage