import successIcon from "../../assets/Featuredicon.svg";
const SuccessModal = ({ onClose }) => {
  return (
    <div
      className="relative z-[1000]"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500/90 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen mx-auto ">
        <div className="flex min-h-full items-center justify-center mx-3 ">
          <div className="relative transform  rounded-lg bg-white shadow-xl sm:w-full sm:max-w-md  md:max-w-md lg:max-w-md xl:max-w-md px-6 pt-8 pb-6 ">
            <div className="bg-white">
              <div className="">
                <div className="flex items-center justify-center">
                  <img src={successIcon} alt="icon" />
                </div>
                <div className="text-center mt-6">
                  <h2
                    id="modal-title"
                    className="text-2xl font-semibold text-[#101828] mb-4"
                  >
                    Thank You!
                  </h2>
                  <div className="">
                    <p className="text-[13px] font-medium text-[#303030A3] text-center">
                      Your application has been received. Our team will review
                      your information and get back to you within 24 hours. In
                      the meantime, feel free to contact us at{" "}
                      <span
                        className="cursor-pointer hover:text-[#6853E4] hover:underline "
                        onClick={() =>
                          window.open("mailto:support@procash.ai", "_self")
                        }
                      >
                        support@procash.ai
                      </span>{" "}
                      if you have any questions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex  justify-center">
              <button
                type="button"
                onClick={onClose}
                className="text-white font-medium text-sm bg-[#5D74F1] py-[14px] px-[26px] rounded-[100px] w-auto hover:bg-blue-400 hover:text-[#000]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
