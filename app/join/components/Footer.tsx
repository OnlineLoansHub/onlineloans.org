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
        <div className='bg-[#EDF1F4] w-full py-5 '>
          <div className='text-sm font-light text-black max-w-screen-md mx-auto py-2 w-10/12 lg:w-full'>
            <p>
              **Merchant Cash Advance (MCA) is not a traditional loan and does
              not have an Annual Percentage Rate (APR). It is a purchase of
              future receivables and requires no collateral. Repayment is based
              on a fixed percentage of your future business revenue, with
              flexible terms ranging from 3 to 24 months, depending on your
              business’s qualifications and performance.
            </p>
          </div>
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
