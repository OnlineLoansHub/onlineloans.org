import type { Metadata } from 'next'
import Script from 'next/script'
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
      <Script
        async={true}
        src='https://www.googletagmanager.com/gtag/js?id=AW-16834519489'
      ></Script>
      <Script>
        {`
             window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-16834519489');
`}
      </Script>

      <body className='antialiased bg-white'>{children}</body>
    </html>
  )
}
