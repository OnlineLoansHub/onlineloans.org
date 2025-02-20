'use client'
import { MontserratFont } from '@/app/Fonts'

import MainFooter from './components/Footer'
import Main from './components/Main'
import { useClarity } from '../Clarity'

const Test: React.FC = () => {
  useClarity({ id: 'q2nk0pkquq' })
  //q2nk0pkquq
  return (
    <main className={MontserratFont.className}>
      <Main />

      <MainFooter />
    </main>
  )
}
export default Test
