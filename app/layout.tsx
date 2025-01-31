import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import '@/app/Clarity'

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
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      {/* Google Tag Manager */}
      <Script
        async
        src='https://www.googletagmanager.com/gtag/js?id=AW-16834519489'
      />
      <Script id='google-analytics'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-16834519489');
        `}
      </Script>

      {/* Microsoft Clarity */}
      {/* <Script id='clarity'>
        {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "q22rqfm6yn");
        `}
      </Script> */}

      <body className='antialiased bg-white'>{children}</body>
    </html>
  )
}
