const ContactModal: React.FC = () => {
  return (
    <dialog id='contact-modal' className='modal'>
      <div className='modal-box bg-white border border-red-500 shadow-sm text-black rounded-md p-4'>
        <form method='dialog '>
          <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
            ✕
          </button>
        </form>
        <div className='flex flex-col items-center justify-center pb-4 '>
          <h1 className='text-[27px]  font-bold text-center'>Contact Us</h1>
        </div>
        <div>
          <p className='text-xs pb-4'>
            If you have any questions, please contact us by email at
            info@oncash.com, or with a letter by postal mail to:
          </p>
          <ul className=' list-outside text-xs'>
            <li>OnCash </li>
            <li>300 RXR Plaza</li>
            <li>Uniondale, New York 11556</li>
            <li>USA</li>
          </ul>
        </div>
      </div>
    </dialog>
  )
}

export default ContactModal
