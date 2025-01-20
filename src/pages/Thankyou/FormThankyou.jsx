import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";
import ThankYou from "../../components/ThankYou/ThankYou";
const Thankyou = () => {
  const location = useLocation();

  useEffect(() => {
    if (location?.pathname === "/thankyou") {
      // google tag

      const gtagScript = document.createElement("script");
      gtagScript.async = true;
      gtagScript.src =
        "https://www.googletagmanager.com/gtag/js?id=AW-11530121883";
      document.head.appendChild(gtagScript);
      // conversion
      const gtagInitScript = document.createElement("script");
      gtagInitScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-11530121883');
      `;
      document.head.appendChild(gtagInitScript);



      const gtagConversionScript = document.createElement("script");
      setTimeout(() => {
      gtagConversionScript.innerHTML = `
      gtag('event', 'conversion', {
        'send_to': 'AW-11530121883/MJVVCJbepf4ZEJvl_vkq',
        'value': 1.0,
        'currency': 'USD'
      });
    `;
      document.body.append(gtagConversionScript);
      }, 500)

      //facebook
      const fbPixelScript = document.createElement("script");
      fbPixelScript.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '592433636853293'); 
      fbq('track', 'PageView'); 
      fbq('track', 'CompleteRegistration'); // Custom Event: Registration
    `;
      document.head.appendChild(fbPixelScript);

      const fbNoScript = document.createElement("noscript");
      fbNoScript.innerHTML = `
      <img height="1" width="1" style="display:none" 
      src="https://www.facebook.com/tr?id=592433636853293&ev=PageView&noscript=1"/>
    `;
      document.head.appendChild(fbNoScript);

      return () => {
        [
          gtagScript,
          gtagInitScript,
          gtagConversionScript,
          fbPixelScript,
          fbNoScript,
        ].forEach((script) => {
          if (script.parentNode) {
            script.parentNode.removeChild(script);
          }
        });
      };
    }
  }, [location.pathname]);

  return (
    <>
      <ThankYou />
    </>
  );
};

export default Thankyou;
