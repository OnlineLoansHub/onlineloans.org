import NavbarDesktop from '@/app/landing/components/navbars/NavbarDesktop'
import NavbarMobile from '@/app/landing/components/navbars/NavbarMobile'
import Footer from '@/app/landing/components/Footer'
import LandingPage from '@/app/landing/LandingPage'

export default function Home() {
  return (
    <>
      <NavbarDesktop isLanding={true} />
      <NavbarMobile isLanding={true} />

      <LandingPage />

      <Footer />
    </>
  )
}
