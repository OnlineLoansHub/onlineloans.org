import useStore from '../../stores/stepperStore'
import React, { useState, useEffect } from 'react'

interface Step10Props {
  currentStep: number
}
const Step10: React.FC<Step10Props> = ({ currentStep }) => {
  const [firstName, setInputvalue] = useState('')
  const [lastName, setLastName] = useState('')
  const [validated, setValidated] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  const { setUserRegisterInfo, incrementCurrentStep } = useStore()

  useEffect(() => {
    setIsFormValid(firstName.trim() !== '' && lastName.trim() !== '')
  }, [firstName, lastName])

  const handleContinue = () => {
    if (!firstName || !lastName) return
    setValidated(true)

    setUserRegisterInfo({ firstName: firstName })
    setUserRegisterInfo({ lastName: lastName })
    incrementCurrentStep()
  }

  return (
    <div
      className={`w-full mx-auto px-3 ${
        currentStep !== 10 ? 'hidden' : 'block'
      }`}
    >
      <div className='text-center mb-6'>
        <h2 className='text-xl font-bold mb-1 lg:leading-[38px] lg:text-3xl lg:font-bold'>
          What&apos;s your name?
        </h2>
      </div>

      <div className='w-full lg:w-5/12 mx-auto flex flex-col gap-6'>
        <div className='relative shadow-md flex flex-col gap-4'>
          <input
            type='text'
            placeholder='First Name'
            className='w-full rounded-lg border-2 p-3 appearance-none bg-white text-gray-700 hover:border-blue transition-colors'
            value={firstName}
            onChange={(e) => setInputvalue(e.target.value)}
          />
          <input
            type='text'
            placeholder='Last Name'
            className='w-full rounded-lg border-2 p-3 appearance-none bg-white text-gray-700 hover:border-blue transition-colors'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <button
          onClick={handleContinue}
          disabled={!isFormValid || validated}
          className={`w-full py-3 px-6 text-xl lg:text-[28px] text-white font-bold transition-colors ${
            isFormValid
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

export default Step10
