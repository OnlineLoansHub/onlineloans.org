import useStore from '../../stores/stepperStore'
import React, { useState } from 'react'

export const financingPurposes = [
  { id: '1', name: '$0 - $10,000' },
  { id: '2', name: '$10,000 - $20,000' },
  { id: '3', name: '$20,000 - $30,000' },
  { id: '4', name: '$30,000 - $40,000' },
  { id: '5', name: '$40,000 - $50,000' },
  { id: '6', name: '$50,000 - $60,000' },
  { id: '7', name: '$60,000 - $70,000' },
  { id: '8', name: '$70,000 - $80,000' },
  { id: '9', name: '$80,000 - $90,000' },
  { id: '10', name: '$90,000 - $100,000' },
  { id: '11', name: '$100,000 +' },
]

interface Step6Props {
  currentStep: number
}

const Step6: React.FC<Step6Props> = ({ currentStep }) => {
  const [selectedOption, setSelectedOption] = useState('')
  const { setBusinessRegisterInfo, incrementCurrentStep } = useStore()

  const handleContinue = () => {
    if (!selectedOption) return

    setBusinessRegisterInfo({ revenue: selectedOption })
    incrementCurrentStep()
  }

  return (
    <div
      className={`w-full mx-auto px-3 ${
        currentStep !== 6 ? 'hidden' : 'block'
      }`}
    >
      <div className='text-center mb-6'>
        <h2 className='text-xl font-bold mb-1 lg:leading-[38px] lg:text-3xl lg:font-bold'>
          How much revenue did you deposit into your business bank account last
          month?
        </h2>
      </div>

      <div className='w-full lg:w-5/12 mx-auto flex flex-col gap-6 max-w-md'>
        <div className='relative shadow-md'>
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className='w-full p-3 border-2 rounded-lg appearance-none bg-white text-gray-700 hover:border-blue transition-colors cursor-pointer pr-10'
          >
            <option value=''>-- Please Select --</option>
            {financingPurposes.map((purpose) => (
              <option key={purpose.id} value={purpose.id}>
                {purpose.name}
              </option>
            ))}
          </select>
          <div className='absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none'>
            <svg
              className='w-4 h-4 text-gray-500'
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
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default Step6
