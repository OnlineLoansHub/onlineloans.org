'use client'
import { MontserratFont } from '@/app/Fonts'

import MainFooter from './components/Footer'
import Main from './components/Main'

const Test: React.FC = () => {
  return (
    <main className={MontserratFont.className}>
      <Main />

      <MainFooter />
    </main>
  )
}
export default Test
