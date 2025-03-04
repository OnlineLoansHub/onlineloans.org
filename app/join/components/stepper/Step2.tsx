import useStore from '../../stores/stepperStore'
import React, { useState, useEffect } from 'react'
import 'react-phone-input-2/lib/style.css'

// Opciones de rango de ingresos para el dropdown
export const revenueRanges = [
  { id: '1', name: '$1K - $3K' },
  { id: '2', name: '$3K - $5K' },
  { id: '3', name: '$5K - $10K' },
  { id: '4', name: '$10K - $20K' },
  { id: '5', name: '$20K - $50K' },
  { id: '6', name: '$50K - $100K' },
  { id: '7', name: '$100K - $300K' },
  { id: '8', name: '$300K - $500K' },
  { id: '9', name: '$500K - $1M' },
  { id: '10', name: '$1M+' },
]

// Opciones para el monto de financiamiento deseado
export const fundingAmounts = [
  { id: '1', name: '$2K - $5K' },
  { id: '2', name: '$5K - $10K' },
  { id: '3', name: '$10K - $25K' },
  { id: '4', name: '$25K - $50K' },
  { id: '5', name: '$50K - $100K' },
  { id: '6', name: '$100K - $250K' },
  { id: '7', name: '$250K - $1M' },
  { id: '8', name: '$1M+' },
]

interface Step2Props {
  currentStep: number
}

const REVENUE_STORAGE_KEY = 'revenueFormData';
const FUNDING_STORAGE_KEY = 'fundingFormData';

const Step2: React.FC<Step2Props> = () => {

  // -------------------- States -------------------- .
  // Estado para dropdowns
  const [selectedRevenueOption, setSelectedRevenueOption] = useState('')
  const [selectedFundingOption, setSelectedFundingOption] = useState('')
  const [loading, setLoading] = useState(false)


  // Store, global states
  const { setBusinessRegisterInfo, businessRegisterInfo } = useStore()

  // -------------------- Load from localStorage -------------------- .
  useEffect(() => {
    try {
      // Cargar datos de ingresos
      const savedRevenueData = localStorage.getItem(REVENUE_STORAGE_KEY);
      if (savedRevenueData) {
        const parsedRevenueData = JSON.parse(savedRevenueData);

        // Populate selectedRevenueOption if data exists
        if (parsedRevenueData.selectedOption) {
          setSelectedRevenueOption(parsedRevenueData.selectedOption);

          // Encontrar el rango de ingresos por su ID
          const selectedRange = revenueRanges.find(range => range.id === parsedRevenueData.selectedOption);
          const rangeValue = selectedRange ? selectedRange.name : '';

          // Update global store with saved data (using the actual range value)
          setBusinessRegisterInfo({
            ...businessRegisterInfo,
            revenue: rangeValue,
          });
        }
      }

      // Cargar datos de financiamiento
      const savedFundingData = localStorage.getItem(FUNDING_STORAGE_KEY);
      if (savedFundingData) {
        const parsedFundingData = JSON.parse(savedFundingData);

        // Populate selectedFundingOption if data exists
        if (parsedFundingData.selectedOption) {
          setSelectedFundingOption(parsedFundingData.selectedOption);

          // Encontrar el monto de financiamiento por su ID
          const selectedAmount = fundingAmounts.find(amount => amount.id === parsedFundingData.selectedOption);
          const amountValue = selectedAmount ? selectedAmount.name : '';

          // Update global store with saved data
          setBusinessRegisterInfo({
            ...businessRegisterInfo,
            quantity: amountValue,
          });
        }
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);

  // -------------------- Save to localStorage -------------------- .
  useEffect(() => {
    // Don't save empty initial state
    if (!selectedRevenueOption) return;

    try {
      const dataToSave = {
        selectedOption: selectedRevenueOption
      };
      localStorage.setItem(REVENUE_STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error saving revenue data to localStorage:', error);
    }
  }, [selectedRevenueOption]);

  useEffect(() => {
    // Don't save empty initial state
    if (!selectedFundingOption) return;

    try {
      const dataToSave = {
        selectedOption: selectedFundingOption
      };
      localStorage.setItem(FUNDING_STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error saving funding data to localStorage:', error);
    }
  }, [selectedFundingOption]);


  // -------------------- Handle Continue -------------------- .
  const handleContinue = async () => {
    if (!selectedRevenueOption || !selectedFundingOption) return
    setLoading(true)

    // Encontrar el rango de ingresos seleccionado por su ID
    const selectedRange = revenueRanges.find(range => range.id === selectedRevenueOption);
    const rangeValue = selectedRange ? selectedRange.name : '';

    // Encontrar el monto de financiamiento seleccionado por su ID
    const selectedAmount = fundingAmounts.find(amount => amount.id === selectedFundingOption);
    const amountValue = selectedAmount ? selectedAmount.name : '';

    console.log('Data to send: ', { selectedRevenueOption, rangeValue, selectedFundingOption, amountValue });

    // Actualizar información en la store global
    setBusinessRegisterInfo({
      ...businessRegisterInfo,
      revenue: rangeValue,
      quantity: amountValue
    })

    console.log("Revenue and funding info saved in global state");
    setLoading(false)
    window.location.href = '/join/step3';
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

        {/* ------------------------- DROPDOWN REVENUE INPUT ------------------------- */}
        <div className='mb-6'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Average Monthly Business Revenue:
          </label>
          <div className='relative shadow-md'>
            <select
              value={selectedRevenueOption}
              onChange={(e) => setSelectedRevenueOption(e.target.value)}
              className='w-full p-3 border-2 rounded-lg appearance-none bg-white text-gray-700 hover:border-blue transition-colors cursor-pointer pr-10'
            >
              <option value=''>-- Please Select --</option>
              {revenueRanges.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.name}
                </option>
              ))}
            </select>
            <div className='absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none'>
              <svg
                className='w-4 h-4 text-gray'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </div>
          </div>
        </div>

        {/* ------------------------- DROPDOWN FUNDING AMOUNT INPUT ------------------------- */}
        <div className='mb-6'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Desired Funding Amount:
          </label>
          <div className='relative shadow-md'>
            <select
              value={selectedFundingOption}
              onChange={(e) => setSelectedFundingOption(e.target.value)}
              className='w-full p-3 border-2 rounded-lg appearance-none bg-white text-gray-700 hover:border-blue transition-colors cursor-pointer pr-10'
            >
              <option value=''>-- Please Select --</option>
              {fundingAmounts.map((amount) => (
                <option key={amount.id} value={amount.id}>
                  {amount.name}
                </option>
              ))}
            </select>
            <div className='absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none'>
              <svg
                className='w-4 h-4 text-gray'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </div>
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedRevenueOption || !selectedFundingOption || loading}
          className={`w-full py-3 px-6 text-xl lg:text-[28px] text-white font-bold transition-colors ${selectedRevenueOption && selectedFundingOption
            ? 'bg-green-500 hover:bg-green-600'
            : 'bg-gray cursor-not-allowed'
            }`}
        >
          {loading ? <span className="loader">Loading</span> : 'Continue'}
        </button>
      </div>
    </div>
  )
}

export default Step2