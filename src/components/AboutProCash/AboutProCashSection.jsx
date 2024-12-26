import { useLocation, useNavigate } from "react-router-dom";
import aboutPro from "../../assets/home/Background.png";
import rightArrow from "../../assets/home/rightArrow.svg";
export const AboutProCashSection = ({ aboutProcash, grownowRef }) => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  return (
    <section className="max-w-[1110px] mx-auto px-3" ref={aboutProcash}>
      <div className="pb-11 sm:pb-11 md:py-5 lg:py-5 xl:py-5">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 md:gap-[90px] lg:gap-[90px] xl:gap-[90px] items-center">
          <div>
            <img src={aboutPro} alt="" className="w-full h-full" />
          </div>
          <div>
            <h2 className="text-[32px] sm:text-[40px] md:text-[40px] lg:text-[40px] xl:text-[40px] font-semibold leading-[48px] text-[#171717] tracking-tight">
              About ProCash.ai
            </h2>
            <p className="mb-0 text-base font-normal text-[#303030A3] mt-4">
              With over 6 years of experience in business financing, ProCash.ai
              has been a trusted partner for thousands of businesses across USA.
              Our mission is to provide accessible, flexible, and transparent
              funding solutions that empower businesses to thrive.
            </p>

            <div className="flex gap-[60px] mt-5 sm:mt-5 md:mt-8 lg:mt-8 xl:mt-8">
              <div className="md:pt-4 lg:pt-4 xl:pt-4">
                <h3 className="font-semibold text-[20px] sm:text-[28px] md:text-[28px] lg:text-[28px] xl:text-[28px] leading-9 text-[#171717]">
                  6+ years
                </h3>
                <p className="font-normal text-sm text-[#303030A3]">
                  Our mission’s to drive grow & improve progress.
                </p>
              </div>
              <div className="md:pt-4 lg:pt-4 xl:pt-4">
                <h3 className="font-semibold text-[20px] sm:text-[28px] md:text-[28px] lg:text-[28px] xl:text-[28px] leading-9 text-[#171717]">
                  990+ clients
                </h3>
                <p className="font-normal text-sm text-[#303030A3]">
                  Our mission’s to drive grow & improve progress.
                </p>
              </div>
            </div>
            <div className="mt-5 sm:mt-5 md:mt-8 lg:mt-8 xl:mt-8 flex justify-center sm:justify-start md:justify-start lg:justify-start xl:justify-start">
              <button
                type="button"
                className="text-white  font-medium text-sm bg-[#5D74F1] py-[24px] px-[44px] rounded-[100px] w-full sm:w-auto md:w-auto lg:w-auto xl:w-auto hover:bg-blue-400 hover:text-[#000] flex gap-2 items-center justify-center"
                onClick={() => {
                  if (pathname === "/form") {
                    grownowRef?.current?.scrollIntoView({
                      behavior: "smooth",
                    });
                  } else {
                    navigate("/registration-form");
                  }
                }}
              >
                Apply now <img src={rightArrow} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
