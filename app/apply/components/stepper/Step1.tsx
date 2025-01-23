import useStore from '../../stores/stepperStore'
import Icon4 from '@/public/assets/apply/stepper/llc.svg'
import Icon5 from '@/public/assets/apply/stepper/corporation.svg'
import Image from 'next/image'

interface BusinessTypeStepProps {
  currentStep: number
}

const BusinessTypeStep: React.FC<BusinessTypeStepProps> = ({ currentStep }) => {
  const { setBusinessRegisterInfo, incrementCurrentStep } = useStore()

  const businessTypes = [
    {
      id: 'llc',
      name: 'LLC',
      icon: Icon4,
      className: 'border-gray',
      showOnMobile: true,
    },
    {
      id: 'Incorporated',
      name: 'Incorporated',
      icon: Icon5,
      className: 'border-gray',
      showOnMobile: true,
    },
  ]

  const selectBusinessType = (type: string) => {
    setBusinessRegisterInfo({ businessType: type })
    incrementCurrentStep()
  }

  return (
    <div
      className={`w-full mx-auto px-6  ${
        currentStep !== 1 ? 'hidden' : 'block'
      }`}
    >
      <div className='text-center mb-6'>
        <h2 className='text-xl font-bold mb-1 lg:leading-[38px] md:text-3xl lg:font-bold '>
          Select Your Business Type To Get Started
        </h2>
      </div>

      <div className='grid grid-cols-2 gap-4 lg:grid-cols-2 lg:w-10/12 mx-auto '>
        {businessTypes.map((type) => (
          <div
            key={type.id}
            className='flex flex-col items-center justify-center gap-2 lg:w-full'
          >
            <button
              onClick={() => selectBusinessType(type.name)}
              className={`p-6 border-2 rounded-lg hover:border-blue transition-colors flex flex-col items-center justify-center gap-2 w-full  ${
                type.className
              } ${!type.showOnMobile ? 'hidden lg:flex' : ''}`}
            >
              <Image src={type.icon} alt={type.name} width={90} height={96} />
            </button>
            <span
              className={`text-sm md:text-lg text-center font-medium flex-1 ${
                !type.showOnMobile ? 'hidden lg:flex' : ''
              }`}
            >
              {type.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BusinessTypeStep
