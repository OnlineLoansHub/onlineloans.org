import useStore from '../../stores/stepperStore'
import React, { useState } from 'react'

export const financingPurposes = [
  { id: '1', name: 'Startup' },
  { id: '2', name: 'Less than 6 months' },
  { id: '3', name: '6 - 12 months' },
  { id: '4', name: '1 - 2 years' },
  { id: '5', name: '2 - 5 years' },
  { id: '6', name: '5 + years' },
]
interface Step5Props {
  currentStep: number
}
const Step5: React.FC<Step5Props> = ({ currentStep }) => {
  const [selectedOption, setSelectedOption] = useState('')
  const { setBusinessRegisterInfo, incrementCurrentStep } = useStore()

  const handleContinue = () => {
    if (!selectedOption) return

    setBusinessRegisterInfo({ howLong: selectedOption })
    incrementCurrentStep()
  }
  return (
    <div
      className={`w-full mx-auto px-3 ${
        currentStep !== 5 ? 'hidden' : 'block'
      }`}
    >
      <div className='text-center mb-6'>
        <h2 className='text-xl font-bold mb-1 lg:leading-[38px] lg:text-3xl lg:font-bold'>
          How long have you been in business?
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

export default Step5
