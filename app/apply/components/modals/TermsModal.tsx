const TermsModal: React.FC = () => {
  return (
    <dialog id='terms-modal' className='modal'>
      <div className='modal-box bg-white border border-red-500 shadow-sm text-black rounded-md p-4'>
        <form method='dialog'>
          <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
            ✕
          </button>
        </form>
        <div className='flex flex-col items-center justify-center pb-4'>
          <h1 className='text-[27px]  font-bold text-center'>Terms Of Use</h1>
        </div>
        <div className='w-9/12 mx-auto'>
          <p className='text-xs pb-4'>
            Authorizations: The Merchant and Owner(s)/Officer(s) identified
            below (individually, an “Applicant”) each represents, acknowledges,
            and agrees that (1) all information and documents provided to oncash
            Now (“iAN”) are true, accurate, and complete, (2) Applicant will
            immediately notify iAN of any charge in such financial condition,
            (3) iAN and it’s affiliates, representatives, successors, assigns,
            designers, agents, partners (Recipients) are authorized to request
            and receive any investigative reports, credit reports, statements
            from creditors or financial institutions, verification of
            information, or any other information that iAN and it’s affiliates
            deem necessary, (4) Applicant waives and releases any claims against
            iAN and any information-providers arising from any act or omission
            relating to the requesting, receiving, or release of information,
            (5) each Owner/Officer represents that he or she is authorized to
            sign this form on behalf of Merchant, and (6) the Merchant and each
            Owner/Officers agrees to receive calls, texts, emails, or mail from
            iAN, and it’s affiliates. You also authorize iAN to transmit this
            Application, along with any of the foregoing information obtained in
            connection with this Application, to any or all of the Recipients
            for the foregoing purposes.
          </p>
        </div>
      </div>
    </dialog>
  )
}

export default TermsModal
