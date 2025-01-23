import useStore from '../../stores/stepperStore'
import Icon1 from '@/public/assets/apply/stepper/yes.svg'
import Icon2 from '@/public/assets/apply/stepper/no.svg'
import Image from 'next/image'
import React from 'react'
interface Step2Props {
  currentStep: number
}

const Step2: React.FC<Step2Props> = ({ currentStep }) => {
  const businessTypes = [
    {
      id: 'yes',
      name: 'Yes, I have a Business Bank Account',
      icon: Icon1,
      className: 'border-gray-200',
      showOnMobile: true,
    },
    {
      id: 'no',
      name: 'No, I have a Personal Bank Account',
      icon: Icon2,
      className: 'border-gray-200',
      showOnMobile: true,
    },
    {
      id: 'custom',
      name: 'No, I have a Custom Bank Account',
      icon: Icon1,
      className: 'border-gray-200',
      showOnMobile: true,
    },
  ]

  const { setBusinessRegisterInfo, incrementCurrentStep } = useStore()

  const selectBankAccount = (accountType: string) => {
    setBusinessRegisterInfo({ bankAccount: accountType })
    incrementCurrentStep()
  }

  return (
    <div
      className={`w-full mx-auto px-3 ${
        currentStep !== 2 ? 'hidden' : 'block'
      }`}
    >
      <div className='text-center mb-6'>
        <h2 className='text-xl font-bold mb-1 lg:leading-[38px] lg:text-3xl lg:font-bold'>
          Do you currently have a Business Bank Account?
        </h2>
      </div>

      <div className='flex flex-row lg:w-10/12 mx-auto'>
        {businessTypes.map((type) => (
          <div
            key={type.id}
            className='flex flex-col items-center gap-2 mx-auto'
          >
            <button
              onClick={() => selectBankAccount(type.name)}
              className={`p-6 border-2 rounded-lg border-[#E1E1E1] hover:border-blue transition-colors flex flex-col items-center justify-center gap-2 lg:size-[190px] size-[100px] ${
                type.className
              } ${!type.showOnMobile ? 'hidden lg:flex' : ''}`}
            >
              <Image src={type.icon} alt={type.name} width={90} height={96} />
            </button>
            <div className='lg:w-8/12 text-center px-1'>
              <span
                className={`text-sm lg:text-lg text-center font-medium flex-1 ${
                  !type.showOnMobile ? 'hidden lg:flex' : ''
                }`}
              >
                {type.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Step2
