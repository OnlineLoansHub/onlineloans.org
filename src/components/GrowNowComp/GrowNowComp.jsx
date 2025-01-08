import GnImg from "../../assets/home/grownow.png";
import belowTextLine from "../../assets/home/grownowLine.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
// import ratingImg from "../../assets/home/ratingImg.png";
import startCrossIcon from "../../assets/Closebutton.svg";
import endCrossIcon from "../../assets/Close.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;
export const GrowNowComp = ({ grownowRef }) => {
  const [getRespErr, setGetRespErr] = useState("");
  const [existId, setExistId] = useState("");
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    business_name: Yup.string()
      .required("Business name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must not exceed 15 digits")
      .required("Phone number is required"),
    policy: Yup.boolean().oneOf([true], "please select terms and policy"),
  });

  useEffect(() => {
    if (getRespErr) {
      const timer = setTimeout(() => {
        setGetRespErr("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [getRespErr]);
  function getExistingId(errorString) {
    // Use a regular expression to match the ID in the string
    const match = errorString.match(/Existing ID: (\d+)/);
    return match ? match[1] : null; // Return the ID if found, otherwise null
  }
  return (
    <>
      <section className="max-w-[1110px] mx-auto px-3" ref={grownowRef}>
        <div className="pt-8  md:pt-20 lg:pt-20 xl:pt-20">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  md:gap-x-8 lg:gap-x-8 xl:gap-x-8 items-center ">
            <div>
              <h2 className="text-[27px] sm:text-[52.8px] md:text-[52.8px] lg:text-[52.8px] xl:text-[52.8px] font-normal leading-[29.7px] sm:leading-[58px] md:leading-[58px] lg:leading-[58px] xl:leading-[58px] text-[#000] ">
                <span className="relative inline-block font-medium leading-5 sm:leading-none">
                  Grow now
                  <img
                    src={belowTextLine}
                    alt="underline"
                    className="absolute -bottom-2 left-0 w-full h-auto"
                  />
                </span>{" "}
                based on your future revenue
              </h2>
              <div>
                <p className="font-normal text-base sm:text-[20.8px] md:text-[20.8px] lg:text-[20.8px] xl:text-[20.8px] sm:leading-[31.2px] md:leading-[31.2px] lg:leading-[31.2px] xl:leading-[31.2px] text-[#4A4A4A] pt-[25px] pb-[14.4px] sm:py-[25px] md:py-[25px] lg:py-[25px] xl:py-[25px]">
                  Receive up to <span className="font-bold">$200K</span> in
                  flexible financing, tailored for growing businesses. 
                </p>
                <p className="font-normal text-base sm:text-[20.8px] md:text-[20.8px] lg:text-[20.8px] xl:text-[20.8px] sm:leading-[31.2px] md:leading-[31.2px] lg:leading-[31.2px] xl:leading-[31.2px] text-[#4A4A4A]">
                  Return a portion of your daily income.
                </p>
              </div>
              {getRespErr && (
                <div className="border border-[#F4B0A1] rounded-xl bg-[#FFF5F3] flex justify-between items-center py-3 px-5 mt-[14.4px] sm:mt-[25px] md:mt-[25px] lg:mt-[25px] xl:mt-[25px]">
                  <div className="flex items-center gap-4">
                    <div
                      className="min-w-6 min-h-6 flex justify-center items-center rounded-md"
                      style={{
                        background:
                          "linear-gradient(180deg, #E88B76 0%, #CA5048 100%)",
                      }}
                    >
                      <img src={endCrossIcon} alt="" />
                    </div>
                    <p className="text-[13px] text-[#101828] font-medium">
                      {getRespErr}
                    </p>
                  </div>
                  <div
                    onClick={() => setGetRespErr("")}
                    className="cursor-pointer min-w-6 min-h-6 flex justify-center items-center"
                  >
                    <img src={startCrossIcon} alt="" />
                  </div>
                </div>
              )}
              <div className="pt-[14.4px] pb-2 sm:py-[25px] md:py-[25px] lg:py-[25px] xl:py-[25px]">
                <Formik
                  initialValues={{
                    email: "",
                    phone: "",
                    business_name: "",
                    policy: false,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={async (values, { resetForm }) => {
                    let existingId;
                    let formData;
                    try {
                       formData = {
                        email: values.email,
                        business_name: values.business_name,
                        phone: values.phone,
                        agreedToTerms: values.policy,
                      };
                      const response = await axios.post(
                        `${apiUrl}/api/user`,
                        formData,
                        {
                          headers: {
                            "Content-Type": "application/json",
                          },
                        }
                      );
                      // Handle response data
                      if (response.data.success) {
                        navigate("/thankyou");
                        // setIsModalOpen(true);
                        resetForm();
                      }
                    }catch (error) {
                      existingId =  getExistingId(error?.response?.data?.message);
                      setExistId(existingId);
                     console.log("Existing ID:",existingId); // Output: 87501643895

                     if(existingId){
                       try {
                         formData.step = "1";
                         formData.type = "new";
                         // Sending data to the API
                         const response = await axios.post(
                           `${apiUrl}/api/update_business/${existingId}`,
                           formData,
                           {
                             headers: {
                               "Content-Type": "application/json",
                             },
                           }
                         );
                 
                         // Handle response data
                         if (response.data.success) {
                           console.log(
                             "Business updated successfully:",
                             response.data.data
                           );
                           resetForm();
                       
                         } else {
                           // console.error("Error:", response.data.message);
                           console.log(response,'response')
                           
                           // Handle validation error response from API
                           setGetRespErr(response.data.message); // Show error message
                         }
                       }catch(error){
                         console.log(error,'error_____')
                       }
                     }
                     // console.error("Error:", error?.response?.data?.message);
                     // Handle unexpected errors (e.g., server issues)
                     
                   //   if(error?.response?.data?.message?.code){
                   //     return setGetRespErr(error?.response?.data?.code);
                   //   }
                   //   setGetRespErr(error?.response?.data?.message);
                   }
                  }}
                  validateOnChange={true}
                  validateOnBlur={true}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div>
                        <div className="mb-2">
                          <div className="mt-[10px]">
                            <Field
                              type="email"
                              name="email"
                              className="bg-white border border-[#30303033] w-full px-3 py-[10px] rounded-xl"
                              placeholder="Your Business Email"
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="text-xs text-red-600"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-x-[5px] mb-[6px] sm:mb-[25px] md:mb-[25px] lg:mb-[25px] xl:mb-[25px]">
                          <div>
                            <div className="mt-[7px] sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0">
                              <Field
                                type="text"
                                name="business_name"
                                className="bg-white border border-[#30303033] w-full px-3 py-[10px] rounded-xl"
                                placeholder="Your business name"
                              />
                              <ErrorMessage
                                name="business_name"
                                component="div"
                                className="text-xs text-red-600"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="mt-[12px] sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0">
                              <Field
                                type="text"
                                name="phone"
                                className="bg-white border border-[#30303033] w-full px-3 py-[10px] rounded-xl"
                                placeholder="Your phone number"
                              />
                              <ErrorMessage
                                name="phone"
                                component="div"
                                className="text-xs text-red-600"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mb-[25px]">
                          <div role="group" aria-labelledby="checkbox-group">
                            <label className="text-[#999999] font-normal text-[14px] leading-[14px] ">
                              <Field
                                type="checkbox"
                                name="policy"
                                className=" mr-1 accent-[#A394FF]"
                              />
                              I agree to{" "}
                              <span className="text-[#A394FF]">
                                {" "}
                                <a
                                  href="/terms.pdf"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {" "}
                                  terms
                                </a>
                              </span>{" "}
                              and{" "}
                              <span className="text-[#A394FF]">
                                <a
                                  href="/policy.pdf"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  privacy policy
                                </a>
                              </span>
                            </label>
                            <ErrorMessage
                              name="policy"
                              component="div"
                              className="text-xs text-red-600"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className=" flex gap-3 w-full ">
                          <button
                            type="submit"
                            className="text-white font-medium text-sm bg-[#6853E4] py-[14px] px-[26px] rounded-[18px] w-full hover:bg-blue-400 hover:text-[#000]"
                            disabled={isSubmitting}
                          >
                            Get Started
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
              <div>
                <p className="text-[13px] font-normal leading-[19.2px] text-[#4A4A4A]">
                  Qualifying businesses receive up to $200K in 24 hours.
                </p>
                {/* <div className="max-w-[100px] mt-[18px] sm:mt-[25px] md:mt-[25px] lg:mt-[25px] xl:mt-[25px]">
                  <img src={ratingImg} alt="rating" className="w-full h-full" />
                </div> */}
              </div>
            </div>
            <div>
              <img src={GnImg} alt="" className="w-full h-full" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
