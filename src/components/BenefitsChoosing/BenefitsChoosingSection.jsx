import bcImg from "../../assets/home/bcpro.svg";
import { benefitsChoosingData } from "../../utils/LandingPageData";

export const BenefitsChoosingSection = ({ benefits }) => {
  return (
    <section className="max-w-[1110px] mx-auto px-3" ref={benefits}>
      <div className="py-11 sm:py-11 md:py-20 lg:py-20 xl:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-11 md:gap-[125px] lg:gap-[125px] xl:gap-[125px] items-center py-8">
          <div>
            <h2 className="text-[31px] sm:text-[40px] md:text-[40px] lg:text-[40px] xl:text-[40px] font-semibold leading-[48px] text-[#171717] tracking-tight">
              Benefits of Choosing ProCash.ai
            </h2>
            <div className="mt-8 sm:mt-11 md:mt-11 lg:mt-11 xl:mt-11">
              {benefitsChoosingData?.map((bsc, ind) => (
                <div
                  key={ind}
                  className={`flex items-center gap-x-6 ${
                    ind === benefitsChoosingData.length - 1 ? "mb-0" : "mb-4"
                  }`}
                >
                  <div className=" bg-[#DEE2F6] min-w-16 h-16 rounded-full flex justify-center items-center">
                    <img src={bsc.img} alt={bsc.title} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-base text-[#171717]">
                      {bsc.title}
                    </h3>
                    <p className="font-normal text-base text-[#303030A3] mt-2">
                      {bsc.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img src={bcImg} alt="" className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
};
