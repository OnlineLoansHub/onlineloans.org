import useStore from '../../stores/stepperStore'
import React, { useState } from 'react'

interface Step8Props {
  currentStep: number
}
const Step8: React.FC<Step8Props> = ({ currentStep }) => {
  const [inputValue, setInputvalue] = useState('')
  const { setBusinessRegisterInfo, incrementCurrentStep } = useStore()

  const handleContinue = () => {
    if (!inputValue) return

    setBusinessRegisterInfo({ businessName: inputValue })
    incrementCurrentStep()
  }

  return (
    <div
      className={`w-full mx-auto px-3 ${
        currentStep !== 8 ? 'hidden' : 'block'
      }`}
    >
      <div className='text-center mb-6'>
        <h2 className='text-xl font-bold mb-1 lg:leading-[38px] lg:text-3xl lg:font-bold'>
          What is the name of your buisness?
        </h2>
      </div>

      <div className='w-full lg:w-5/12 mx-auto flex flex-col gap-6'>
        <div className='relative shadow-md'>
          <input
            type='text'
            className='w-full rounded-lg border-2 p-3 appearance-none bg-white text-gray-700 hover:border-blue transition-colors'
            value={inputValue}
            onChange={(e) => setInputvalue(e.target.value)}
          />
        </div>

        <button
          onClick={handleContinue}
          disabled={!inputValue}
          className={`w-full py-3 px-6 text-xl lg:text-[28px] text-white font-bold transition-colors ${
            inputValue
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

export default Step8
