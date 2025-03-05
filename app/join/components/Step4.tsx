//React
import { useState, useEffect } from 'react'
// Zustand
import useStore from '../stores/stepperStore'
// Icons
import { FaFileUpload, FaCheckCircle, FaRegTrashAlt, } from 'react-icons/fa'

const Step4: React.FC = () => {

  // -------------------- States -------------------- .
  const [loading, setLoading] = useState(false)

  // Extrae los valores y funciones del store correctamente para evitar bucles infinitos
  const documentsInfo = useStore(state => state.documentsInfo)
  const setDriversLicense = useStore(state => state.setDriversLicense)
  const addBankStatement = useStore(state => state.addBankStatement)
  const removeBankStatement = useStore(state => state.removeBankStatement)
  const areDocumentsValid = useStore(state => state.areDocumentsValid)

  // -------------------- Handle Continue -------------------- .
  const handleContinue = async () => {
    // Check if documents are valid before continuing
    if (!areDocumentsValid()) {
      alert("Please upload your driver's license and at least 3 bank statements")
      return
    }

    setLoading(true)

    console.log("Documents and funding info saved in global state");

    const currentState = useStore.getState();
    console.log("Estado global actualizado:", currentState);

    setLoading(false)
    // window.location.href = '/join/step3';
  }

  // Handle driver's license upload
  function handleDriversLicenseChange(e) {
    if (e.target.files && e.target.files[0]) {
      setDriversLicense(e.target.files[0])
    }
  }

  // Handle driver's license removal
  function handleRemoveDriversLicense() {
    setDriversLicense(null)
  }

  // Handle bank statement upload
  function handleBankStatementChange(e) {
    if (e.target.files && e.target.files[0]) {
      addBankStatement(e.target.files[0])
    }
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

        {/* ------------------------- CONTENT. UPLOAD 4 BANK STATEMENTS AND 1 DRIVERS LICENSE -------------------------- */}
        <div className='mb-6'>
          {/* Driver's License Upload Component */}
          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-3">
              Driver's License <span className="text-red-500">*</span>
            </label>

            {/* Show uploaded driver's license */}
            {documentsInfo.driversLicense && (
              <div className="mb-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                    <div className="flex items-center">
                      <FaCheckCircle className="w-4 h-4 mr-2 text-green-400" />
                      <span className="text-sm">{documentsInfo.driversLicense.name}</span>
                    </div>
                    <button
                      onClick={handleRemoveDriversLicense}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaRegTrashAlt className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Upload button - only show if no driver's license uploaded */}
            {!documentsInfo.driversLicense && (
              <div className='flex w-full items-center justify-center'>
                <label
                  htmlFor='select-drivers-license'
                  className='group flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100'
                >
                  <div className='flex flex-col items-center justify-center py-5'>
                    <FaFileUpload className='w-6 h-6 text-gray-500 transition duration-75 group-hover:text-blue-600' />
                    <span className='text-sm text-gray-500 font-semibold group-hover:text-black'>Click to upload Driver's License (PDF, JPG, PNG)</span>
                  </div>
                </label>
                <input
                  id='select-drivers-license'
                  className='hidden'
                  type='file'
                  accept='.pdf,.jpg,.jpeg,.png'
                  onChange={handleDriversLicenseChange}
                />
              </div>
            )}
          </div>

          {/* Bank Statements Upload Component */}
          <div className="mt-6">
            <label className="block text-gray-700 text-md font-bold mb-3">
              Last 4 Bank Statements <span className="text-red-500">*</span> <span className="font-normal text-sm">(At least 3 required)</span>
            </label>

            {/* List of uploaded bank statements */}
            {documentsInfo.bankStatements.length > 0 && (
              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-2">Uploaded statements ({documentsInfo.bankStatements.length}/4):</p>
                <div className="space-y-2">
                  {documentsInfo.bankStatements.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                      <div className="flex items-center">
                        <FaCheckCircle className="w-4 h-4 mr-2 text-green-400" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <button
                        onClick={() => removeBankStatement(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaRegTrashAlt className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload button - only show if less than 4 statements uploaded */}
            {documentsInfo.bankStatements.length < 4 && (
              <div className='flex w-full items-center justify-center'>
                <label
                  htmlFor='select-bank-statement'
                  className='group flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100'
                >
                  <div className='flex flex-col items-center justify-center py-5'>
                    <FaFileUpload className='w-6 h-6 text-gray-500 transition duration-75 group-hover:text-blue-600' />
                    <span className='text-sm text-gray-500 font-semibold group-hover:text-black'>
                      Click to upload Bank Statement (PDF, JPG, PNG)
                    </span>
                    <span className='text-xs text-gray-400 mt-1'>
                      {documentsInfo.bankStatements.length} of 4 uploaded
                    </span>
                  </div>
                </label>
                <input
                  id='select-bank-statement'
                  className='hidden'
                  type='file'
                  accept='.pdf,.jpg,.jpeg,.png'
                  onChange={handleBankStatementChange}
                />
              </div>
            )}
          </div>

          {/* Validation message */}
          {!areDocumentsValid() && documentsInfo && (
            <p className="text-red-500 text-sm mt-2">
              Please upload your driver's license and at least 3 bank statements to continue.
            </p>
          )}
        </div>

        {/* ------------------------- Button to continue -------------------------- */}
        <button
          onClick={handleContinue}
          disabled={loading || !areDocumentsValid()}
          className={`w-full py-3 px-6 text-xl lg:text-[28px] text-white font-bold transition-colors ${areDocumentsValid() && !loading
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

export default Step4