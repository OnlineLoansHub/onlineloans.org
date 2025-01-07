import React, { useEffect } from "react";
import successIcon from "../../assets/Featuredicon.svg";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/home/ProCash.svg";
const Thankyou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const gtagScript = document.createElement("script");
    gtagScript.src =
      "https://www.googletagmanager.com/gtag/js?id=AW-11530121883";
    gtagScript.async = true;

    document.head.appendChild(gtagScript);

    const inlineScript = document.createElement("script");
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-11530121883');
    `;

    document.head.appendChild(inlineScript);

    return () => {
      if (gtagScript.parentNode) {
        document.head.removeChild(gtagScript);
      }
      if (inlineScript.parentNode) {
        document.head.removeChild(inlineScript);
      }
    };
  }, []);

  useEffect(() => {
    const existingGTM = document.querySelector(
      `script[src="https://www.googletagmanager.com/gtag/js?id=AW-11530121883"]`
    );
    if (existingGTM) {
      existingGTM.remove();
    }

    const inlineGTM = Array.from(
      document.head.getElementsByTagName("script")
    ).find((script) => script.innerHTML.includes("gtag('js'"));
    if (inlineGTM) {
      inlineGTM.remove();
    }

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
      if (fbPixelScript.parentNode) {
        document.head.removeChild(fbPixelScript);
      }
      if (fbNoScript.parentNode) {
        document.head.removeChild(fbNoScript);
      }
    };
  }, []);

  return (
    <div className="max-w-[1110px] mx-auto 3 ">
      <header className="py-4">
        <div className="container mx-auto  px-4">
          <div
            onClick={() => {
              navigate("/form");
            }}
          >
            <img src={logo} alt="Logo" className="cursor-pointer" />
          </div>
        </div>
      </header>
      <div className="h-[80vh]">
        <div className="flex min-h-full items-center justify-center mx-3 ">
          <div className="relative transform  rounded-lg bg-white shadow-xl sm:w-full sm:max-w-md  md:max-w-md lg:max-w-md xl:max-w-md px-6 pt-8 pb-6 ">
            <div className="bg-white">
              <div className="">
                <div className="flex items-center justify-center">
                  <img src={successIcon} alt="icon" />
                </div>
                <div className="text-center mt-6">
                  <h2
                    id="modal-title"
                    className="text-2xl font-semibold text-[#101828] mb-4"
                  >
                    Thank You!
                  </h2>
                  <div className="">
                    <p className="text-[13px] font-medium text-[#303030A3] text-center">
                      Your application has been received. Our team will review
                      your information and get back to you within 24 hours. In
                      the meantime, feel free to contact us at{" "}
                      <span
                        className="cursor-pointer hover:text-[#6853E4] hover:underline "
                        onClick={() =>
                          window.open("mailto:support@procash.ai", "_self")
                        }
                      >
                        support@procash.ai
                      </span>{" "}
                      if you have any questions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex  justify-center">
              <button
                type="button"
                onClick={() => navigate("/form")}
                className="text-white font-medium text-sm bg-[#5D74F1] py-[14px] px-[26px] rounded-[100px] w-auto hover:bg-blue-400 hover:text-[#000]"
              >
                return to the form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
