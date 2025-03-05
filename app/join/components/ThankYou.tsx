// React
import { useState } from 'react'
// Next
import Image from 'next/image'
// Zustand
import useStore from '../stores/stepperStore'
// Images
import Image1 from '@/public/assets/under-construction/thankYou.png'

const Step4: React.FC = () => {

    // -------------------- States -------------------- .
    const [loading, setLoading] = useState(false)

    // -------------------- Handle Continue -------------------- .
    const handleContinue = async () => {
        setLoading(true)

        const currentState = useStore.getState();
        console.log("Estado global actualizado:", currentState);

        setLoading(false)
        // window.location.href = '/';
    }

    // -------------------- Return -------------------- .
    return (
        <div
            className="w-full mx-auto px-3"
        >
            <div className='text-center mb-10'>
                <h2 className='text-xl font-bold mb-3 lg:leading-[38px] px-8 lg:text-3xl'>
                    You&apos;re Almost Approved!
                </h2>

                <Image
                    src={Image1}
                    alt='footer'
                    width={220}
                    className=' object-contain mx-auto mb-3'
                    style={{ objectFit: 'contain', height: 'auto' }}
                />

                <p className='text-lg font-medium mb-3 lg:leading-[38px] px-8 lg:text-2xl'>
                    Our special Funder Agent will call you with the best offer as soon as possible
                </p>
            </div>

            <div className='w-full lg:w-5/12 mx-auto flex flex-col gap-6'>
                <button
                    onClick={handleContinue}
                    disabled={loading}
                    className="w-full py-3 px-6 text-xl lg:text-[28px] text-white font-bold transition-colors bg-green-500 hover:bg-green-600"

                >
                    {loading ? <span className="loader">Loading</span> : 'Continue'}
                </button>
            </div>
        </div>
    )
}

export default Step4