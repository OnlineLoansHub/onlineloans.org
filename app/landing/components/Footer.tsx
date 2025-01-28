import FacebookLogo from '@/public/assets/footer/facebook.png'
import TwitterLogo from '@/public/assets/footer/twitter.png'
import LinkedinLogo from '@/public/assets/footer/linkedin.png'
import GoogleLogo from '@/public/assets/footer/google.png'
import Flag from '@/public/assets/footer/flag.png'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  const TermsOfUse = '/pdf/Terms-Of-Use.pdf'
  const PrivacyPolicy = '/pdf/Privacy-Policy.pdf'

  return (
    <footer className='mx-auto sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1300px] w-full px-2 sm:px-6 md:px-8 lg:px-10'>
      <div className='pb-8'>
        <p className='text-center text-black text-[28px] font-semibold  leading-loose sm:text-start'>
          onCash.pro
        </p>
      </div>
      <section className='flex flex-col gap-5 md:flex-row md:justify-between md:items-center md:mx-auto md:w-full '>
        <div className='flex flex-col items-center justify-center'>
          <ul className='text-neutral-900 text-base font-medium leading-normal flex flex-col gap-4 text-center md:flex-row'>
            <li>
              <Link href='/' />
            </li>
            <li>
              <a href=''> How It Works</a>
            </li>
            <li>
              <a href=''> Benefits</a>
            </li>
            <li>
              <a href=''>FAQ</a>
            </li>
          </ul>
        </div>
        <div className='  flex gap-4 justify-center [&>img]:size-6 '>
          <Image
            src={FacebookLogo}
            alt='Facebook logo'
            height={20}
            width={20}
          />
          <Image src={TwitterLogo} alt='Twitter logo' height={20} width={20} />
          <Image
            src={LinkedinLogo}
            alt='Linkedin logo'
            height={20}
            width={20}
          />
          <Image src={GoogleLogo} alt='Google logo' height={20} width={20} />
        </div>
      </section>
      <section className='flex items-center justify-center py-8'>
        <div className='flex flex-col gap-8 text-center text-neutral-900 text-base font-medium  leading-normal md:w-full'>
          <ul className='flex flex-col gap-6 md:flex-row md:items-center md:gap-9  '>
            <li>
              <a href=''>Understanding Working Capital</a>
            </li>
            <li>
              <a href=''>Business Growth Tips</a>
            </li>
            <li>
              <a href=''>Financial Planning for Small Businesses</a>
            </li>
          </ul>
        </div>
      </section>

      <section className='py-8 flex flex-col gap-6 border-t border-t-[#EAECF0]/60 text-base font-normal leading-normal md:flex-row md:justify-between md:items-center'>
        <p className=' text-[#303030]/60 '>
          © 2025 onCash.pro All rights reserved
        </p>
        <div className='flex gap-1'>
          <p className=' text-neutral-900 '>Proudly by american</p>
          <Image src={Flag} alt='american' height={24} width={24} />
        </div>

        <div>
          <ul className='flex gap-4 text-[#303030]/60 text-base font-normal leading-normal'>
            <li>
              <a href={TermsOfUse}>Terms</a>
            </li>
            <li>
              <a href={PrivacyPolicy}>Privacy</a>
            </li>
            <li>
              <a href=''>Cookies</a>
            </li>
          </ul>
        </div>
      </section>
    </footer>
  )
}

export default Footer
