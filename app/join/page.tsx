'use client'
import Script from 'next/script'
import StepIndicator from './components/stepper/StepIndicator'
import Step1 from './components/stepper/Step1'
import TrustpilotFooter from './components/stepper/TrustpilotFooter'

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
        <StepIndicator currentStep={1} />

        <main className='md:w-10/12 mx-auto lg:w-full'>
          <Step1 currentStep={1} />
        </main>

        <TrustpilotFooter />
      </div>
    </>
  )
}

export default JoinPage