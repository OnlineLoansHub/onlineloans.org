import star from "../../assets/home/staryellow.svg";
import leftsideIcon from "../../assets/home/leftside.svg";
import rightsideIcon from "../../assets/home/rightside.svg";
import belowTextLine from "../../assets/home/Vector.svg";
import { successStoriesData } from "../../utils/LandingPageData";

export const SuccessStoriesSection = () => {
  return (
    <section className="bg-[#F9F9F9] max-w-[1376px] mx-auto rounded-3xl">
      <div className="max-w-[1110px] mx-auto px-3">
        <div className="py-11 sm:py-11 md:py-20 lg:py-20 xl:py-20">
          <h3 className=" text-center text-[40px] font-semibold leading-[48px] text-[#171717] tracking-tight ">
            <span className="relative inline-block ">
              Success Stories
              <img
                src={belowTextLine}
                alt="underline"
                className="absolute -bottom-2 left-0 w-full h-auto"
              />
            </span>
          </h3>

          <div className="glide-02 relative w-full ">
            <div className="overflow-hidden" data-glide-el="track">
              <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex  overflow-hidden  mt-16 ">
                {successStoriesData?.map((success, idx) => (
                  <li key={idx}>
                    <div
                      key={idx}
                      className=" p-6 border border-[#EFEFEF] rounded-[30px]  flex flex-col justify-between max-w-[730px] m-auto bg-[#FFFFFF]"
                    >
                      <p className="text-sm font-normal text-[#303030A3]">
                        {success.opening_date}
                      </p>
                      <p className="mb-0 font-normal text-xl text-[#323B47] mt-5">
                        {success.desc}
                      </p>
                      <div className="flex justify-between items-center mt-[30px]">
                        <div className="flex gap-[10px] items-center ">
                          <div>
                            <img
                              src={success.user_img}
                              alt={success.user_name}
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-lg text-[#323B47]">
                              {success.user_name}
                            </p>
                            <p className="font-normal text-sm text-[#303030A3]">
                              {success.owner}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="flex gap-1">
                            {success.rating?.toFixed(1)}
                            <img src={star} alt="" />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="-z-10 pt-4 hidden sm:block md:block lg:block xl:block sm:w-auto md:w-auto lg:w-auto xl:w-auto max-w-[560px] rounded-b-3xl mx-auto bg-white "></div>
                    <div className="-z-20 pt-4 hidden sm:block md:block lg:block xl:block sm:w-auto md:w-auto lg:w-auto xl:w-auto max-w-[506px] rounded-b-3xl mx-auto bg-[#11111108] "></div>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="absolute left-0 top-1/2 flex h-0 w-full items-center justify-between px-4 "
              data-glide-el="controls"
            >
              <div
                className="hidden sm:hidden absolute left-[78px] w-[52px] h-[52px] bg-white md:hidden justify-center items-center lg:flex xl:flex rounded-full cursor-pointer z-20"
                data-glide-dir="<"
                aria-label="prev slide"
              >
                <img src={leftsideIcon} alt="left" />
              </div>
              <div
                className="hidden sm:hidden absolute right-[78px] w-[52px] h-[52px] bg-white md:hidden justify-center items-center lg:flex xl:flex rounded-full cursor-pointer z-20"
                data-glide-dir=">"
                aria-label="next slide"
              >
                <img src={rightsideIcon} alt="right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
