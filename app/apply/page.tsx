'use client'
import { MontserratFont } from '@/app/Fonts'
import Header from './components/Header'
import MainFooter from './components/Footer'
import BusinessStepper from './components/stepper/Stepper'

const Test: React.FC = () => {
  return (
    <main className={MontserratFont.className}>
      <Header />
      <BusinessStepper />
      <MainFooter />
    </main>
  )
}
export default Test
