//React
import { useState, useEffect } from 'react'
// Zustand
import useStore from '../stores/stepperStore'
// Utility for formatting phone number
import { formatPhoneNumber } from '../step3/phoneFormatter'
// PhoneInput
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


const Step3: React.FC = () => {

  // ------------------------- States ------------------------- .
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneNumber2, setPhoneNumber2] = useState('')
  const [showSecondPhone, setShowSecondPhone] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [phoneError, setPhoneError] = useState('')

  // Store, global states
  const { setUserRegisterInfo, userRegisterInfo } = useStore()

  // ------------------------- Load data from Zustand -------------------------
  useEffect(() => {
    // Cargar el número de teléfono desde el estado global de Zustand
    if (userRegisterInfo.phoneNumber) {
      setPhoneNumber(userRegisterInfo.phoneNumber);
    }
    if (userRegisterInfo.phoneNumber2) {
      setPhoneNumber2(userRegisterInfo.phoneNumber2);
      setShowSecondPhone(true);
    }
  }, [userRegisterInfo]);

  // ------------------------- Validations ------------------------- .
  const validatePhone = (phone: string) => {
    const numericPhone = phone.replace(/\D/g, '')
    return numericPhone.length >= 8
  }

  // Validate second phone when it's shown
  useEffect(() => {
    if (showSecondPhone && phoneNumber2) {
      const isValid = validatePhone(phoneNumber2)
      setPhoneError(!isValid ? 'Phone number must have at least 8 digits' : '')
    } else {
      setPhoneError('')
    }
  }, [phoneNumber2, showSecondPhone])

  // ------------------------- Handle Continue ------------------------- .
  const handleContinue = async () => {
    if (!isConfirmed) return;

    // Validate second phone if shown
    if (showSecondPhone && phoneNumber2 && !validatePhone(phoneNumber2)) {
      setPhoneError('Phone number must have at least 8 digits')
      return;
    }

    setLoading(true);

    const updatedUserInfo = {
      ...userRegisterInfo,
      phoneNumber,
      phoneNumber2: showSecondPhone ? phoneNumber2 : '',
    };

    setUserRegisterInfo(updatedUserInfo);

    // ---------- Record Google Ads conversion event ----------.
    // if (typeof window !== 'undefined' && 'gtag' in window) {
    //   // @ts-expect-error - gtag no está definido en el tipo Window
    //   window.gtag('event', 'conversion', {
    //     'send_to': 'AW-16834519489/xtz2COufpaAaEMHDqds-',
    //     'value': 10.0,
    //     'currency': 'MXN'
    //   });
    // }
    console.log("Phone Confirmation Saved :D");

    // Updated Global state
    const currentState = useStore.getState();
    console.log("Estado global actualizado:", currentState);

    setLoading(false);
    // window.location.href = '/join/step4';
  }

  // ------------------------- Toggle Second Phone ------------------------- .
  const toggleSecondPhone = () => {
    setShowSecondPhone(!showSecondPhone);
    if (!showSecondPhone) {
      setPhoneNumber2('');
    }
  }

  // ------------------------- Return ------------------------- .
  return (
    <div className="w-full mx-auto px-3">
      <div className='text-center mb-8'>
        <h2 className='text-lg font-bold px-8 mb-1 lg:leading-[38px] lg:text-2xl lg:font-bold'>
          Great News! Based on your details, your business may qualify for a custom cash advance offer tailored to your needs
        </h2>
      </div>

      <div className='w-full lg:w-5/12 mx-auto flex flex-col gap-6'>
        {/* Phone confirmation section */}
        <div className="flex flex-col gap-3">
          <p className="font-semibold text-lg text-center">
            Please confirm your phone number to ensure smooth communication.
          </p>

          <div className="bg-gray-100 p-3 rounded-md text-center">
            <span className="text-xl font-medium text-blue">{formatPhoneNumber(phoneNumber)}</span>
          </div>


          <div className="flex items-center gap-2 mt-4">
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

        {/* Add second phone option */}
        <div className="mt-7 mx-auto">
          <button
            type="button"
            onClick={toggleSecondPhone}
            className="text-blue-600 underline font-medium text-center"
          >
            {showSecondPhone ? "Remove secondary phone" : "Add a second phone number (optional)"}
          </button>
        </div>

        {/* Second phone input - shown only when requested */}
        {showSecondPhone && (
          <div className="flex flex-col gap-1 mt-2">
            <label className="text-sm text-gray-700">Secondary phone number:</label>
            <PhoneInput
              country={'us'}
              value={phoneNumber2}
              onChange={setPhoneNumber2}
              countryCodeEditable={false}
            />
            {phoneError && (
              <span className="text-red-500 text-sm">{phoneError}</span>
            )}
          </div>
        )}

        <button
          onClick={handleContinue}
          disabled={!isConfirmed || loading || (showSecondPhone && phoneNumber2 && !validatePhone(phoneNumber2))}
          className={`w-full py-3 px-6 text-xl lg:text-[28px] text-white font-bold transition-colors ${isConfirmed && !(showSecondPhone && phoneNumber2 && !validatePhone(phoneNumber2))
            ? 'bg-green-500 hover:bg-green-600'
            : 'bg-gray-400 cursor-not-allowed'
            }`}
        >
          {loading ? <span className="loader">Loading</span> : 'Continue'}
        </button>
      </div>
    </div>
  )
}

export default Step3