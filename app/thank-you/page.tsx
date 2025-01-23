'use client'
import MainFooter from '../apply/components/Footer'
import Header from '../apply/components/Header'
import Link from 'next/link'

const ThankYou: React.FC = () => {
  return (
    <>
      <Header />
      <div className='bg-blue text-white py-8 px-2 lg:py-7 lg:h-[35vh] w-full md:py-8 flex flex-col items-center justify-center'>
        <div className='w-full md:w-1/2 mx-auto flex flex-col gap-6'>
          <p className='text-4xl font-bold'>
            Congrats we’ve matched you with a Personal Loan Partner
          </p>
          <ul className='text-base text-left'>
            <li>Borrow up to $250,000</li>
            <li>Money as soon as next business day</li>
            <li>Application takes less than 60 seconds</li>
            <li>APRs from 2.49%</li>
          </ul>
          <Link href='/'>
            <button className='bg-yellow-400 text-black py-3 px-6 rounded-lg text-4xl'>
              Check Rates
            </button>
          </Link>
        </div>
      </div>
      <MainFooter />
    </>
  )
}

export default ThankYou
