import { useState, useEffect } from 'react'
// Zustand
import useStore from '../../stores/stepperStore'
// Utility for formatting phone number
import { formatPhoneNumber } from '../../step3/phoneFormatter'

interface Step3Props {
  currentStep: number;
  onConversion?: () => void;
}

const Step3: React.FC<Step3Props> = () => {

  // ------------------------- States ------------------------- .
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)

  // Store, global states
  const { setUserRegisterInfo, userRegisterInfo } = useStore()

  // ------------------------- Load data from Zustand -------------------------
  useEffect(() => {
    // Cargar el número de teléfono desde el estado global de Zustand
    if (userRegisterInfo.phoneNumber) {
      setPhoneNumber(userRegisterInfo.phoneNumber);
    }
  }, [userRegisterInfo]);

  // ------------------------- Handle Continue ------------------------- .
  const handleContinue = async () => {
    if (!isConfirmed) return;
    setLoading(true);

    const updatedUserInfo = {
      phoneNumber,
    };

    setUserRegisterInfo(updatedUserInfo);

    console.log("Phone Confirmation Saved :D");

    // Obtener y mostrar el estado global más actualizado
    const currentState = useStore.getState();
    console.log("Estado global actualizado:", currentState);

    setLoading(false);
    // window.location.href = '/join/step4';
  }

  // ------------------------- Return ------------------------- .
  return (
    <div className="w-full mx-auto px-3">
      <div className='text-center mb-6'>
        <h2 className='text-xl font-bold mb-1 lg:leading-[38px] lg:text-3xl lg:font-bold'>
          What&apos;s your name and business revenue?
        </h2>
      </div>

      <div className='w-full lg:w-5/12 mx-auto flex flex-col gap-6'>
        {/* Phone confirmation section */}
        <div className="flex flex-col gap-3">
          <p className="font-semibold text-lg">
            Please confirm your phone number to ensure smooth communication.
          </p>

          <div className="bg-gray-100 p-3 rounded-md text-center">
            <span className="text-xl font-medium">{formatPhoneNumber(phoneNumber)}</span>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="confirmPhone"
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
              className="w-5 h-5"
            />
            <label htmlFor="confirmPhone" className="cursor-pointer">
              Yes, this is my correct phone number
            </label>
          </div>

          <p className="mt-3 text-gray-700">
            Our financing team will contact you shortly with your best funding options.
          </p>
        </div>

        <button
          onClick={handleContinue}
          disabled={!isConfirmed || loading}
          className={`w-full py-3 px-6 text-xl lg:text-[28px] text-white font-bold transition-colors ${isConfirmed
            ? 'bg-green-500 hover:bg-green-600'
            : 'bg-gray-400 cursor-not-allowed'
            }`}
        >
          {loading ? <span className="loader">Loading</span> : 'See Your Offer'}
        </button>
      </div>
    </div>
  )
}

export default Step3