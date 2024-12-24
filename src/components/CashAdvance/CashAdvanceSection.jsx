import { useNavigate } from "react-router-dom";
import rightArrow from "../../assets/home/rightArrow.svg";
import { cashAdvanceData } from "../../utils/LandingPageData";

export const CashAdvanceSection = ({ whyus }) => {
  const navigate = useNavigate();
  return (
    <section className="max-w-[1110px] mx-auto px-3" ref={whyus}>
      <div className="pt-11 pb-8 sm:pt-[120px] sm:pb-[80px] md:pt-[120px] md:pb-[80px] lg:pt-[120px] lg:pb-[80px] xl:pt-[120px] xl:pb-[80px]">
        <div>
          <h2 className="text-start sm:text-center md:text-center lg:text-center xl:text-center text-[32px] sm:text-[40px] md:text-[40px] lg:text-[40px] xl:text-[40px] font-semibold leading-[48px] text-[#171717] tracking-tight">
            Why Choose a Merchant Cash Advance?
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-8 sm:mt-16 md:mt-16 lg:mt-16 xl:mt-16">
          {cashAdvanceData?.map((cash, idx) => (
            <div
              key={idx}
              className="bg-[#F5F5F5] p-4 rounded-xl flex flex-col items-center"
            >
              {cash.img && (
                <div className="mb-6 bg-[#DEE2F6] w-16 h-16 rounded-full flex justify-center">
                  <img src={cash.img} alt={cash.title} />
                </div>
              )}
              <h3 className="font-semibold text-base text-[#171717]">
                {cash.title}
              </h3>
              <p className="font-normal text-sm sm:text-base md:text-base lg:text-base xl:text-base text-[#303030A3] text-center mt-2">
                {cash.desc}
              </p>
            </div>
          ))}
          <div className="bg-[#F5F5F5] p-4 rounded-xl flex flex-col items-center justify-center">
            <h3 className="font-semibold text-base text-[#171717] mb-6">
              Wanna learn more?
            </h3>
            <button
              type="button"
              className="text-white font-medium text-sm bg-[#5D74F1] py-[16px] px-[32px] rounded-[100px] w-auto hover:bg-blue-400 hover:text-[#000] flex gap-2"
              onClick={() => navigate("/registration-form")}
            >
              Apply now <img src={rightArrow} alt="" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
