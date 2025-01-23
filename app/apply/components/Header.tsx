import Logo from '@/public/assets/apply/header/logo.png'
import Image from 'next/image'

const Header: React.FC = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center py-3 relative'>
        <Image src={Logo} alt='logo' width={200} height={200} />
      </div>
    </>
  )
}

export default Header
