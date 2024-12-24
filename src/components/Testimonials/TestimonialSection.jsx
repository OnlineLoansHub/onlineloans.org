import { testimonialData } from "../../utils/LandingPageData";

export const TestimonialSection = () => {
  return (
    <section className="max-w-[1110px] mx-auto px-3">
      <div className="py-11 sm:py-11 md:py-20 lg:py-20 xl:py-20">
        <h3 className=" text-center text-[40px] font-semibold leading-[48px] text-[#171717] tracking-tight">
          Testimonials
        </h3>
        <div className="glide-01 relative w-full">
          <div className="overflow-hidden" data-glide-el="track">
            <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full   mt-16">
              {testimonialData?.map((test, idx) => (
                <li key={idx}>
                  <div
                    key={idx}
                    className="shadow-xs bg-[#fff] p-6 border-2 border-[#EFEFEF] rounded-[30px]  h-full flex flex-col justify-between"
                  >
                    <p className="mb-0 font-normal text-xl text-[#323B47] ">
                      {test.desc}
                    </p>
                    <div className="flex gap-[10px] mt-10 items-center ">
                      <div>
                        <img src={test.user_img} alt={test.user_name} />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-[#171717]">
                          {test.user_name}
                        </p>
                        <p className="font-normal text-sm text-[#303030A3]">
                          {test.user_from}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="flex w-full items-center justify-center gap-2 mt-5"
            data-glide-el="controls[nav]"
          >
            {testimonialData?.map((_, idx) => (
              <button
                key={idx}
                className="group p-4"
                data-glide-dir={`=${idx}`}
                aria-label={`goto slide ${idx + 1}`}
              >
                <span className="block h-2.5 w-2.5 rounded-full bg-white/20 ring-1 ring-slate-700 transition-colors duration-300 focus:outline-none"></span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
