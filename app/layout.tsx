import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Oncash | Find The Perfect Loan For Your Business',
  description:
    'Qualify For A $5,000 - $5,000,000 Business Loan or Credit Line In Minutes',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='antialiased bg-white'>{children}</body>
    </html>
  )
}
