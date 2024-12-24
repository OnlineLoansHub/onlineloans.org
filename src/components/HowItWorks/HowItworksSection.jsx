import { useNavigate } from "react-router-dom";
import rightArrow from "../../assets/home/rightArrow.svg";
import { howitWorksData } from "../../utils/LandingPageData";
export const HowItworksSection = ({ howItWorks }) => {
  const navigate = useNavigate();
  return (
    <section className="max-w-[1110px] mx-auto px-3" ref={howItWorks}>
      <div className="pt-20 sm:pt-20 pb-11 sm:pb-11 md:py-20 lg:py-20 xl:py-20">
        <h3 className="text-start sm:text-center md:text-center lg:text-center xl:text-center text-[32px] sm:text-[40px] md:text-[40px] lg:text-[40px] xl:text-[40px] font-semibold leading-[48px] text-[#171717] tracking-tight">
          How It Works
        </h3>
        <div className="mt-8 sm:mt-16 md:mt-16 lg:mt-16 xl:mt-16">
          {howitWorksData?.map((work, ind) => (
            <div
              key={ind}
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 items-center  xl:grid-cols-2 gap-y-5 md:gap-x-24 lg:gap-x-24 xl:gap-x-24 md:mx-[95px] lg:mx-[95px] xl:mx-[95px] ${
                ind === howitWorksData.length - 1 ? "mb-0" : "mb-12"
              }`}
            >
              <div
                className={`${
                  ind % 2 === 1
                    ? "sm:order-last md:order-last lg:order-last xl:order-last"
                    : ""
                }`}
              >
                <p className="w-16 h-16 rounded-full bg-[#DEE2F6] flex items-center justify-center text-lg text-[#5D74F1] font-semibold">
                  {work.count}
                </p>
                <h3 className="font-semibold text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl text-[#101828] mb-4 mt-4 sm:mb-4 sm:mt-6 md:mb-4  lg:mb-4 xl:mb-4 md:mt-6 lg:mt-6 xl:mt-6">
                  {work.title}
                </h3>
                <p className="text-lg font-normal text-[#303030A3]">
                  {work.desc}
                </p>
                {work.applynow && (
                  <div className="mt-8 flex justify-start sm:justify-start md:justify-start lg:justify-start xl:justify-start">
                    <button
                      type="button"
                      className="text-white  font-medium text-sm bg-[#5D74F1] py-[24px] px-[44px] rounded-[100px] w-auto hover:bg-blue-400 hover:text-[#000] flex gap-2"
                      onClick={() => navigate("/registration-form")}
                    >
                      {work.applynow} <img src={rightArrow} alt="" />
                    </button>
                  </div>
                )}
              </div>
              <div>
                <img
                  src={work.img}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
