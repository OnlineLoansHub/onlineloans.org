'use client'

import React, { useState } from 'react'
import Logo from '@/public/assets/navbar/logo.png'
import Image from 'next/image'

interface NavbarDesktopProps {
  isLanding: boolean
}

const NavbarDesktop: React.FC<NavbarDesktopProps> = ({ isLanding }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLang, setSelectedLang] = useState('EN')

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'ES', name: 'Español' },
  ]

  return (
    <header className='hidden text-black justify-center items-center lg:inline-flex fixed z-50 w-full bg-[#F7F8FA]'>
      <div className='sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1300px] w-full px-4 sm:px-6 md:px-8 lg:px-4'>
        <nav className='flex justify-between items-center rounded-xl h-20 w-full px-5'>
          <div className='flex items-center flex-grow-0'>
            <div className='font-normal text-lg flex gap-2 items-center'>
              <a href={`${isLanding ? '#hero-section' : 'index.html'}`}>
                <Image
                  id='navbar-logo'
                  className='object-contain shrink-0'
                  height={144}
                  width={144}
                  src={Logo}
                  alt='logo'
                />
              </a>
            </div>
          </div>

          <div className='flex-grow-1'>
            <div className='font-normal'>
              <ul
                id='nav-items'
                className='flex justify-center gap-10 xl:gap-20'
              >
                <li className='transition-all duration-200 nav-item'>
                  <a
                    href={`${isLanding ? '#why-us-section' : 'index.html#why-us-section'}`}
                  >
                    Why Us?
                  </a>
                </li>
                <li className='transition-all duration-200 nav-item'>
                  <a
                    href={`${isLanding ? '#how-it-works-section' : 'index.html#how-it-works-section'}`}
                  >
                    How It Works
                  </a>
                </li>
                <li className='transition-all duration-200 nav-item'>
                  <a
                    href={`${isLanding ? '#benefits-section' : 'index.html#benefits-section'}`}
                  >
                    Benefits
                  </a>
                </li>
                <li className='transition-all duration-200 nav-item'>
                  <a
                    href={`${isLanding ? '#faq-section' : 'index.html#faq-section'}`}
                  >
                    F.A.Q
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <div className='relative'>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className='flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100'
              >
                {selectedLang}
                {/* svg */}
              </button>

              {isOpen && (
                <div className='absolute right-0 mt-2 bg-white rounded-lg shadow-lg py-1 w-32'>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className='w-full px-4 py-2 text-left hover:bg-gray-100'
                      onClick={() => {
                        setSelectedLang(lang.code)
                        setIsOpen(false)
                      }}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href='booking.html'
              className='bg-[#0F0F0F] hover:scale-105 transition-all duration-200 py-2 px-5 rounded-full text-white'
            >
              <span className='font-medium'>Contact Us</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default NavbarDesktop
