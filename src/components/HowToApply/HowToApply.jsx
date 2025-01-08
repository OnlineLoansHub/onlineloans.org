import { useState } from "react";
import arrow from "../../assets/home/up_arrow.svg";
import { AccordinData } from "../../utils/LandingPageData";

export const HowToApply = ({ faq }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <section className="max-w-[1110px] mx-auto px-3" ref={faq}>
      <div className="py-11 sm:py-11 md:py-20 lg:py-20 xl:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-x-[30px]  gap-y-8">
          <div>
            <h2 className="text-[32px] sm:text-[40px] md:text-[40px] lg:text-[40px] xl:text-[40px] font-semibold leading-[48px] text-[#171717] tracking-tight">
              Have Questions? <br />
              We're Here to Help!
            </h2>
            <p className="mb-0 text-base font-normal text-[#303030A3] mt-5">
              Contact our friendly support team to learn more about how a
              working capital can benefit your business.
            </p>
            <div className="py-6 sm:py-8 md:py-8 lg:py-8 xl:py-8 ps-8 bg-[#F9F9F9] rounded-[20px] mt-8">
              <h3 className="font-semibold text-base text-[#171717]">
                Still have questions?
              </h3>
              <p className="font-normal text-base text-[#303030A3] mt-[10px]">
                If the question is not available on our FAQ
                <br /> section, Feel free to contact us personally.
              </p>
              <div className="mt-[30px]">
                <button
                  type="button"
                  className="border rounded-full bg-[#171717] border-[#171717] py-[10px] px-3  font-medium text-sm text-white hover:bg-slate-800 hover:text-[#fff] "
                  onClick={() =>
                    window.open("mailto:support@procash.ai", "_self")
                  }
                >
                  Ask a Question
                </button>
              </div>
            </div>
          </div>
          <div>
            {AccordinData?.map((acc, idx) => (
              <div
                key={idx}
                className={`${
                  openIndex === idx ? "bg-[#F9F9F9]" : "bg-white"
                } ${
                  openIndex === idx ? "" : "border border-[#efefef]"
                } mb-2 rounded-xl p-6`}
              >
                <div
                  className="flex items-center justify-between gap-3 cursor-pointer"
                  onClick={() => toggleAccordion(idx)}
                >
                  <p className="mb-0 font-medium text-base text-[#171717]   ">
                    {acc.title}
                  </p>
                  <div className="w-6 h-6  contents">
                    <img
                      src={arrow}
                      alt="arrow"
                      className={`transform transition-transform  ${
                        openIndex === idx ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
                {openIndex === idx && (
                  <div className="font-normal text-base text-[#303030A3] mt-8">
                    {acc.desc}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
