//React
import { useState, useEffect } from 'react'
// Zustand
import useStore from '../../stores/stepperStore'
// PhoneInput
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

interface Step1Props {
  currentStep: number;
  onConversion?: () => void; // Nueva prop para el manejo de conversión
}

const STORAGE_KEY = 'businessFormData';

const Step1: React.FC<Step1Props> = () => {

  // ------------------------- States ------------------------- .
  // Simple inputs, local states
  const [fullName, setFullName] = useState('')
  const [businessName, setBusinessName] = useState('')

  // Email and Phone, local states
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const [validated, setValidated] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  // Errors, local state
  const [errors, setErrors] = useState({
    fullName: '',
    businessName: '',
    phone: '',
    email: '',
  })

  // Store, global states
  const { setUserRegisterInfo, setBusinessRegisterInfo, businessRegisterInfo } = useStore()


  // ------------------------- Load data from localStorage -------------------------
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);

        // Populate form fields if data exists
        if (parsedData.fullName) setFullName(parsedData.fullName);
        if (parsedData.businessName) setBusinessName(parsedData.businessName);
        if (parsedData.phoneNumber) setPhoneNumber(parsedData.phoneNumber);
        if (parsedData.email) setEmail(parsedData.email);

        // Update global store with saved data
        if (parsedData.fullName || parsedData.phoneNumber || parsedData.email) {
          setUserRegisterInfo({
            firstName: parsedData.fullName || '',
            phoneNumber: parsedData.phoneNumber || '',
            email: parsedData.email || '',
          });
        }

        if (parsedData.businessName) {
          setBusinessRegisterInfo({
            ...businessRegisterInfo,
            businessName: parsedData.businessName,
          });
        }
      }
    } catch (error) {
      console.error('Error loading form data from localStorage:', error);
    }
  }, []);

  // ------------------------- Save data to localStorage on change -------------------------
  useEffect(() => {
    // Don't save empty initial state
    if (!fullName && !businessName && !phoneNumber && !email) return;

    try {
      const dataToSave = {
        fullName,
        businessName,
        phoneNumber,
        email
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error saving form data to localStorage:', error);
    }
  }, [fullName, businessName, phoneNumber, email]);

  // ------------------------- Validation useEffect ------------------------- .
  useEffect(() => {
    const nameValid = fullName.trim().length >= 3
    const businessValid = businessName.trim().length >= 3
    const phoneValid = validatePhone(phoneNumber)
    const emailValid = validateEmail(email)

    setErrors({
      fullName: !nameValid && fullName.trim() !== '' ? 'Full name must be at least 3 characters' : '',
      businessName: !businessValid && businessName.trim() !== '' ? 'Business name must be at least 3 characters' : '',
      phone: !phoneValid && phoneNumber.trim() !== '' ? 'Phone number must have at least 8 digits' : '',
      email: !emailValid && email.trim() !== '' ? 'Please enter a valid email address' : '',
    })

    setIsFormValid(
      nameValid &&
      businessValid &&
      phoneValid &&
      emailValid
    )

  }, [fullName, businessName, phoneNumber, email])

  // ------------------------- Validations ------------------------- .
  const validatePhone = (phone: string) => {
    const numericPhone = phone.replace(/\D/g, '')
    return numericPhone.length >= 8
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // ------------------------- Handle Continue ------------------------- .
  const handleContinue = async () => {
    if (!isFormValid) return
    setValidated(true)
    setLoading(true)

    const updatedUserInfo = {
      firstName: fullName.trim(),
      phoneNumber,
      email,
    }

    const updatedBusinessInfo = {
      businessName,
    }

    setUserRegisterInfo(updatedUserInfo)
    setBusinessRegisterInfo(updatedBusinessInfo)

    console.log('Data to send: ', {
      firstname: fullName.trim(),
      business_name: businessName,
      phone: phoneNumber,
      email: email,

      business_type: businessRegisterInfo.businessType,
      bank_account: businessRegisterInfo.bankAccount,
      loan_amount: businessRegisterInfo.quantity,
      credit_score: businessRegisterInfo.creditScore,

      user_href: window.location.href,
    });


    // ---------- Send the Lead to the API ----------.
    // try {
    //   const response = await fetch(
    //     'https://hubspot-proxy-0d8d4ed31dcb.herokuapp.com/leadPush?pid=oncash',
    //     {
    //       method: 'POST',
    //       headers: new Headers({
    //         'Content-Type': 'text/plain;charset=utf-8',
    //       }),
    //       body: JSON.stringify({
    //         properties: {
    //           firstname: fullName.trim(),
    //           business_name: businessName,
    //           phone: phoneNumber,
    //           email: email,

    //           business_type: businessRegisterInfo.businessType,
    //           bank_account: businessRegisterInfo.bankAccount,
    //           loan_amount: businessRegisterInfo.quantity,
    //           credit_score: businessRegisterInfo.creditScore,

    //           user_href: window.location.href,
    //         },
    //       }),
    //     }
    //   )

    //   if (response.ok) {
    //      // ---------- Record Google Ads conversion event ----------.
    //      if (typeof window !== 'undefined' && 'gtag' in window) {
    //      // @ts-expect-error - gtag is not defined in the Window type
    //      window.gtag('event', 'conversion', { 'send_to': 'AW-16834519489/Q5TZCLLY05MaEMHDqds-' });
    //      }
    //   }
    // } catch (error) {
    //   console.error('Error sending the form data:', error)
    // } finally {
    //   console.log("Info sent :D");
    //   setLoading(false)
    // }
    console.log("Info sent :D");
    setLoading(false)
    window.location.href = '/join/step2';
  }

  // ------------------------- Return ------------------------- .
  return (
    <div
      className="w-full mx-auto px-3"
    >
      <div className='text-center mb-6'>
        <h2 className='text-xl font-bold mb-1 lg:leading-[38px] lg:text-3xl lg:font-bold'>
          What&apos;s your name and business revenue?
        </h2>
      </div>

      <div className='w-full lg:w-5/12 mx-auto flex flex-col gap-6'>

        {/* ------------------------- BUSINESS NAME INPUT ------------------------- */}
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Full Name"
            className={`w-full rounded-lg border-2 p-3 appearance-none bg-white text-gray-700 hover:border-blue transition-colors ${errors.fullName ? 'border-red-500' : ''
              }`}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && (
            <span className="text-red-500 text-sm">{errors.fullName}</span>
          )}
        </div>

        {/* ------------------------- FULL NAME INPUT ------------------------- */}
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Business Name"
            className={`w-full rounded-lg border-2 p-3 appearance-none bg-white text-gray-700 hover:border-blue transition-colors ${errors.businessName ? 'border-red-500' : ''
              }`}
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
          {errors.businessName && (
            <span className="text-red-500 text-sm">{errors.businessName}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <PhoneInput
            country={'us'}
            value={phoneNumber}
            onChange={setPhoneNumber}
            countryCodeEditable={false}
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">{errors.phone}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <input
            type="email"
            placeholder="Email address"
            className={`w-full rounded-lg border-2 p-3 appearance-none bg-white text-gray-700 hover:border-blue transition-colors ${errors.email ? 'border-red-500' : ''
              }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </div>

        <button
          onClick={handleContinue}
          disabled={!isFormValid || validated || loading}
          className={`w-full py-3 px-6 text-xl lg:text-[28px] text-white font-bold transition-colors ${isFormValid
            ? 'bg-green-500 hover:bg-green-600'
            : 'bg-gray cursor-not-allowed'
            }`}
        >
          {loading ? <span className="loader">Loading</span> : 'See Your Offer'}
        </button>
      </div>
    </div>
  )
}

export default Step1