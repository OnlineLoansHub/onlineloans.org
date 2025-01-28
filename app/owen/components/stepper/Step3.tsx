import useStore from '../../stores/stepperStore'
import React from 'react'

interface Step3Props {
  currentStep: number
}
const Step3: React.FC<Step3Props> = ({ currentStep }) => {
  const quantity = [
    {
      id: '1',
      name: '$5,000 - $10,000',
      showOnMobile: true,
    },
    {
      id: '2',
      name: '$10,000 - $20,000',
      showOnMobile: true,
    },
    {
      id: '3',
      name: '$20,000 - $50,000',
      showOnMobile: true,
    },
    {
      id: '4',
      name: '$50,000 -$100,000',
      showOnMobile: true,
    },
    {
      id: '5',
      name: '$100,000 -$150,000',
      showOnMobile: true,
    },
    {
      id: '6',
      name: '$150,000 -$300,000',
      showOnMobile: true,
    },
    {
      id: '7',
      name: '$300,000 - $500,000',
      showOnMobile: true,
    },
    {
      id: '8',
      name: '$5,000 +',
      showOnMobile: true,
    },
  ]
  const { setBusinessRegisterInfo, incrementCurrentStep } = useStore()

  const selectMoneyQuantity = (moneyQuantity: string) => {
    setBusinessRegisterInfo({ quantity: moneyQuantity })
    incrementCurrentStep()
  }

  return (
    <div
      className={`w-full mx-auto px-3 ${
        currentStep !== 3 ? 'hidden' : 'block'
      }`}
    >
      <div className='text-center mb-6'>
        <h2 className='text-xl font-bold mb-1 lg:leading-[38px] lg:text-3xl lg:font-bold'>
          About how much do you need?
        </h2>
      </div>

      <div className='grid grid-cols-2 gap-4 w-11/12 mx-auto lg:w-9/12'>
        {quantity.map((type) => (
          <div key={type.id} className='flex flex-col gap-2'>
            <button
              onClick={() => selectMoneyQuantity(type.name)}
              className={`py-3 px-2 lg:px-3 border-2 rounded-lg hover:border-blue transition-colors flex flex-col items-center justify-center gap-2 min-w-full border-[#E1E1E1]`}
            >
              <span
                className={`text-xs lg:text-base text-center font-medium ${
                  !type.showOnMobile ? 'hidden lg:flex' : ''
                }`}
              >
                {type.name}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Step3
