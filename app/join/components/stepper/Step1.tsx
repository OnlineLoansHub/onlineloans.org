import useStore from '../../stores/stepperStore'
import React, { useState, useEffect } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

interface Step1Props {
  currentStep: number
}

const Step1: React.FC<Step1Props> = ({ currentStep }) => {

  // -------------------- States -------------------- .
  // Simple inputs, local states
  const [fullName, setFullName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [revenue, setRevenue] = useState('')
  const [revenueError, setRevenueError] = useState('')
  
  // Email and Phone, local states
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  
  const [validated, setValidated] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  // Errors, local state
  const [errors, setErrors] = useState({
    fullName: '',
    businessName: '',
    revenue: '',
    phone: '',
    email: '',
  })

  // Store, global states
  const { setUserRegisterInfo, setBusinessRegisterInfo, businessRegisterInfo, reset } = useStore()


  // -------------------- UseEffect -------------------- .
  useEffect(() => {
    const nameValid = fullName.trim().length >= 3
    const businessValid = businessName.trim().length >= 3
    const revenueNumber = Number(revenue.replace(/,/g, ''))
    const revenueValid = revenueNumber >= 40000
    const phoneValid = validatePhone(phoneNumber)
    const emailValid = validateEmail(email)
    
    setErrors({
      fullName: !nameValid && fullName.trim() !== '' ? 'Full name must be at least 3 characters' : '',
      businessName: !businessValid && businessName.trim() !== '' ? 'Business name must be at least 3 characters' : '',
      revenue: revenue && !revenueValid ? 'Minimum revenue required is $40,000' : '',
      phone: !phoneValid && phoneNumber.trim() !== '' ? 'Phone number must have at least 8 digits' : '',
      email: !emailValid && email.trim() !== '' ? 'Please enter a valid email address' : '',
    })

    setIsFormValid(
      nameValid && 
      businessValid && 
      revenueValid && 
      phoneValid && 
      emailValid
    )

    setRevenueError(
      revenue && !revenueValid 
        ? 'Minimum revenue required is $40,000'
        : ''
    )
  }, [fullName, businessName, revenue, phoneNumber, email])

  // -------------------- Validations -------------------- .
  const formatCurrency = (value: string): string => {
    // Elimina todo excepto números
    const numbers = value.replace(/[^\d]/g, '')
    
    // Convierte a número y formatea con comas
    const formatted = Number(numbers).toLocaleString('en-US')
    
    return numbers ? `$${formatted}` : ''
  }

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '')
    setRevenue(rawValue) // Guardamos el valor sin formato
  }

  const validatePhone = (phone: string) => {
    const numericPhone = phone.replace(/\D/g, '')
    return numericPhone.length >= 8
  }
  
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // -------------------- Handle Continue -------------------- .
  const handleContinue = async () => {
    if (!isFormValid) return
    setValidated(true)
    setLoading(true)

    console.log('Data to send: ', {fullName, phoneNumber, email, businessName, revenue});
    
    const updatedUserInfo = {
      firstName: fullName.trim(),
      phoneNumber,
      email,
    }

    const updatedBusinessInfo = {
      businessName,
      revenue,
    }

    setUserRegisterInfo(updatedUserInfo)
    setBusinessRegisterInfo(updatedBusinessInfo)
    // incrementCurrentStep()

    console.log("Info enviada a la API mi pa");
    setLoading(false)
    // Send the Lead to the API
    // try {
    //   const response = await fetch(
    //     'https://hubspot-proxy-0d8d4ed31dcb.herokuapp.com/leadPush?pid=oncash',
    //     {
    //       method: 'POST',
    //       headers: new Headers({
    //         'Content-Type': 'text/plain;charset=utf-8',
    //       }),
    //       body: JSON.stringify({
    //         properties: {
    //           email: email,
    //           firstname: fullName.trim(),
    //           phone: phoneNumber,
    //           business_type: businessRegisterInfo.businessType,
    //           bank_account: businessRegisterInfo.bankAccount,
    //           loan_amount: businessRegisterInfo.quantity,
    //           user_href: window.location.href,
    //           credit_score: businessRegisterInfo.creditScore,
    //           business_name: businessName,
    //         },
    //       }),
    //     }
    //   )
  
    //   if (response.ok) {
    //     //@ts-ignore
    //     window.gtag('event', 'conversion', {
    //       send_to: 'AW-16834519489/Q5TZCLLY05MaEMHDqds-',
    //       event_callback: () => {
    //         reset()
    //         window.location.href = '/thank-you'
    //       },
    //     })
    //   }
    // } catch (error) {
    //   console.error('Error sending the form data:', error)
    // } finally {
    //   setLoading(false)
    // }
  }

  // -------------------- Return -------------------- .
  return (
    <div
      className={`w-full mx-auto px-3 ${
        currentStep !== 1 ? 'hidden' : 'block'
      }`}
    >
      <div className='text-center mb-6'>
        <h2 className='text-xl font-bold mb-1 lg:leading-[38px] lg:text-3xl lg:font-bold'>
          What&apos;s your name and business revenue?
        </h2>
      </div>

      <div className='w-full lg:w-5/12 mx-auto flex flex-col gap-6'>
        {/* <div className='relative shadow-md flex flex-col gap-4'>
          <input
            type='text'
            placeholder='Full Name'
            className='w-full rounded-lg border-2 p-3 appearance-none bg-white text-gray-700 hover:border-blue transition-colors'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type='text'
            placeholder='Businesss Name'
            className='w-full rounded-lg border-2 p-3 appearance-none bg-white text-gray-700 hover:border-blue transition-colors'
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
          <div className="flex flex-col gap-1">
            <input
              type='text'
              placeholder='Average Yearly Business Revenue'
              className={`w-full rounded-lg border-2 p-3 appearance-none bg-white text-gray-700 hover:border-blue transition-colors ${
                revenueError ? 'border-red-500' : ''
              }`}
              value={formatCurrency(revenue)}
              onChange={handleNumberInput}
            />
            {revenueError && (
              <span className="text-red-500 text-sm">{revenueError}</span>
            )}
          </div>
        </div> */}
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Business Name"
            className={`w-full rounded-lg border-2 p-3 appearance-none bg-white text-gray-700 hover:border-blue transition-colors ${
              errors.businessName ? 'border-red-500' : ''
            }`}
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
          {errors.businessName && (
            <span className="text-red-500 text-sm">{errors.businessName}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Full Name"
            className={`w-full rounded-lg border-2 p-3 appearance-none bg-white text-gray-700 hover:border-blue transition-colors ${
              errors.fullName ? 'border-red-500' : ''
            }`}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && (
            <span className="text-red-500 text-sm">{errors.fullName}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Average Yearly Business Revenue"
            className={`w-full rounded-lg border-2 p-3 appearance-none bg-white text-gray-700 hover:border-blue transition-colors ${
              errors.revenue ? 'border-red-500' : ''
            }`}
            value={formatCurrency(revenue)}
            onChange={handleNumberInput}
          />
          {errors.revenue && (
            <span className="text-red-500 text-sm">{errors.revenue}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <PhoneInput
            country={'us'}
            value={phoneNumber}
            onChange={setPhoneNumber}
            countryCodeEditable={false}
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">{errors.phone}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="email"
            placeholder="Email address"
            className={`w-full rounded-lg border-2 p-3 appearance-none bg-white text-gray-700 hover:border-blue transition-colors ${
              errors.email ? 'border-red-500' : ''
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </div>

        <button
          onClick={handleContinue}
          disabled={!isFormValid || validated || loading}
          className={`w-full py-3 px-6 text-xl lg:text-[28px] text-white font-bold transition-colors ${
            isFormValid
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-gray cursor-not-allowed'
          }`}
        >
           {loading ? <span className="loader">Loading</span> : 'Continue'}
        </button>
      </div>
    </div>
  )
}

export default Step1