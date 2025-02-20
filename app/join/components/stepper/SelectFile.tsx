import { FaFileUpload, FaCheckCircle } from 'react-icons/fa'
import { useCreateCompany } from '../../../storage/createCompany'
import { useEffect } from 'react'

export default function DragTest () {
  const { setCerFile } = useCreateCompany()
  const cerFile = useCreateCompany((state) => state.cerFile)

  function handleChange (e) {
    setCerFile(e.target.files[0])
  }

  useEffect(() => {
    setCerFile(null)
  }
  , [])
  return (
    <div className='flex w-full items-center justify-center'>
      {!cerFile && (
        <label
          htmlFor='select-cerFile' className='group flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100'
        >
          <div className='flex flex-col items-center justify-center py-5'>
            <FaFileUpload className=' w-6 h-6 text-gray-500 transition duration-75  group-hover:text-blue-600  ' />
            <span className='text-sm text-gray-500 font-semibold group-hover:text-black'>Da click para subir el archivo .cer</span>
          </div>
        </label>
      )}
      {cerFile && (
        <div className='w-full flex justify-between'>
          <div className=' w-3/4 flex items-center'>
            <FaCheckCircle className=' w-4 h-4 mr-2 text-green-400  transition duration-75  group-hover:text-blue-600  ' />
            <span className='overflow-x-auto'>{cerFile.name}</span>
          </div>
          <label htmlFor='select-cerFile' className='group flex min-w-fit cursor-pointer flex-col items-center justify-center rounded-lg px-2 py-1 bg-slate-200   hover:bg-slate-300'>Elegir otro</label>
        </div>
      )}
      <input id='select-cerFile' className='hidden' type='file' accept='.cer, .pdf' onDrop={(e) => e.preventDefault()} onChange={(e) => handleChange(e)} />
    </div>

  )
}
