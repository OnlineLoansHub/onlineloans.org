import { useEffect, useRef } from "react";
import Glide from "@glidejs/glide";
import { HeroSection } from "../../components/HeroSection/HeroSection";
import { CashAdvanceSection } from "../../components/CashAdvance/CashAdvanceSection";
import { AboutProCashSection } from "../../components/AboutProCash/AboutProCashSection";
import { HowItworksSection } from "../../components/HowItWorks/HowItworksSection";
import { BenefitsChoosingSection } from "../../components/BenefitsChoosing/BenefitsChoosingSection";
import { SuccessStoriesSection } from "../../components/SuccessStories/SuccessStoriesSection";
import { HowToApply } from "../../components/HowToApply/HowToApply";
import { TestimonialSection } from "../../components/Testimonials/TestimonialSection";
import { ReadyPropelSection } from "../../components/ReadyPropel/ReadyPropelSection";
import { FooterSection } from "../../components/Footer/FooterSection";
import { GrowNowComp } from "../../components/GrowNowComp/GrowNowComp";

const GrowNowForm = () => {
  const howItWorks = useRef(null);
  const whyus = useRef(null);
  const benefits = useRef(null);
  const faq = useRef(null);
  const readyPropel = useRef(null);
  const aboutProcash = useRef(null);
  const grownowRef = useRef(null);
  useEffect(() => {
    const slider = new Glide(".glide-02", {
      type: "carousel",
      focusAt: "center",
      perView: 1,
      autoplay: 3000,

      animationDuration: 700,
      gap: 24,
      classNames: {
        nav: {
          active: "[&>*]:bg-wuiSlate-700",
        },
      },
      breakpoints: {
        1024: {
          perView: 1,
        },
        640: {
          perView: 1,
        },
      },
    }).mount();

    return () => {
      slider.destroy();
    };
  }, []);

  useEffect(() => {
    const slider = new Glide(".glide-01", {
      type: "carousel",
      focusAt: "center",
      perView: 3,
      autoplay: 3000,
      animationDuration: 700,
      gap: 24,
      breakpoints: {
        1024: {
          perView: 1,
        },
        640: {
          perView: 1,
        },
      },
    }).mount();

    const updateActiveDot = () => {
      const buttons = document.querySelectorAll(
        ".glide-02 [data-glide-el='controls[nav]'] button span"
      );
      buttons.forEach((button, index) => {
        if (index === slider.index) {
          button.classList.add("bg-black");
          button.classList.remove("bg-white/20");
        } else {
          button.classList.add("bg-white/20");
          button.classList.remove("bg-black");
        }
      });
    };

    slider.on(["mount.after", "run"], updateActiveDot);

    return () => {
      slider.destroy();
    };
  }, []);

  useEffect(() => {
    const gtagScript = document.createElement("script");
    gtagScript.async = true;
    gtagScript.src =
      "https://www.googletagmanager.com/gtag/js?id=AW-11530121883";
    document.head.appendChild(gtagScript);

    const gtagInitScript = document.createElement("script");
    gtagInitScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-11530121883');
      `;
    document.head.appendChild(gtagInitScript);
    return () => {
      if (gtagScript.parentNode) {
        document.head.removeChild(gtagScript);
      }
      if (gtagInitScript.parentNode) {
        document.head.removeChild(gtagInitScript);
      }
    };
  }, []);

  return (
    <div>
      <HeroSection
        benefits={benefits}
        whyus={whyus}
        howItWorks={howItWorks}
        faq={faq}
        grownowRef={grownowRef}
      />
      <GrowNowComp grownowRef={grownowRef} />
      <CashAdvanceSection whyus={whyus} grownowRef={grownowRef} />
      <AboutProCashSection
        aboutProcash={aboutProcash}
        grownowRef={grownowRef}
      />
      <HowItworksSection howItWorks={howItWorks} grownowRef={grownowRef} />
      <BenefitsChoosingSection benefits={benefits} />
      <SuccessStoriesSection />
      <HowToApply faq={faq} />
      <TestimonialSection />
      <ReadyPropelSection readyPropel={readyPropel} grownowRef={grownowRef} />
      <FooterSection
        benefits={benefits}
        whyus={whyus}
        howItWorks={howItWorks}
        faq={faq}
        readyPropel={readyPropel}
        aboutProcash={aboutProcash}
      />
    </div>
  );
};

export default GrowNowForm;
