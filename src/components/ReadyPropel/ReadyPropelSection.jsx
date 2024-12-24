import rightArrow from "../../assets/home/rightArrow.svg";
import readyPropelImg from "../../assets/home/ready.png";
import { useNavigate } from "react-router-dom";
export const ReadyPropelSection = () => {
  const navigate = useNavigate();
  return (
    <section className="max-w-[1110px] mx-auto px-3">
      <div className="md:py-20 lg:py-20 xl:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 md:gap-[125px] lg:gap-[125px] xl:gap-[125px] items-center">
          <div>
            <img src={readyPropelImg} alt="" className="w-full h-full" />
          </div>
          <div className="text-center sm:text-start md:text-start lg:text-start xl:text-start">
            <h2 className=" text-[40px] font-semibold leading-[48px] text-[#171717] tracking-tight">
              Ready to Propel Your Business Forward?
            </h2>
            <p className="mb-0 text-base font-normal text-[#303030A3] mt-4">
              Take the next step in your business journey with a Merchant Cash
              Advance from ProCash.ai. Our team is here to provide the funding
              you need with terms that work for you.
            </p>
            <div className="mt-6 flex justify-center sm:justify-start md:justify-start lg:justify-start xl:justify-start">
              <button
                type="button"
                className="text-white  font-medium text-sm bg-[#5D74F1] py-[24px] px-[44px] rounded-[100px] w-full sm:w-auto md:w-auto lg:w-auto xl:w-auto hover:bg-blue-400 hover:text-[#000] flex gap-2 items-center justify-center"
                onClick={() => navigate("/registration-form")}
              >
                Create account <img src={rightArrow} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
