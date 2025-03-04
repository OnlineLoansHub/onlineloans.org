import Image1 from '@/public/assets/apply/stepper/footer.png'
import Image from 'next/image'

const TrustpilotFooter: React.FC = () => {
  return (
    <div className='py-3 lg:py-7 px-4 lg:px-0'>
      <Image
        src={Image1}
        alt='footer'
        width={154}
        className=' object-contain mx-auto'
        style={{ objectFit: 'contain', height: 'auto' }}
      />
    </div>
  )
}

export default TrustpilotFooter
