import StepForm from "../components/StepForm/StepForm";
// import pIcon from "../assets/headerProfile_Icon.png";
import logo from "../assets/home/ProCash.svg";
import { useNavigate } from "react-router-dom";
const FormHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-[1110px] mx-auto px-5">
      <header className="w-full flex justify-between items-center py-4 ">
        <div
          className="font-semibold text-[28.28px] text-black cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Logo" />
        </div>

        <div className="flex items-center justify-center gap-6">
          {/* <select
            className="font-semibold bg-transparent text-sm text-[#12151A] leading-[15.68px] tracking-[-2.5%]"
            defaultValue="EN"
          >
            <option value="EN">EN</option>
            <option value="ES">ES</option>
            <option value="FR">FR</option>
          </select> */}

          <select
            className="font-semibold bg-transparent text-sm  text-[#12151A] leading-[15.68px] tracking-[-2.5%]  "
            defaultValue="EN"
          >
            {["EN", "FR", "RU"].map((lang) => (
              <option value={lang} key={lang}>
                {lang}
              </option>
            ))}
          </select>

          {/* <div className="w-10 h-10 rounded-full">
            <img
              src={pIcon}
              alt="Profile Icon"
              className="w-full h-full rounded-full"
            />
          </div> */}
        </div>
      </header>
    </div>
  );
};
const Procash = () => {
  return (
    <div className="bg-[#f7f8fa]  w-full">
      <div className="border-b border-[#efefef]">
        <FormHeader />
      </div>
      <div className="max-w-[1110px] mx-auto px-5 ">
        <StepForm />
      </div>
    </div>
  );
};

export default Procash;
