import React from 'react'

interface StepIndicatorProps {
  currentStep: number
}
const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  // Calculamos el porcentaje de progreso asegurándonos que el primer paso tenga una longitud visible
  const initialWidth = 8 // Ancho inicial para el primer paso (en porcentaje)
  const totalSteps = 11
  const remainingWidth = 100 - initialWidth
  const progressPercentage =
    currentStep === 1
      ? initialWidth
      : initialWidth + ((currentStep - 1) / (totalSteps - 1)) * remainingWidth

  return (
    <div className='bg-white w-full rounded-lg  py-2 lg:py-6'>
      <div className=' mx-auto px-6 py-4 flex flex-col items-center justify-center gap-4'>
        <span className='text-base lg:text-[22px] font-medium'>
          Step {currentStep} of {totalSteps}
        </span>
        <div className='w-full lg:w-8/12 mx-auto h-2 bg-[#E4F0FC] rounded-full mb-1 overflow-hidden'>
          <div
            className='h-full bg-blue rounded-full transition-all duration-300 ease-in-out'
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default StepIndicator
