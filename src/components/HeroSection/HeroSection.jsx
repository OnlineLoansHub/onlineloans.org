import topbg from "../../assets/home/topbg.svg";
import bottombg from "../../assets/home/bottombg.svg";
import menuIcon from "../../assets/home/menu.svg";
import crossIcon from "../../assets/home/cross.svg";
import fillStar from "../../assets/home/fillstar.svg";
import starIcon from "../../assets/home/star.svg";
import mobileImg from "../../assets/home/mobileImg.png";
import heroArrow from "../../assets/home/applyarrow.svg";
import logo from "../../assets/home/ProCash.svg";
import belowTextLine from "../../assets/home/Vector.svg";
import rightArrow from "../../assets/home/rightArrow.svg";
import bgTopHero from "../../assets/home/bgheroTop.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const HeroSection = ({ whyus, howItWorks, faq, benefits }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("EN");

  const handleSelect = (lang) => {
    setActiveLang(lang);
  };
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="bg-[#F7F8FA]">
      <div className="hidden sm:hidden md:block lg:block xl:block absolute opacity-20 top-10 w-full">
        <img src={topbg} alt="" className="w-full h-full" />
      </div>
      <div className="relative">
        <div className="block sm:block md:hidden lg:hidden xl:hidden absolute opacity-15 top-10 w-full">
          <img src={bgTopHero} alt="" className="w-full h-full" />
        </div>
        <div className="max-w-[1110px] mx-auto 3 ">
          <header className="py-4">
            <div className="container mx-auto flex items-center justify-between px-4">
              {/* Logo */}
              <div>
                <img src={logo} alt="Logo" />
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden relative">
                <button
                  className="bg-[#FFFFFF] w-11 h-11 rounded-[9.2px] flex justify-center items-center shadow-[13.27px 9.29px 26.54px 0px #00000014]"
                  onClick={toggleMobileMenu}
                >
                  {isMobileMenuOpen ? (
                    <img src={crossIcon} alt="menu" />
                  ) : (
                    <img src={menuIcon} alt="menu" />
                  )}
                </button>
              </div>

              {/* Navigation Menu */}
              <nav className="hidden md:block">
                <ul className="flex space-x-8">
                  {[
                    {
                      label: "Why us?",
                      onClick: () => scrollToSection(whyus),
                    },
                    {
                      label: "How It Works",
                      onClick: () => scrollToSection(howItWorks),
                    },
                    {
                      label: "Benefits",
                      onClick: () => scrollToSection(benefits),
                    },
                    { label: "FAQ", onClick: () => scrollToSection(faq) },
                  ].map((item) => (
                    <li key={item.label}>
                      <p
                        onClick={item.onClick}
                        className=" font-medium text-base hover:text-[#6853E4] hover:underline text-[#171717] cursor-pointer"
                      >
                        {item.label}
                      </p>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Language Selector & Apply Button */}
              <div className="sm:hidden hidden md:flex items-center justify-center gap-6">
                <select
                  className="font-semibold bg-transparent text-sm text-[#12151A] leading-[15.68px] tracking-[-2.5%]"
                  defaultValue="EN"
                >
                  {["EN", "FR", "RU"].map((lang) => (
                    <option value={lang} key={lang}>
                      {lang}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  className="border rounded-full bg-[#171717] border-[#171717] py-[10px] px-3  font-medium text-sm text-white hover:bg-slate-800 hover:text-[#fff]"
                  onClick={() => navigate("/form")}
                >
                  Apply now
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <nav
              className={`${
                isMobileMenuOpen ? "block" : "hidden"
              } md:hidden bg-gray-50 border-t border-gray-200 transition-height duration-300 ease-in-out mt-4 w-[250px] max-w-[250px] rounded-[9.2px] absolute right-[36px] z-30`}
            >
              <ul className="p-6">
                {[
                  {
                    label: "Why us?",
                    onClick: () => scrollToSection(whyus),
                  },
                  {
                    label: "How It Works",
                    onClick: () => scrollToSection(howItWorks),
                  },
                  {
                    label: "Benefits",
                    onClick: () => scrollToSection(benefits),
                  },
                  { label: "FAQ", onClick: () => scrollToSection(faq) },
                ].map((item) => (
                  <li key={item.label} className="mb-6">
                    <p
                      onClick={item.onClick}
                      className="hover:text-[#171717] hover:underline  cursor-pointer font-semibold text-base text-[#171717]"
                    >
                      {item.label}
                    </p>
                  </li>
                ))}
                <li className="pb-6">
                  <button
                    type="button"
                    className="border rounded-full bg-[#171717] border-[#171717] py-[10px] px-3 font-medium text-sm w-full text-white hover:bg-slate-800 hover:text-[#fff] "
                    onClick={() => navigate("/form")}
                  >
                    Apply now
                  </button>
                </li>
                <li className="flex justify-between ">
                  {["EN", "FR", "RU"].map((lang) => (
                    <option
                      value={lang}
                      key={lang}
                      className={`border rounded-xl font-semibold text-sm px-[22.83px] py-[13px] cursor-pointer ${
                        activeLang === lang
                          ? "border-[#E9EFF7] text-[#12151A]"
                          : "border-none text-[#12151A73]"
                      }`}
                      onClick={() => handleSelect(lang)}
                    >
                      {lang}
                    </option>
                  ))}
                </li>
              </ul>
            </nav>
          </header>
          <div className="max-w-[730px] mx-auto flex flex-col items-center text-center ">
            <div className="bg-[#FFF] py-[13px] px-6 rounded-xl flex items-center gap-x-2 mt-5 sm:mt-[14px] md:mt-[14px] lg:mt-[14px] xl:mt-[14px] mb-5 z-20">
              <div className="flex gap-[0.88px]">
                <img src={fillStar} alt="star" />
                <h3 className="font-semibold text-[13.49px] sm:text-[17.6px] md:text-[17.6px] lg:text-[17.6px] xl:text-[17.6px] text-[#000]">
                  Trustpilot
                </h3>
              </div>
              <div className="flex gap-1 items-center">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="sm:w-5 sm:h-5 md:w-5 lg:w-5 xl:w-5 md:h-5 lg:h-5 xl:h-5 relative bg-[#00B57A]"
                  >
                    {/* Only for the last element */}
                    {index === 4 && (
                      <div
                        className="absolute bottom-0 right-0 h-full bg-[#d9d9d9]"
                        style={{ width: "20%" }}
                      ></div>
                    )}
                    <img
                      src={starIcon}
                      alt="star"
                      className="w-full h-full relative z-10"
                    />
                  </div>
                ))}

                <h3 className="font-medium text-[10.73px] ml-1 sm:text-sm md:text-sm lg:text-sm xl:text-sm text-[#000]">
                  4.9 Rating
                </h3>
              </div>
            </div>
            {/* Header */}
            <h1 className="font-semibold text-[40px] sm:text-[64px] md:text-[64px] lg:text-[64px] xl:text-[64px] text-gray-900 tracking-[-3px] leading-[48px] sm:leading-[72px] md:leading-[72px] lg:leading-[72px] xl:leading-[72px] ">
              Empowering Your Business with{" "}
              <span className="relative inline-block italic">
                AI-Driven
                <img
                  src={belowTextLine}
                  alt="underline"
                  className="absolute -bottom-2 left-0 w-full h-auto"
                />
              </span>{" "}
              Merchant Cash Advances
            </h1>

            {/* Subtitle */}
            <p className="font-normal text-sm sm:text-base md:text-base lg:text-base xl:text-base text-[#303030A3] text-center mt-6">
              Unlock Fast, Easy Money for Your Business. At ProCash.ai, we know
              every business is different. Whether you want to grow, need money
              for daily costs, or new things, our AI-Driven Merchant Cash
              Advance gives you the money you need quickly.
            </p>

            {/* Action Button */}
            <div className="relative pt-6 sm:pt-0 md:pt-0 lg:pt-0 xl:pt-0 sm:mt-11 md:mt-11 lg:mt-11 xl:mt-11">
              <button
                type="button"
                className="text-white font-semibold text-[18px] bg-[#6853E4] py-[24px] px-[44px] rounded-[100px] w-auto border border-[#201564] hover:bg-blue-400 hover:text-[#000] flex gap-2 items-center  "
                onClick={() => navigate("/registration-form")}
              >
                Apply now <img src={rightArrow} alt="" />
              </button>
              <div className="absolute right-[-275px] bottom-[-90px]">
                <img
                  src={heroArrow}
                  alt="arrow"
                  className="md:pb-5 lg:pb-5 xl:pb-5 hidden sm:hidden md:block lg:block xl:block "
                />
              </div>
            </div>
            {/* Extra Hint */}
            <div className="flex items-center gap-2 mt-16 z-50">
              <img src={mobileImg} alt="" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 z-10 w-full">
          <img src={bottombg} alt="" className="w-full h-full" />
        </div>
      </div>
    </section>
  );
};
