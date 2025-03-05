// React
import { useState, useEffect } from 'react'
// Next
import Image from 'next/image'
// Zustand
import useStore from '../stores/stepperStore'
// Images
import ThankYouGif from '@/public/assets/under-construction/thankYou.gif'

const ThankYou: React.FC = () => {
    // -------------------- States -------------------- .
    const [loading, setLoading] = useState(false)
    const [resetComplete, setResetComplete] = useState(false)

    // Get reset function from store
    const reset = useStore(state => state.reset)

    // -------------------- Reset State on Mount -------------------- .
    useEffect(() => {
        // Log the state before reset for debugging
        const stateBefore = useStore.getState()
        console.log("State before reset:", stateBefore)

        // Reset the state
        reset()
        setResetComplete(true)

        // Log the state after reset to confirm it worked
        const stateAfter = useStore.getState()
        console.log("State after reset:", stateAfter)

    }, [reset]) // Only run once when component mounts

    // -------------------- Handle Continue -------------------- .
    const handleContinue = async () => {
        setLoading(true)

        const currentState = useStore.getState();
        console.log("Current global state:", currentState);

        setLoading(false)
        // Redirect to home page
        window.location.href = '/';
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
                    src={ThankYouGif}
                    alt='thank you animation'
                    width={200}
                    className='object-contain mx-auto mb-3'
                    style={{ objectFit: 'contain', height: 'auto' }}
                    unoptimized={true} // Esta línea es importante para GIFs animados
                />

                <p className='text-lg font-medium mb-3 lg:leading-[38px] px-8 lg:text-2xl'>
                    Our special Funder Agent will call you with the best offer as soon as possible
                </p>

                {resetComplete && (
                    <p className="text-sm text-green-600 mt-2">
                        Application data cleared successfully
                    </p>
                )}
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

export default ThankYou