import useStore from '../../stores/stepperStore'
import Icon1 from '@/public/assets/apply/stepper/excelent.svg'
import Icon2 from '@/public/assets/apply/stepper/good.svg'
import Icon3 from '@/public/assets/apply/stepper/fair.svg'
import Icon4 from '@/public/assets/apply/stepper/poor.svg'
import React from 'react'
import Image from 'next/image'

interface Step7Props {
  currentStep: number
}

const Step7: React.FC<Step7Props> = ({ currentStep }) => {
  const businessTypes = [
    {
      id: 'Excellent',
      name: 'Excellent',
      icon: Icon1,
      desc: '(720+)',
      showOnMobile: true,
    },
    {
      id: 'Good',
      name: 'Good',
      icon: Icon2,
      desc: '(680-719)',
      showOnMobile: true,
    },
    {
      id: 'Fair',
      name: 'Fair',
      desc: '(640-679)',
      icon: Icon3,

      showOnMobile: true,
    },
    {
      id: 'Poor',
      name: 'Poor',
      icon: Icon4,
      desc: '(630 or less)',
      showOnMobile: true,
    },
  ]

  const { setBusinessRegisterInfo, incrementCurrentStep } = useStore()

  const selectCreditScore = (creditType: string) => {
    setBusinessRegisterInfo({ creditScore: creditType })
    incrementCurrentStep()
  }

  return (
    <div
      className={`w-full mx-auto px-3 ${
        currentStep !== 7 ? 'hidden' : 'block'
      }`}
    >
      <div className='text-center mb-6'>
        <h2 className='text-xl font-bold mb-1 lg:leading-[38px] lg:text-3xl lg:font-bold'>
          What is your credit score?
        </h2>
      </div>

      <div className='grid grid-cols-2 gap-4 lg:grid-cols-4 lg:w-10/12 mx-auto'>
        {businessTypes.map((type) => (
          <div
            key={type.id}
            className='flex flex-col items-center justify-center gap-2'
          >
            <button
              onClick={() => selectCreditScore(type.name)}
              className={`p-6 border-[#E1E1E1] border-2 rounded-lg hover:border-blue transition-colors flex flex-col items-center justify-center gap-2 w-full ${!type.showOnMobile ? 'hidden lg:flex' : ''}`}
            >
              <Image
                src={type.icon}
                alt={type.name}
                width={90}
                height={90}
                key={`img-${type.id}`}
              />
            </button>
            <div className='flex flex-col items-center justify-center '>
              <span
                key={`span-${type.id}`}
                className={`text-sm lg:text-lg text-center font-bold flex-1 ${
                  !type.showOnMobile ? 'hidden lg:flex' : ''
                }`}
              >
                {type.name}
              </span>
              <span
                key={`span-${type.desc}`}
                className={`text-sm lg:text-lg text-center font-medium flex-1 ${
                  !type.showOnMobile ? 'hidden lg:flex' : ''
                }`}
              >
                {type.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Step7
