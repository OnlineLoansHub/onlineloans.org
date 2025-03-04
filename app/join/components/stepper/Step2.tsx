import useStore from '../../stores/stepperStore'
import React, { useState, useEffect } from 'react'
import 'react-phone-input-2/lib/style.css'

// Opciones de rango de ingresos para el dropdown
export const revenueRanges = [
  { id: '1', name: '$0 - $10,000' },
  { id: '2', name: '$10,000 - $20,000' },
  { id: '3', name: '$20,000 - $30,000' },
  { id: '4', name: '$30,000 - $40,000' },
  { id: '5', name: '$40,000 - $50,000' },
  { id: '6', name: '$50,000 - $60,000' },
  { id: '7', name: '$60,000 - $70,000' },
  { id: '8', name: '$70,000 - $80,000' },
  { id: '9', name: '$80,000 - $90,000' },
  { id: '10', name: '$90,000 - $100,000' },
  { id: '11', name: '$100,000 +' },
]

interface Step2Props {
  currentStep: number
}

const STORAGE_KEY = 'revenueFormData';

const Step2: React.FC<Step2Props> = () => {

  // -------------------- States -------------------- .
  // Nuevo estado para dropdown
  const [selectedOption, setSelectedOption] = useState('')
  const [loading, setLoading] = useState(false)

  // Estados originales (comentados pero mantenidos para referencia)
  // Simple inputs, local states
  /*
  const [revenue, setRevenue] = useState('')
  const [revenueError, setRevenueError] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)

  // Errors, local state
  const [errors, setErrors] = useState({
    revenue: '',
  })
  */

  // Store, global states
  const { setBusinessRegisterInfo, businessRegisterInfo } = useStore()

  // -------------------- Load from localStorage -------------------- .
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);

        // Populate selectedOption if data exists
        if (parsedData.selectedOption) {
          setSelectedOption(parsedData.selectedOption);

          // Encontrar el rango de ingresos por su ID
          const selectedRange = revenueRanges.find(range => range.id === parsedData.selectedOption);
          const rangeValue = selectedRange ? selectedRange.name : '';

          // Update global store with saved data (using the actual range value)
          setBusinessRegisterInfo({
            ...businessRegisterInfo,
            revenue: rangeValue,
          });
        }

        // Código original para el input de texto (comentado)
        /*
        // Populate revenue field if data exists
        if (parsedData.revenue) {
          setRevenue(parsedData.revenue);

          // Update global store with saved data
          setBusinessRegisterInfo({
            ...businessRegisterInfo,
            revenue: parsedData.revenue,
          });
        }
        */
      }
    } catch (error) {
      console.error('Error loading revenue data from localStorage:', error);
    }
  }, []);

  // -------------------- Save to localStorage -------------------- .
  useEffect(() => {
    // Don't save empty initial state
    if (!selectedOption) return;

    try {
      const dataToSave = {
        selectedOption
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error saving revenue data to localStorage:', error);
    }
  }, [selectedOption]);

  // Código original para el input de texto (comentado)
  /*
  // -------------------- Save to localStorage -------------------- .
  useEffect(() => {
    // Don't save empty initial state
    if (!revenue) return;

    try {
      const dataToSave = {
        revenue
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error saving revenue data to localStorage:', error);
    }
  }, [revenue]);

  // -------------------- UseEffect (validation) -------------------- .
  useEffect(() => {

    const revenueNumber = Number(revenue.replace(/,/g, ''))
    const revenueValid = revenueNumber >= 40000

    setErrors({
      revenue: revenue && !revenueValid ? 'Minimum revenue required is $40,000' : '',
    })

    setIsFormValid(
      revenueValid
    )

    setRevenueError(
      revenue && !revenueValid
        ? 'Minimum revenue required is $40,000'
        : ''
    )
  }, [revenue])

  // -------------------- Validations -------------------- .
  const formatCurrency = (value: string): string => {
    // Elimina todo excepto números
    const numbers = value.replace(/[^\d]/g, '')

    // Convierte a número y formatea con comas
    const formatted = Number(numbers).toLocaleString('en-US')

    return numbers ? `$${formatted}` : ''
  }

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '')
    setRevenue(rawValue) // Guardamos el valor sin formato
  }
  */

  // -------------------- Handle Continue -------------------- .
  const handleContinue = async () => {
    if (!selectedOption) return
    setLoading(true)

    // Encontrar el rango de ingresos seleccionado por su ID
    const selectedRange = revenueRanges.find(range => range.id === selectedOption);
    const rangeValue = selectedRange ? selectedRange.name : '';

    console.log('Data to send: ', { selectedOption, rangeValue });

    // Actualizar información en la store global con el valor del rango
    setBusinessRegisterInfo({
      ...businessRegisterInfo,
      revenue: rangeValue
    })

    console.log("Revenue info saved in global state");
    setLoading(false)
  }

  /* Código original (comentado)
  const handleContinue = async () => {
    if (!isFormValid) return
    setValidated(true)
    setLoading(true)

    console.log('Data to send: ', { revenue });

    const updatedBusinessInfo = {
      revenue,
    }

    setBusinessRegisterInfo(updatedBusinessInfo)

    console.log("Revenue info saved in global state");
    setLoading(false)
  }
  */

  // -------------------- Return -------------------- .
  return (
    <div
      className="w-full mx-auto px-3"
    >
      <div className='text-center mb-6'>
        <h2 className='text-xl font-bold mb-1 lg:leading-[38px] lg:text-3xl lg:font-bold'>
          How much revenue did you deposit into your business bank account last month?
        </h2>
      </div>

      <div className='w-full lg:w-5/12 mx-auto flex flex-col gap-6'>

        {/* ------------------------- DROPDOWN REVENUE INPUT ------------------------- */}
        <div className='relative shadow-md'>
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
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

        {/* Input original (comentado)
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Average Yearly Business Revenue"
            className={`w-full rounded-lg border-2 p-3 appearance-none bg-white text-gray-700 hover:border-blue transition-colors ${errors.revenue ? 'border-red-500' : ''
              }`}
            value={formatCurrency(revenue)}
            onChange={handleNumberInput}
          />
          {errors.revenue && (
            <span className="text-red-500 text-sm">{errors.revenue}</span>
          )}
        </div>
        */}

        <button
          onClick={handleContinue}
          disabled={!selectedOption || loading}
          className={`w-full py-3 px-6 text-xl lg:text-[28px] text-white font-bold transition-colors ${selectedOption
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