import useStore from '../../stores/stepperStore'
import React, { useState } from 'react'

export const industry = [
  { id: '1', name: 'Accommodation and Food Services' },
  { id: '2', name: 'Administration and Business Support' },
  { id: '3', name: 'Agriculture and Environmental' },
  { id: '4', name: 'Arts and Entertainment and Recreation' },
  { id: '5', name: 'Automotive Sales and Repair' },
  { id: '6', name: 'Business Franchises' },
  { id: '7', name: 'Construction' },
  { id: '8', name: 'Consumer Goods and Services' },
  { id: '9', name: 'Educational Services' },
  { id: '10', name: 'Finance Service and Insurance' },
  { id: '11', name: 'Health and Beauty' },
  { id: '12', name: 'Healthcare and Medical' },
  { id: '13', name: 'Industrial and Manufacturing' },
  { id: '14', name: 'Information and Technology' },
  { id: '15', name: 'Online Retail' },
  { id: '16', name: 'Professional Services' },
  { id: '17', name: 'Real Estate' },
  { id: '18', name: 'Retail Trade' },
  { id: '19', name: 'Transportation Freight' },
  { id: '20', name: 'Transportation Other' },
  { id: '21', name: 'Utilities' },
  { id: '22', name: 'Wholesale Trade' },
  { id: '23', name: 'other' },
]

interface Step9Props {
  currentStep: number
}
const Step9: React.FC<Step9Props> = ({ currentStep }) => {
  const [selectedOption, setSelectedOption] = useState('')
  const { setBusinessRegisterInfo, incrementCurrentStep } = useStore()

  const handleContinue = () => {
    if (!selectedOption) return

    setBusinessRegisterInfo({ industry: selectedOption })
    incrementCurrentStep()
  }

  return (
    <div
      className={`w-full mx-auto px-3 ${
        currentStep !== 9 ? 'hidden' : 'block'
      }`}
    >
      <div className='text-center mb-6'>
        <h2 className='text-xl font-bold mb-1 lg:leading-[38px] lg:text-3xl lg:font-bold'>
          What industry are you in?
        </h2>
      </div>

      <div className='w-full lg:w-5/12 mx-auto flex flex-col gap-6'>
        <div className='relative shadow-md'>
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className='w-full p-3 border-2 rounded-lg appearance-none bg-white text-gray-700 hover:border-blue transition-colors cursor-pointer pr-10'
          >
            <option value=''>-- Please Select --</option>
            {industry.map((purpose) => (
              <option key={purpose.id} value={purpose.id}>
                {purpose.name}
              </option>
            ))}
          </select>
          <div className='absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none'>
            <svg
              className='w-4 h-4 text-gray'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedOption}
          className={`w-full py-3 px-6 text-xl lg:text-[28px] text-white font-bold transition-colors ${
            selectedOption
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

export default Step9
