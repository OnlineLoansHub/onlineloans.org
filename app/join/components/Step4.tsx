//React
import { useState, useEffect } from 'react'
// Zustand
import useStore from '../stores/stepperStore'


const Step4: React.FC = () => {

  // -------------------- States -------------------- .

  const [loading, setLoading] = useState(false)


  // -------------------- Handle Continue -------------------- .
  const handleContinue = async () => {

    setLoading(true)


    console.log("Revenue and funding info saved in global state");

    const currentState = useStore.getState();
    console.log("Estado global actualizado:", currentState);

    setLoading(false)
    // window.location.href = '/join/step3';
  }

  // -------------------- Return -------------------- .
  return (
    <div
      className="w-full mx-auto px-3"
    >
      <div className='text-center mb-10'>
        <h2 className='text-lg font-bold mb-1 lg:leading-[38px] px-8 lg:text-2xl lg:font-bold'>
          We determine your best funding offer based on your business&apos;s average revenue. The higher your revenue, the more funding you can qualify for!
        </h2>
      </div>

      <div className='w-full lg:w-5/12 mx-auto flex flex-col gap-6'>


        {/* ------------------------- DROPDOWN FUNDING AMOUNT INPUT ------------------------- */}
        <div className='mb-6'>


        </div>

        <button
          onClick={handleContinue}
          disabled={loading}
          className={`w-full py-3 px-6 text-xl lg:text-[28px] text-white font-bold transition-colors`}
        // ${selectedRevenueOption && selectedFundingOption
        // ? 'bg-green-500 hover:bg-green-600'
        // : 'bg-gray cursor-not-allowed'
        // }`}
        >
          {loading ? <span className="loader">Loading</span> : 'Continue'}
        </button>
      </div>
    </div>
  )
}

export default Step4