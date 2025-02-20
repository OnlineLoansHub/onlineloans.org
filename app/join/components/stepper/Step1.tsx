import useStore from '../../stores/stepperStore'
import React, { useState, useEffect } from 'react'

interface Step1Props {
  currentStep: number
}

const Step1: React.FC<Step1Props> = ({ currentStep }) => {
  const [fullName, setFullName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [revenue, setRevenue] = useState('')
  const [validated, setValidated] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [revenueError, setRevenueError] = useState('')

  const { setUserRegisterInfo, setBusinessRegisterInfo, incrementCurrentStep } = useStore()

  useEffect(() => {
    const revenueNumber = Number(revenue.replace(/,/g, ''))
    const isRevenueValid = revenueNumber >= 40000

    setIsFormValid(
      fullName.trim().length >= 3 && 
      businessName.trim().length >= 3 && 
      isRevenueValid
    )

    setRevenueError(
      revenue && !isRevenueValid 
        ? 'Minimum revenue required is $40,000'
        : ''
    )
  }, [fullName, businessName, revenue])

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

  const handleContinue = () => {
    if (!isFormValid) return
    setValidated(true)

    console.log('Valores a guardar:', {
      firstName: fullName,
      businessName: businessName,
      revenue: revenue
  })
    setUserRegisterInfo({ firstName: fullName })
    setBusinessRegisterInfo({ 
      businessName: businessName,
      revenue: revenue
  })
    incrementCurrentStep()
  }

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
        <div className='relative shadow-md flex flex-col gap-4'>
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
        </div>

        <button
          onClick={handleContinue}
          disabled={!isFormValid || validated}
          className={`w-full py-3 px-6 text-xl lg:text-[28px] text-white font-bold transition-colors ${
            isFormValid
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-gray cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default Step1