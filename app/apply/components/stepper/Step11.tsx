import useStore from '../../stores/stepperStore'
import React, { useState, useEffect } from 'react'
import { industry } from './Step9'
import { financingPurposes } from './Step4'
import { financingPurposes as longevityList } from './Step5'
import { financingPurposes as revenueList } from './Step6'

interface Step11Props {
  currentStep: number
}
const Step11: React.FC<Step11Props> = ({ currentStep }) => {
  const [number, setNumber] = useState('')
  const [loading, setLoader] = useState(false)
  const [mail, setMail] = useState('')
  const [validated, setValidated] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [errors, setErrors] = useState({
    phone: '',
    email: '',
  })

  const { setUserRegisterInfo, businessRegisterInfo, userRegisterInfo, reset } =
    useStore()

  const validatePhone = (phone: string) => {
    const numericPhone = phone.replace(/\D/g, '')
    return numericPhone.length >= 8
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  useEffect(() => {
    const phoneValid = validatePhone(number)
    const emailValid = validateEmail(mail)

    setErrors({
      phone:
        !phoneValid && number.trim() !== ''
          ? 'Phone number must have at least 8 digits'
          : '',
      email:
        !emailValid && mail.trim() !== ''
          ? 'Please enter a valid email address'
          : '',
    })

    setIsFormValid(phoneValid && emailValid)
  }, [number, mail])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const cleaned = value.replace(/[^\d\s()-]/g, '')
    setNumber(cleaned)
  }

  const handleContinue = async () => {
    if (!isFormValid) return
    setValidated(true)

    // Actualizar el estado con los nuevos valores
    const updatedUserInfo = {
      ...userRegisterInfo,
      phoneNumber: number,
      email: mail,
    }

    setUserRegisterInfo(updatedUserInfo)
    console.log('Datos actualizados:', updatedUserInfo)

    setLoader(true)
    try {
      const response = await fetch(
        'https://hubspot-proxy-0d8d4ed31dcb.herokuapp.com/leadPush?pid=iadvance',
        {
          method: 'POST',
          redirect: 'follow',
          headers: new Headers({
            'Content-Type': 'text/plain;charset=utf-8',
          }),
          body: JSON.stringify({
            properties: {
              email: updatedUserInfo.email,
              firstname: `${updatedUserInfo.firstName} ${updatedUserInfo.lastName}`,
              phone: updatedUserInfo.phoneNumber,
              business_type: businessRegisterInfo.businessType,
              bank_account: businessRegisterInfo.bankAccount,
              loan_amount: businessRegisterInfo.quantity,
              ivestment_target: financingPurposes.find(
                (x) => x.id === businessRegisterInfo.financingFor,
              )?.name,
              business_longevity: longevityList.find(
                (x) => x.id === businessRegisterInfo.howLong,
              )?.name,
              revenue_deposit_amount: revenueList.find(
                (x) => x.id === businessRegisterInfo.revenue,
              )?.name,
              credit_score: businessRegisterInfo.creditScore,
              business_name: businessRegisterInfo.businessName,
              business_industry: industry.find(
                (x) => x.id === businessRegisterInfo.industry,
              )?.name,
            },
          }),
        },
      )

      const body = await response.json()

      if (response.ok && body && body.result?.status !== 'error') {
        //TODO: Success modal show

        reset()
      } else {
        //TODO: Fail modal show
      }
    } catch (error) {
      console.log(error, 'Error sending the form data')
    } finally {
      setLoader(false)
    }
  }

  return (
    <div
      className={`w-full mx-auto px-3 ${
        currentStep !== 11 ? 'hidden' : 'block'
      }`}
    >
      <div className='text-center mb-6'>
        <h2 className='text-xl font-bold mb-1 lg:leading-[38px] lg:text-3xl lg:font-bold'>
          What is the best way to reach you?
        </h2>
      </div>

      <div className='w-full lg:w-5/12 mx-auto flex flex-col gap-6'>
        <div className='relative shadow-md flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <input
              type='tel'
              placeholder='(xxx) xxx-xxxx'
              className={`w-full rounded-lg border-2 p-3 appearance-none bg-white text-gray-700 hover:border-blue transition-colors ${
                errors.phone ? 'border-red-500' : ''
              }`}
              value={number}
              onChange={handlePhoneChange}
            />
            {errors.phone && (
              <span className='text-red-500 text-sm'>{errors.phone}</span>
            )}
          </div>

          <div className='flex flex-col gap-1'>
            <input
              type='email'
              placeholder='Email address'
              className={`w-full rounded-lg border-2 p-3 appearance-none bg-white text-gray-700 hover:border-blue transition-colors ${
                errors.email ? 'border-red-500' : ''
              }`}
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
            {errors.email && (
              <span className='text-red-500 text-sm'>{errors.email}</span>
            )}
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={!isFormValid || validated || loading}
          className={`w-full py-3 px-6 text-xl lg:text-[28px] text-white font-bold transition-colors ${
            isFormValid
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {loading ? <span className='loader'></span> : 'Continue'}
        </button>
      </div>
    </div>
  )
}

export default Step11
