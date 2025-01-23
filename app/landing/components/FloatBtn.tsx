import React from 'react'
import Image from 'next/image'
import FLoatBtnIcon from '@/public/assets/floatBtn.png'

const FloatBtn: React.FC = () => {
  return (
    <div className='rounded-full shadow-lg sticky bottom-[10%] left-[90%] z-50 m-6 size-16 bg-white p-3 '>
      <Image src={FLoatBtnIcon} alt='contact' />
    </div>
  )
}

export default FloatBtn
