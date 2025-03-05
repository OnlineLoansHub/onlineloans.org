//React
import { useState, useEffect } from 'react'
// Zustand
import useStore from '../stores/stepperStore'
// Icons
import { FaFileUpload, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

const Step4: React.FC = () => {
  // -------------------- States -------------------- .
  const [loading, setLoading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')
  const [supabaseLoaded, setSupabaseLoaded] = useState(false)

  // Cargar el script de Supabase cuando el componente se monte
  useEffect(() => {
    // Verificar si el script ya está cargado
    if (window.supabase) {
      setSupabaseLoaded(true)
      return
    }

    // Crear y cargar el script
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js'
    script.async = true
    script.onload = () => {
      console.log('Supabase script loaded successfully')
      setSupabaseLoaded(true)
    }
    script.onerror = () => {
      console.error('Error loading Supabase script')
    }

    document.head.appendChild(script)

    // Limpiar el script si el componente se desmonta
    return () => {
      // No eliminamos el script para que esté disponible en toda la aplicación
    }
  }, [])

  // Extraer los valores y funciones del store
  const documentsInfo = useStore(state => state.documentsInfo)
  const setDriversLicense = useStore(state => state.setDriversLicense)
  const addBankStatement = useStore(state => state.addBankStatement)
  const removeBankStatement = useStore(state => state.removeBankStatement)
  const areDocumentsValid = useStore(state => state.areDocumentsValid)
  const uploadAllDocuments = useStore(state => state.uploadAllDocuments)
  const userRegisterInfo = useStore(state => state.userRegisterInfo)
  const businessRegisterInfo = useStore(state => state.businessRegisterInfo)
  const getUserFolderName = useStore(state => state.getUserFolderName)

  // -------------------- Handle Continue -------------------- .
  const handleContinue = async () => {
    // Verificar que Supabase esté cargado
    if (!supabaseLoaded) {
      setUploadStatus('Supabase is still loading. Please wait a moment...')
      return
    }

    // Verificar si los documentos son válidos
    if (!areDocumentsValid()) {
      alert("Please upload your driver's license and at least 3 bank statements")
      return
    }

    // Verificar que el usuario haya ingresado su nombre y el nombre de la empresa
    if (!userRegisterInfo.firstName || !businessRegisterInfo.businessName) {
      alert("Please make sure you've entered your name and business name in the previous steps")
      return
    }

    setLoading(true)
    setUploadStatus('Preparing documents for upload...')

    try {
      // Set the folder name based on the user's name and business
      const folderName = getUserFolderName()
      setUploadStatus(`Uploading documents to folder ${folderName}...`)

      // Upload all documents to Supabase
      const results = await uploadAllDocuments()
      const allSuccessful = results.every(result => result.success)

      if (allSuccessful) {
        setUploadStatus('All documents uploaded successfully!')
        // console.log('Documents uploaded successfully:', results)

        // ---------- Record Google Ads conversion event ----------.
        // if (typeof window !== 'undefined' && 'gtag' in window) {
        //   // @ts-expect-error - gtag no está definido en el tipo Window
        //   window.gtag('event', 'conversion', {
        //     'send_to': 'AW-16834519489/21YSCM-Ss6AaEMHDqds-',
        //     'value': 600.0,
        //     'currency': 'MXN'
        //   });
        // }

      } else {
        // Find errors
        const failedUploads = results.filter(result => !result.success)
        setUploadStatus(`Error uploading ${failedUploads.length} documents. Please try again.`)
        console.error('Failed uploads:', failedUploads)
      }
    } catch (error) {
      console.error('Error during upload process:', error)
      setUploadStatus('An unexpected error occurred. Please try again.')
    } finally {

      // ---------- Redirect to Thank You page ----------.
      setLoading(false)
      // window.location.href = '/join/thank-you';
    }
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
      className="w-full mx-auto px-3 mb-6"
    >
      {/* Message if Supabase is not loaded */}
      {!supabaseLoaded && (
        <div className="bg-yellow-100 text-yellow-800 p-3 rounded mb-4 text-center">
          Loading Supabase resources...
        </div>
      )}
      <div className='text-center'>
        <h2 className='text-lg font-bold mb-1 lg:leading-[38px] px-6 md:px-8 lg:text-2xl lg:font-bold'>
          You&apos;re Almost Approved! And You could Secure an Offer in only 2 Hours
        </h2>

        <h3 className='text-sm my-4 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 lg:text-base font-semibold text-black/80'>
          You&apos;re almost there! To get your personalized offer, we need to verify your business’s revenue consistency. This ensures we can provide the best funding options tailored to you.
        </h3>
      </div>

      <div className='w-full md:w-3/4 xl:w-1/2 mx-auto flex flex-col gap-6'>
        <h3 className='text-sm mt-10 text-start mb-2 lg:leading-[32px] lg:text-base font-medium text-black/70'>
          To secure an express funding offer —just upload your last 4 bank statements and a valid driver’s license. It takes less than 2 minutes!
        </h3>

        {/* ------------------------- CONTENT. UPLOAD 4 BANK STATEMENTS AND 1 DRIVERS LICENSE -------------------------- */}
        <div className='mb-6'>
          {/* Driver's License Upload Component */}
          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-3">
              Driver&apos;s License <span className="text-red-500">*</span>
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
                      <FaTimesCircle className="w-4 h-4" />
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
                  className='group flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-400 hover:border-sky-300 bg-zinc-100'
                >
                  <div className='flex flex-col items-center justify-center py-5'>
                    <FaFileUpload className='w-6 h-6 text-gray-500 transition duration-75 group-hover:text-blue' />
                    <span className='text-sm text-gray-500 font-semibold group-hover:text-blue'>Click to upload Driver&apos;s License (PDF, JPG, PNG)</span>
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
          <div className="mt-10">
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
                        <FaTimesCircle className="w-4 h-4" />
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
                  className='group flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-400 hover:border-sky-300 bg-zinc-100'
                >
                  <div className='flex flex-col items-center justify-center py-5'>
                    <FaFileUpload className='w-6 h-6 text-gray-500 transition duration-75 group-hover:text-blue' />
                    <span className='text-sm text-gray-500 font-semibold group-hover:text-blue'>
                      Click to upload Bank Statement (PDF, JPG, PNG)
                    </span>
                    <span className='text-xs text-gray-400 mt-1 '>
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

          {/* Validation and upload status messages */}
          {!areDocumentsValid() && documentsInfo && (
            <p className="text-red-500 text-sm mt-10">
              Please upload your driver&apos;s license and at least 3 bank statements to continue.
            </p>
          )}

          {uploadStatus && (
            <div className={`mt-4 p-3 rounded-lg text-center ${uploadStatus.includes('successfully')
              ? 'bg-green-100 text-green-800'
              : uploadStatus.includes('Error')
                ? 'bg-red-100 text-red-800'
                : 'bg-blue-100 text-blue-800'
              }`}>
              {uploadStatus}
            </div>
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
          {loading ? <span className="loader">Loading...</span> : 'Submit & Get Offer'}
        </button>
      </div>
    </div>
  )
}

export default Step4