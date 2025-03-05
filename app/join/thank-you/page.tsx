'use client'
import ThankYou from '../components/ThankYou'
import TrustpilotFooter from '../components/TrustpilotFooter'

const ThankYouPage: React.FC = () => {
    return (
        <div className='flex flex-col bg-white w-11/12 lg:w-8/12 mx-auto shadow-lg rounded-lg text-black relative'>
            <main className='md:w-10/12 mx-auto lg:w-full pt-10'>
                <ThankYou />
            </main>

            <TrustpilotFooter />
        </div>
    )
}

export default ThankYouPage
