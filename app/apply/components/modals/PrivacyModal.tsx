const PrivacyModal: React.FC = () => {
  return (
    <dialog id='privacy-modal' className='modal'>
      <div className='modal-box bg-white border border-red-500 shadow-sm text-black rounded-md max-h-screen overflow-y-auto p-4'>
        <form method='dialog'>
          <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
            ✕
          </button>
        </form>
        <div className='flex flex-col items-center justify-center pb-4'>
          <h1 className='text-2xl font-bold text-center'>Privacy Policy</h1>
          <p className='text-sm text-gray-500'>
            Last updated: February 21, 2020
          </p>
        </div>
        <div className='space-y-4 text-xs'>
          <p>
            This Privacy Policy applies to data collected by oncash Now Inc.
            (&quot;oncash&quot;, &quot;us&quot;, &quot;we&quot;, or
            &quot;our&quot;) operates the https://oncashnow.com website (the
            &quot;website&quot;). This Privacy Policy informs you of our
            policies regarding the collection, use and disclosure of Personal
            Information when you use our Website.
          </p>

          <div>
            <h2 className='font-semibold text-sm mb-2'>
              Information We Collect
            </h2>
            <p>
              When using our Website, we may collect the following information
              from you:
            </p>
            <ul className='list-disc pl-6 space-y-1'>
              <li>
                Contact information such as name, business name, email address,
                mailing address, and phone number
              </li>
              <li>
                Financial Information such as bank statements, credit card
                statements, average bank balance, personal and business credit
                history, payment behavior, bank account information and tax id
                number
              </li>
              <li>Social Security Number</li>
              <li>
                Unique identifiers such as user name and password, and IP
                address
              </li>
              <li>
                Business information including company size, and business type
              </li>
              <li>Beneficial ownership information</li>
            </ul>
          </div>

          <div>
            <h2 className='font-semibold text-sm mb-2'>
              How We Use Your Information
            </h2>
            <p>We use this information to:</p>
            <ul className='list-disc pl-6 space-y-1'>
              <li>
                Operate, maintain, improve, and provide the Service and conduct
                our business
              </li>
              <li>
                Verify your identity and conduct appropriate due diligence
              </li>
              <li>
                Process your business&apos; application and determine
                qualification for financial products
              </li>
              <li>
                Communicate with you regarding orders, customer service,
                marketing, and account updates
              </li>
              <li>
                Conduct research and analyses to better understand our customers
              </li>
              <li>
                Produce data analytics and reports with de-identified summaries
              </li>
            </ul>
          </div>

          <div>
            <h2 className='font-semibold text-sm mb-2'>
              Privacy and Sharing Information
            </h2>
            <p>
              oncash will share your Personal Information with third parties
              only in ways described in this Privacy Policy and as required by
              law. We do not sell your Personal Information to third parties.
            </p>
          </div>

          <div>
            <h2 className='font-semibold text-sm mb-2'>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <p className='mt-2'>
              oncash Now
              <br />
              300 RXR Plaza
              <br />
              Uniondale, New York 11556
              <br />
              USA
              <br />
              Email: info@oncashnow.com
            </p>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export default PrivacyModal
