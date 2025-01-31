'use client'
import NavbarDesktop from '@/app/landing/components/navbars/NavbarDesktop'
import NavbarMobile from '@/app/landing/components/navbars/NavbarMobile'
import Footer from '@/app/landing/components/Footer'
import LandingPage from '@/app/landing/LandingPage'
import { useClarity } from './Clarity'

export default function Home() {
  useClarity()
  return (
    <>
      <NavbarDesktop isLanding={true} />
      <NavbarMobile isLanding={true} />

      <LandingPage />

      <Footer />
    </>
  )
}
