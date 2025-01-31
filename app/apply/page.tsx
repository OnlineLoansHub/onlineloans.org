'use client'
import { MontserratFont } from '@/app/Fonts'

import MainFooter from './components/Footer'
import Main from './components/Main'
import { useClarity } from '../Clarity'

const Test: React.FC = () => {
  useClarity()
  return (
    <main className={MontserratFont.className}>
      <Main />

      <MainFooter />
    </main>
  )
}
export default Test
