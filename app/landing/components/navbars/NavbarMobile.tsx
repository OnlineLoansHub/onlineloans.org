'use client'

import React, { useState } from 'react'
import Logo from '@/public/assets/navbar/logo.png'
import MenuIcon from '@/public/assets/navbar/menu.png'
import Image from 'next/image'
import Link from 'next/link'

interface NavbarMobileProps {
  isLanding: boolean
}

const NavbarMobile: React.FC<NavbarMobileProps> = ({ isLanding }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  return (
    <header className='flex items-center justify-center lg:hidden fixed w-full px-4 sm:px-6 md:px-8 lg:px-10 z-50 bg-[#F7F8FA]'>
      <nav className='flex z-50 relative justify-between h-[80px] sm:w-[640px] md:w-[768px] w-full'>
        <div className='text-lg flex gap-4 items-center'>
          <a
            className='flex items-center gap-2'
            href={`${isLanding ? '#home-section' : 'index.html'}`}
          >
            <Image
              className='object-contain'
              height={150}
              width={150}
              src={Logo}
              alt=''
              id='logo-mobile'
              title=''
            />
          </a>
        </div>
        <div
          id='menu-icon-container'
          className='flex items-center justify-center'
        >
          <div className='flex justify-center items-center p-3 rounded-2xl bg-white shadow-sm'>
            <Image
              src={MenuIcon}
              onClick={() => setMenuIsOpen(!menuIsOpen)}
              className='object-contain'
              height={28}
              width={28}
              id='menu-icon'
              alt='Menu icon'
            />
          </div>
        </div>
      </nav>

      <div
        id='menu'
        className={`fixed right-0 top-0 h-max rounded-lg mt-20 w-[50vw] bg-white z-50 ${menuIsOpen ? 'block' : 'hidden'}`}
      >
        <div className='p-4'>
          <ul className='space-y-6'>
            <li>
              <a
                href='#why-us'
                className='flex justify-between items-center text-base font-medium'
              >
                Why us?
              </a>
            </li>
            <li>
              <a
                href='#how-it-works'
                className='flex justify-between items-center text-base font-medium'
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                href='#benefits'
                className='flex justify-between items-center text-base font-medium'
              >
                Benefits
              </a>
            </li>
            <li>
              <a
                href='#faq'
                className='flex justify-between items-center text-base font-medium'
              >
                FAQ
              </a>
            </li>
          </ul>

          <div className='mt-4 px-4'>
            <Link href='/apply'>
              <button className='w-full mb-4 bg-black text-white rounded-lg py-3'>
                Apply now
              </button>
            </Link>
            <div className='flex gap-4'>
              <button className='flex-1 py-2 border border-gray-300 rounded-lg text-sm font-medium'>
                EN
              </button>
              <button className='flex-1 py-2 border border-gray-300 rounded-lg text-sm font-medium'>
                FR
              </button>
              <button className='flex-1 py-2 border border-gray-300 rounded-lg text-sm font-medium'>
                RU
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavbarMobile
