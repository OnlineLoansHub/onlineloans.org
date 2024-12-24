/* eslint-disable jsx-a11y/anchor-is-valid */
import flag from "../../assets/home/flag.svg";
import facebookIcon from "../../assets/home/facebook.svg";
import twitterIcon from "../../assets/home/twitter.svg";
import linkendinIcon from "../../assets/home/linkendin.svg";
import googleIcon from "../../assets/home/google.svg";
export const FooterSection = ({ whyus, howItWorks, faq, benefits }) => {
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <footer className="max-w-[1110px] mx-auto px-3">
      <div className="pt-16 pb-12">
        <div>
          <h3 className="text-center sm:text-start md:text-start lg:text-start xl:text-start font-semibold text-[28px] leading-[32px] text-[#000] mb-8">
            ProCash.ai
          </h3>
          <div className="flex justify-between gap-y-8 flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row items-center  flex-wrap mb-6">
            <ul className="flex gap-x-8 gap-y-6 flex-col items-center sm:flex-row md:flex-row lg:flex-row xl:flex-row">
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
                    className="hover:text-[#6853E4] hover:underline cursor-pointer text-base font-medium text-[#171717] mb-0"
                  >
                    {item.label}
                  </p>
                </li>
              ))}
            </ul>
            <ul className="flex gap-4">
              <li className="text-base font-normal text-[#303030A3] mb-0">
                <a href="#">
                  <img src={facebookIcon} alt="" />
                </a>
              </li>
              <li className="text-base font-normal text-[#303030A3] mb-0">
                <a href="#">
                  <img src={twitterIcon} alt="" />
                </a>
              </li>
              <li className="text-base font-normal text-[#303030A3] mb-0">
                <a href="#">
                  <img src={linkendinIcon} alt="" />
                </a>
              </li>
              <li className="text-base font-normal text-[#303030A3] mb-0">
                <a href="#">
                  <img src={googleIcon} alt="" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mb-8 sm:mb-8 md:mb-16 lg:mb-16 xl:mb-16">
          <ul className="flex gap-x-8 gap-y-6 items-center flex-col  sm:flex-row md:flex-row lg:flex-row xl:flex-row">
            <li className="text-[15.5px] sm:text-base md:text-base  hover:text-[#6853E4] hover:underline lg:text-base xl:text-base font-medium text-[#171717] mb-0">
              <a href="#">Understanding Merchant Cash Advances</a>
            </li>
            <li className="text-[15.5px] sm:text-base md:text-base hover:text-[#6853E4] hover:underline  lg:text-base xl:text-base font-medium text-[#171717] mb-0">
              <a href="#">Business Growth Tips</a>
            </li>
            <li className="text-[15.5px] sm:text-base md:text-base hover:text-[#6853E4] hover:underline lg:text-base xl:text-base font-medium text-[#171717] mb-0">
              <a href="#">Financial Planning for Small Businesses</a>
            </li>
          </ul>
        </div>
        <div className="flex justify-between items-center gap-y-6 flex-wrap pt-[33px] md:pt-8 lg:pt-8 xl:pt-8 border-t border-[#EAECF0]">
          <p className="text-base font-normal text-[#303030A3] mb-0">
            © 2024 ProCash.ai. All rights reserve
          </p>
          <div className="flex gap-x-8 gap-y-6 flex-wrap">
            <p className="flex gap-x-2 text-base font-normal text-[#171717] mb-0">
              Proudly ️by american
              <img src={flag} alt="" />
            </p>
            <div>
              <ul className="flex gap-4">
                <li className="text-base font-normal text-[#303030A3] mb-0">
                  <a href="#">Terms</a>
                </li>
                <li className="text-base font-normal text-[#303030A3] mb-0">
                  <a href="#">Privacy</a>
                </li>
                <li className="text-base font-normal text-[#303030A3] mb-0">
                  <a href="#">Cookies</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
