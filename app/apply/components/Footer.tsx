import ContactModal from './modals/ContactModal'
import PrivacyModal from './modals/PrivacyModal'
import TermsModal from './modals/TermsModal'

const MainFooter: React.FC = () => {
  const handleModalClick = (modalId: string) => {
    // Type assertion para indicar que el elemento existe
    const modal = document.getElementById(modalId) as HTMLDialogElement
    modal?.showModal()
  }

  return (
    <>
      <section className='flex-flex-col'>
        <div className='bg-[#EDF1F4] w-full py-5 h-[60px]'>
          {/* Commented section */}
        </div>
        <div className='py-9 space-y-3'>
          <ul className='text-sm font-normal flex flex-wrap justify-center gap-2 text-black lg:font-medium'>
            <li>
              <button onClick={() => handleModalClick('contact-modal')}>
                Contact Us |
              </button>
            </li>
            <li>
              <button onClick={() => handleModalClick('terms-modal')}>
                Terms Of Service |
              </button>
            </li>
            <li>
              <button onClick={() => handleModalClick('privacy-modal')}>
                Privacy Policy |
              </button>
            </li>
          </ul>
          <p className='text-sm font-normal text-center lg:font-medium text-black'>
            © Copyright 2025. All Rights Reserved.
          </p>
        </div>
      </section>

      <ContactModal />
      <TermsModal />
      <PrivacyModal />
    </>
  )
}

export default MainFooter
