import React, { useEffect, useRef, useState } from "react";
import { Steps } from "../../utils/FormData";
import { Formik, Form, Field, ErrorMessage } from "formik";
import upload_Icon from "../../assets/upload_icon.svg";
// import SuccessModal from "../Modal/SuccessModal";
import mailIcon from "../../assets/mailIcon.svg";
import pinIcon from "../../assets/pin.svg";
import phonIcon from "../../assets/phone.svg";
import startCrossIcon from "../../assets/Closebutton.svg";
import endCrossIcon from "../../assets/Close.svg";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

// Step 1 Validation Schema
const step1ValidationSchema = Yup.object({
  full_name: Yup.string()
    .min(2, "Full Name must be at least 2 characters")
    .max(50, "Full Name must not exceed 50 characters")
    .required("Full Name is required"),
  business_name: Yup.string()
    .min(2, "Business Name must be at least 2 characters")
    .max(100, "Business Name must not exceed 100 characters")
    .required("Business Name is required"),
  business_address: Yup.string()
    .min(5, "Business Address must be at least 5 characters")
    .max(200, "Business Address must not exceed 200 characters")
    .required("Business Address is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .required("Phone number is required"),
});

// Step 2 Validation Schema
const step2ValidationSchema = Yup.object({
  business_type: Yup.string().required("Business Type is required"),
  business_date: Yup.string().required("Business Date is required"),
  monthly_revenue: Yup.string().required("Monthly Revenue is required"),
  avg_monthly_credit: Yup.number()
    .typeError("Average Monthly Credit must be a number") // Ensures the value is a valid number
    .positive("Average Monthly Credit must be a positive number") // Must be positive
    .test(
      "min-max-digits",
      "Average Monthly Credit must be between 1 and 6 digits",
      (value) =>
        value && value.toString().length >= 1 && value.toString().length <= 6
    )
    .required("Average Monthly Credit is required"),
  current_funding: Yup.string().required("Current Funding is required"),
  consent_credit_check: Yup.boolean().oneOf(
    [true],
    "Consent to credit check is required"
  ),
  terms_conditions: Yup.boolean().oneOf(
    [true],
    "You must agree to the terms and conditions"
  ),
});
const FILE_SIZE = 2 * 1024 * 1024; // 2MB
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/gif"];
// Step 3 Validation Schema
const step3ValidationSchema = Yup.object({
  avg_monthly_sales_1: Yup.number().required("Required"),
  avg_monthly_sales_2: Yup.number().required("Required"),
  existing_loans: Yup.string().required("Existing Loans is required"),
  existing_financing_amount: Yup.number().when("existing_loans", {
    is: (value) => value === "yes",
    then: (schema) => schema.required("Required if existing loans are yes"),
    otherwise: (schema) => schema,
  }),
  monthly_payment: Yup.number().when("existing_loans", {
    is: (value) => value === "yes",
    then: (schema) => schema.required("Required if existing loans are yes"),
    otherwise: (schema) => schema,
  }),
  average_monthly_card: Yup.mixed().when("existing_loans", {
    is: (value) => value === "yes",
    then: (schema) =>
      schema
        .required("Upload Supporting Documents is required")
        .test(
          "fileSize",
          "File size is too large (max 2MB)",
          (value) => !value || (value && value.size <= FILE_SIZE)
        )
        .test(
          "fileType",
          "Unsupported file format",
          (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
        ),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const StepForm = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [getRespErr, setGetRespErr] = useState("");
  const [existId, setExistId] = useState("");
  const formRef = useRef();
  const navigate = useNavigate();
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (currentStep === 2 || currentStep === 3) {
      const gtagScript = document.createElement("script");
      gtagScript.src =
        "https://www.googletagmanager.com/gtag/js?id=AW-11530121883";
      gtagScript.async = true;

      document.head.appendChild(gtagScript);

      const inlineScript = document.createElement("script");
      inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-11530121883');
      `;
      document.head.appendChild(inlineScript);

      const conversionScript = document.createElement("script");
      conversionScript.innerHTML = `
        gtag('event', 'conversion', {
          'send_to': 'AW-11530121883/MJVVCJbepf4ZEJvl_vkq',
          'value': 1.0,
          'currency': 'USD'
        });
      `;
      document.head.appendChild(conversionScript);
      const existingGTM = document.querySelector(
        `script[src="https://www.googletagmanager.com/gtag/js?id=AW-11530121883"]`
      );
      if (existingGTM) {
        existingGTM.remove();
      }

      const inlineGTM = Array.from(
        document.head.getElementsByTagName("script")
      ).find((script) => script.innerHTML.includes("gtag('js'"));
      if (inlineGTM) {
        inlineGTM.remove();
      }

      const fbPixelScript = document.createElement("script");
      fbPixelScript.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '592433636853293'); 
        fbq('track', 'PageView'); 
        fbq('track', 'CompleteRegistration'); // Custom Event: Registration
      `;
      document.head.appendChild(fbPixelScript);

      const fbNoScript = document.createElement("noscript");
      fbNoScript.innerHTML = `
        <img height="1" width="1" style="display:none" 
        src="https://www.facebook.com/tr?id=592433636853293&ev=PageView&noscript=1"/>
      `;
      document.head.appendChild(fbNoScript);
      return () => {
        if (gtagScript.parentNode) {
          document.head.removeChild(gtagScript);
        }
        if (inlineScript.parentNode) {
          document.head.removeChild(inlineScript);
        }
        if (conversionScript.parentNode) {
          document.head.removeChild(conversionScript);
        }
        if (fbPixelScript.parentNode) {
          document.head.removeChild(fbPixelScript);
        }
        if (fbNoScript.parentNode) {
          document.head.removeChild(fbNoScript);
        }
      };
    }
  }, [currentStep]);

  useEffect(() => {
    if (getRespErr) {
      const timer = setTimeout(() => {
        setGetRespErr("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [getRespErr]);

  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   navigate("/");
  // };

  const handleImage = () => {
    console.log(inputRef, "test out");
    if (inputRef.current) {
      inputRef?.current.click();
    }
  };

  function getExistingId(errorString) {
    // Use a regular expression to match the ID in the string
    const match = errorString.match(/Existing ID: (\d+)/);
    return match ? match[1] : null; // Return the ID if found, otherwise null
  }

  const handleNext = async (e, validateForm, setTouched, values) => {
    e.preventDefault();
    // Perform validation for the current step
    const errors = await validateForm(values);

    // Log individual field errors for debugging
    Object.keys(errors).forEach((field) => {
      console.log(`Error in ${field}: ${errors[field]}`);
    });

    // If there are errors, mark the fields as touched
    if (Object.keys(errors).length > 0) {
      setTouched({
        ...Object.keys(values).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {}),
      });
      return; // prevent moving to the next step
    }
      let existingId;
    if(currentStep===1){
      let obj = {
        full_name:values?.full_name,
        email:values?.email,
        phone:values?.phone,
        business_name:values?.business_name,
        business_address:values?.business_address,
        step:1
      }

      try {
        console.log(obj, "obj 1 is hereww");
        // Sending data to the API
        const response = await axios.post(
          `${apiUrl}/business`,
          obj,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Handle response data
        if (response.data.success) {
          console.log(
            "Business created successfully:",
            response.data.data
          );
          console.log(response.data?.data?.hubspotContact?.vid,'response.data?.data?.hubspotContact?.vid')
          setExistId(response.data?.data?.hubspotContact?.vid);
      
        } else {
          // console.error("Error:", response.data.message);
          console.log(response,'response')
          
          // Handle validation error response from API
          setGetRespErr(response.data.message); // Show error message
        }
      } catch (error) {
         existingId =  getExistingId(error?.response?.data?.message);
         setExistId(existingId);
        console.log("Existing ID:", existId); // Output: 87501643895
        if(existId){
          try {
            console.log(obj, "obj 1 is hereww");
            // Sending data to the API
            const response = await axios.post(
              `${apiUrl}/update_business/${existId}`,
              obj,
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

    }
    if(currentStep===2){
          let obj = {
            business_type:values?.business_type,
            business_date:values?.business_date,
            monthly_revenue:values?.monthly_revenue,
            average_monthly_credit_debit:values?.avg_monthly_credit,
            // avg_monthly_card:values?.avg_monthly_card,
            current_funding:values?.current_funding,
            consent_credit_check:values?.consent_credit_check,
            terms_conditions:values?.terms_conditions,
            step:2
          }

      try {
        console.log(existId, "obj 1 is herewwexistId");
        // Sending data to the API
        if(existId){
            console.log(obj, "obj 1 is hereww");
            // Sending data to the API
            const response = await axios.post(
              `${apiUrl}/update_business/${existId}`,
              obj,
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
          
            } else {
              // console.error("Error:", response.data.message);
              console.log(response,'response')
              
              // Handle validation error response from API
              setGetRespErr(response.data.message); // Show error message
            }
        }
      } catch (error) {
      
        // console.error("Error:", error?.response?.data?.message);
        // Handle unexpected errors (e.g., server issues)
        
        if(error?.response?.data?.message?.code){
          return setGetRespErr(error?.response?.data?.code);
        }
        setGetRespErr(error?.response?.data?.message);
      }

    }

    // if(currentStep===3){
    //   const response = await axios.post(
    //     `${apiUrl}/api/send_mail`,
    //     values,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   // Handle response data
    //   if (response.data.success) {
    //     console.log(
    //       "Business updated successfully:",
    //       response.data.data
    //     );
    
    //   }
    // }
    
    // If validation passes, move to the next step
    setCurrentStep((prevStep) => prevStep + 1);
    formRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      formRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* step form */}
      <div className="py-[43px]">
        <p className="font-normal text-sm text-[#667085]">
          Home /{" "}
          <span className="font-normal text-[#66708573]">Application Form</span>
        </p>
        <h2 className="font-semibold text-3xl text-[#101828] mt-3 mb-8">
          Welcome to ProCash.ai!
        </h2>
        {getRespErr && (
          <div className="border border-[#F4B0A1] rounded-xl bg-[#FFF5F3] flex justify-between items-center py-3 px-5 mb-6">
            <div className="flex items-center gap-4">
              <div
                className="w-6 h-6 flex justify-center items-center rounded-md"
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
            <div onClick={() => setGetRespErr("")} className="cursor-pointer">
              <img src={startCrossIcon} alt="" />
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12  sm:gap-[30px] md:gap-[30px] lg:gap-[30px] xl:gap-[30px]">
          <div className="bg-white col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-5 xl:col-span-5 rounded-t-2xl border-b  sm:rounded-2xl md:rounded-2xl lg:rounded-2xl xl:rounded-2xl border border-[#EFEFEF] p-6 h-full flex flex-col justify-between">
            <div>
              {Steps?.map((step, index) => (
                <div
                  key={index}
                  className={`flex gap-4 mb-0 sm:mb-6 md:mb-6 lg:mb-6 xl:mb-6 items-center ${
                    currentStep === step.count ? "" : "hidden"
                  } sm:flex md:flex lg:flex xl:flex`}
                >
                  <h4
                    className={`text-[14px] sm:text-xl md:text-xl lg:text-xl xl:text-xl font-bold rounded-full min-w-[40px] sm:w-[48px] md:w-[48px] lg:w-[48px]  xl:w-[48px] min-h-[40px]  sm:h-[48px] md:h-[48px] lg:h-[48px] xl:h-[48px]  flex items-center justify-center ${
                      currentStep === step.count
                        ? "border border-[#201564] bg-[#6853E4]   text-white "
                        : "border border-[#98A2B3] bg-white text-[#98A2B3]"
                    } border-[#201564]`}
                    style={{
                      boxShadow:
                        currentStep === step.count
                          ? "-1px 1px 4px 0px #FFFFFF73 inset, 1px 1px 4px 0px #FFFFFF73  inset, 0px -2px 1px 0px #00000040 inset"
                          : "",
                    }}
                  >
                    {step.count}
                  </h4>
                  <div>
                    <h6
                      className={`text-base  text-[#101928] ${
                        currentStep === step.count
                          ? "font-semibold"
                          : "font-normal"
                      }`}
                    >
                      {step.title}
                    </h6>
                    <p className="mb-0 text-xs font-normal text-[#475367]">
                      {step.subTitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden sm:hidden md:block lg:block xl:block">
              <h4 className="text-[#171717] font-semibold text-base">
                Need Help?
              </h4>
              <p className="font-normal text-base text-[#303030A3] mt-[10px]">
                Get to know how your campaign can reach a wider audience.
              </p>
              <button
                className="border rounded-full border-[#30303033] shadow-[0px -0.5px 0px 0px #16191D1F inset] px-3 py-[10px] font-medium text-sm text-[#171717] hover:bg-[#5D74F1] hover:text-[#fff] mt-[30px]"
                onClick={() =>
                  window.open("mailto:support@procash.ai", "_self")
                }
              >
                Contact Us
              </button>
            </div>
          </div>
          <div className=" col-span-12 sm:col-span-12 md:col-span-7 lg:col-span-7 xl:col-span-7 bg-white rounded-b-2xl sm:rounded-2xl md:rounded-2xl lg:rounded-2xl xl:rounded-2xl border border-[#fff] p-6 h-full md:max-h-[646px] lg:max-h-[646px] xl:max-h-[646px] overflow-auto ">
            <div ref={formRef}>
              <h1 className="font-semibold text-base sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl text-[#101828] mb-8">
                {Steps[currentStep - 1]?.title}
              </h1>
              <Formik
                initialValues={{
                  full_name: "",
                  business_name: "",
                  business_address: "",
                  email: "",
                  phone: "",
                  business_type: "",
                  business_date: "",
                  monthly_revenue: "",
                  avg_monthly_credit: "",
                  current_funding: "",
                  consent_credit_check: false,
                  terms_conditions: false,
                  avg_monthly_sales_1: "",
                  avg_monthly_sales_2: "",
                  other_monthly_sources: "",
                  existing_loans: "no",
                  existing_financing_amount: "",
                  monthly_payment: "",
                  bank_acc_inf: "",
                  average_monthly_card: "",
                }}
                validationSchema={
                  currentStep === 1
                    ? step1ValidationSchema
                    : currentStep === 2
                    ? step2ValidationSchema
                    : step3ValidationSchema
                  // : currentStep === 3
                  // ? s
                  // : step4ValidationSchema
                }
                onSubmit={async (values, { resetForm }) => {
                  try {
                    const formData = new FormData();
                    // Append form data (fields)
                    Object.keys(values).forEach((key) => {
                      formData.append(key, values[key]);
                    });
                    // Sending data to the API
                    const response = await axios.post(
                      `${apiUrl}/mail_send`,
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                      }
                    );

                    // Handle response data
                    if (response.data.success) {
                      navigate("/thankyou", {
                        state: { fromRegistration: "registration-form" },
                      });
                      // setIsModalOpen(true); // Open modal on success
                      resetForm();
                    } else {
                      console.error("Error:else", response.data.message);
                      // Handle validation error response from API
                      setGetRespErr(response.data.message); // Show error message
                    }
                  } catch (error) {
                    // console.error("Error:", error?.response?.data?.message);
                    // Handle unexpected errors (e.g., server issues)
                    if(error?.response?.data?.message?.code){
                      return setGetRespErr(error?.response?.data?.code);
                    }
                    setGetRespErr(error?.response?.data?.message);
                  }
                }}
                validateOnChange={true}
                validateOnBlur={true}
              >
                {({
                  values,
                  isValid,
                  validateForm,
                  setTouched,
                  isSubmitting,
                  setFieldValue,
                  errors,
                  touched,
                }) => (
                  <Form>
                    {/* steps-1 */}
                    {currentStep === 1 && (
                      <div>
                        <div className="mb-6">
                          <label className="font-medium text-[13px] text-[#101828] ">
                            Full Name
                          </label>
                          <div className="mt-[10px]">
                            <Field
                              type="text"
                              name="full_name"
                              className="bg-white border border-[#30303033] w-full px-3 py-[10px] rounded-lg"
                              placeholder="John Doe"
                            />
                            <ErrorMessage
                              name="full_name"
                              component="div"
                              className="text-red-600"
                            />
                          </div>
                        </div>
                        <div className="mb-6">
                          <label className="font-medium text-[13px] text-[#101828] ">
                            Business Name
                          </label>
                          <div className="mt-[10px]">
                            <Field
                              type="text"
                              name="business_name"
                              className="bg-white border border-[#30303033] w-full px-3 py-[10px] rounded-lg"
                              placeholder="John's Coffee Shop"
                            />
                            <ErrorMessage
                              name="business_name"
                              component="div"
                              className="text-red-600"
                            />
                          </div>
                        </div>
                        <div className="mb-6">
                          <label className="font-medium text-[13px] text-[#101828] ">
                            Business Address
                          </label>
                          <div className="mt-[10px]">
                            <div className="bg-white flex gap-x-2 border border-[#30303033] w-full px-3 py-[10px] rounded-lg">
                              <img src={pinIcon} alt="" />
                              <Field
                                type="text"
                                name="business_address"
                                placeholder="123 Main St, City, State, ZIP"
                                className="w-full"
                              />
                            </div>
                            <ErrorMessage
                              name="business_address"
                              component="div"
                              className="text-red-600"
                            />
                          </div>
                        </div>
                        <div className="mb-6">
                          <label className="font-medium text-[13px] text-[#101828] ">
                            Email Address
                          </label>
                          <div className="mt-[10px]">
                            <div className="bg-white flex gap-x-2 border border-[#30303033] w-full px-3 py-[10px] rounded-lg">
                              <img src={mailIcon} alt="" />
                              <Field
                                type="email"
                                name="email"
                                className="w-full"
                                placeholder="john@example.com"
                              />
                            </div>
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="text-red-600"
                            />
                          </div>
                        </div>
                        <div className="mb-8">
                          <label className="font-medium text-[13px] text-[#101828] ">
                            Phone Number
                          </label>
                          <div className="mt-[10px]">
                            <div className="bg-white flex gap-x-2 border border-[#30303033] w-full px-3 py-[10px] rounded-lg">
                              <img src={phonIcon} alt="" />
                              <Field
                                type="number"
                                name="phone"
                                className="  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full"
                                placeholder="(123) 456-7890"
                              />
                            </div>
                            <ErrorMessage
                              name="phone"
                              component="div"
                              className="text-red-600"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {/* step-2 */}
                    {currentStep === 2 && (
                      <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 mb-6">
                          <div>
                            <label className="font-medium text-[13px] text-[#101828] ">
                              Business Type / Industry
                            </label>
                            <div className="mt-[10px]">
                              <Field
                                name="business_type"
                                as="select"
                                className="bg-white border border-[#30303033] w-full px-3 py-[10px] rounded-lg"
                              >
                                <option value="" selected>
                                  ---
                                </option>
                                <option value="Retail">Retail</option>
                                <option value="green">Green</option>
                                <option value="blue">Blue</option>
                              </Field>
                              <ErrorMessage
                                name="business_type"
                                component="div"
                                className="text-red-600"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="font-medium text-[13px] text-[#101828] ">
                              Business Establishment Date
                            </label>
                            <div className="mt-[10px]">
                              <Field
                                type="date"
                                name="business_date"
                                format="MM-DD-YYYY"
                                onClick={(e) =>
                                  e.target?.showPicker && e.target?.showPicker()
                                }
                                // as="select"
                                className="bg-white border border-[#30303033] w-full px-3 py-[10px] rounded-lg"
                              />
                              <ErrorMessage
                                name="business_date"
                                component="div"
                                className="text-red-600"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mb-6">
                          <label className="font-medium text-[13px] text-[#101828] ">
                            Monthly Revenue
                          </label>
                          <div
                            role="group"
                            aria-labelledby="my-radio-group"
                            className="mt-[10px] flex flex-col justify-center gap-y-[10px]"
                          >
                            <label
                              className={`flex gap-x-3 items-center font-medium text-[13px] leading-[20px] ${
                                values.monthly_revenue === "One"
                                  ? "text-[#101828]"
                                  : "text-[#303030A3]"
                              }`}
                            >
                              <Field
                                type="radio"
                                name="monthly_revenue"
                                value="One"
                                className="radiobtn"
                              />
                              Below $10,000
                            </label>
                            <label
                              className={`flex gap-x-3 items-center font-medium text-[13px] leading-[20px] ${
                                values.monthly_revenue === "Two"
                                  ? "text-[#101828]"
                                  : "text-[#303030A3]"
                              }`}
                            >
                              <Field
                                type="radio"
                                name="monthly_revenue"
                                value="Two"
                                className="radiobtn"
                              />
                              $10,000 - $50,000
                            </label>
                            <label
                              className={`flex gap-x-3 items-center font-medium text-[13px] leading-[20px] ${
                                values.monthly_revenue === "Three"
                                  ? "text-[#101828]"
                                  : "text-[#303030A3]"
                              }`}
                            >
                              <Field
                                type="radio"
                                name="monthly_revenue"
                                value="Three"
                                className="radiobtn"
                              />
                              $50,001 - $100,000
                            </label>
                            <label
                              className={`flex gap-x-3 items-center font-medium text-[13px] leading-[20px] ${
                                values.monthly_revenue === "four"
                                  ? "text-[#101828]"
                                  : "text-[#303030A3]"
                              }`}
                            >
                              <Field
                                type="radio"
                                name="monthly_revenue"
                                value="four"
                                className="radiobtn"
                              />
                              Above $100,000
                            </label>
                          </div>
                        </div>
                        <div className="mb-6">
                          <label className="font-medium text-[13px] text-[#101828] ">
                            Average Monthly Credit/Debit Card Transactions
                          </label>
                          <div className="mt-[10px]">
                            <Field
                              type="text"
                              name="avg_monthly_credit"
                              className="bg-white border border-[#30303033] w-full px-3 py-[10px] rounded-lg"
                              placeholder="$500 - $100,000"
                            />
                            <ErrorMessage
                              name="avg_monthly_credit"
                              component="div"
                              className="text-red-600"
                            />
                          </div>
                        </div>
                        <div className="mb-6">
                          <label className="font-medium text-[13px] text-[#101828] ">
                            Current Funding Needs
                          </label>
                          <div className="mt-[10px]">
                            <Field
                              name="current_funding"
                              as="select"
                              className="bg-white border border-[#30303033] w-full px-3 py-[10px] rounded-lg"
                            >
                              <option value="" selected>
                                ---
                              </option>
                              <option value="Expansion  ">Expansion</option>
                            </Field>
                            <ErrorMessage
                              name="current_funding"
                              component="div"
                              className="text-red-600"
                            />
                          </div>
                        </div>
                        <div className="mb-6">
                          <label className="font-medium text-[13px] text-[#101828] ">
                            Consent to Credit Check
                          </label>
                          <div
                            role="group"
                            aria-labelledby="checkbox-group"
                            className="mt-[10px]"
                          >
                            <label className="flex gap-x-3 items-start text-[#303030A3] font-medium text-[13px] leading-[20px] ">
                              <Field
                                type="checkbox"
                                name="consent_credit_check"
                                className="mt-1"
                              />
                              I authorize ProCash.ai to perform a credit check
                              on myself and my business for the purpose of this
                              application
                            </label>
                            <ErrorMessage
                              name="consent_credit_check"
                              component="div"
                              className="text-red-600"
                            />
                          </div>
                        </div>
                        <div className="mb-8">
                          <label
                            htmlFor="terms_conditions"
                            className="font-medium text-[13px] text-[#101828] "
                          >
                            Agreement to Terms & Conditions
                          </label>
                          <div
                            role="group"
                            aria-labelledby="checkbox-group"
                            className="mt-[10px]"
                          >
                            <label className="flex gap-x-3 items-start text-[#303030A3] font-medium text-[13px] leading-[20px] ">
                              <Field
                                type="checkbox"
                                name="terms_conditions"
                                className="mt-1"
                              />
                              I authorize ProCash.ai to perform a credit check
                              on myself and my business for the purpose of this
                              application
                            </label>
                            <ErrorMessage
                              name="terms_conditions"
                              component="div"
                              className="text-red-600"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* step-3 */}
                    {currentStep === 3 && (
                      <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 mb-6">
                          <div>
                            <label className="font-medium text-[13px] text-[#101828] ">
                              Average Monthly Credit Card Sales
                            </label>
                            <div className="mt-[10px]">
                              <Field
                                type="text"
                                name="avg_monthly_sales_1"
                                className="bg-white border border-[#30303033] w-full px-3 py-[10px] rounded-lg"
                                placeholder="$15,000"
                              />
                              <ErrorMessage
                                name="avg_monthly_sales_1"
                                component="div"
                                className="text-red-600"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="font-medium text-[13px] text-[#101828] ">
                              Average Monthly Debit Card Sales
                            </label>
                            <div className="mt-[10px]">
                              <Field
                                type="text"
                                name="avg_monthly_sales_2"
                                className="bg-white border border-[#30303033] w-full px-3 py-[10px] rounded-lg"
                                placeholder="$5,000"
                              />
                              <ErrorMessage
                                name="avg_monthly_sales_2"
                                component="div"
                                className="text-red-600"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mb-6">
                          <label className="font-medium text-[13px] text-[#101828] ">
                            Other Monthly Revenue Sources{" "}
                            <span className="font-normal text-[#30303066]">
                              (Optional)
                            </span>
                          </label>
                          <div className="mt-[10px]">
                            <Field
                              type="text"
                              name="other_monthly_sources"
                              className="bg-white border border-[#30303033] w-full px-3 py-[10px] rounded-lg"
                              placeholder="Please describe any additional revenue streams"
                            />
                            <ErrorMessage
                              name="other_monthly_sources"
                              component="div"
                              className="text-red-600"
                            />
                          </div>
                        </div>
                        <div className="mb-6">
                          <label className="font-medium text-[13px] text-[#101828] ">
                            Do you have any existing loans or financing?
                          </label>
                          <div
                            role="group"
                            aria-labelledby="my-radio-group"
                            className="mt-[10px] flex flex-col justify-center gap-y-[10px]"
                          >
                            <label
                              className={`flex gap-x-3 items-center font-medium text-[13px] leading-[20px] ${
                                values.existing_loans === "yes"
                                  ? "text-[#101828]"
                                  : "text-[#303030A3]"
                              }`}
                            >
                              <Field
                                type="radio"
                                name="existing_loans"
                                value="yes"
                                className="radiobtn"
                              />
                              Yes
                            </label>
                            <label
                              className={`flex gap-x-3 items-center font-medium text-[13px] leading-[20px] ${
                                values.existing_loans === "no"
                                  ? "text-[#101828]"
                                  : "text-[#303030A3]"
                              }`}
                            >
                              <Field
                                type="radio"
                                name="existing_loans"
                                value="no"
                                className="radiobtn"
                              />
                              No
                            </label>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 mb-6">
                          <div>
                            <label className="font-medium text-[13px] text-[#101828] ">
                              Total Existing Financing Amount
                            </label>
                            <div className="mt-[10px]">
                              <Field
                                type="text"
                                name="existing_financing_amount"
                                className="bg-white border border-[#30303033] w-full px-3 py-[10px] rounded-lg"
                                placeholder="$25,000"
                              />
                              <ErrorMessage
                                name="existing_financing_amount"
                                component="div"
                                className="text-red-600"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="font-medium text-[13px] text-[#101828] ">
                              Monthly Payment Amount
                            </label>
                            <div className="mt-[10px]">
                              <Field
                                type="text"
                                name="monthly_payment"
                                className="bg-white border border-[#30303033] w-full px-3 py-[10px] rounded-lg"
                                placeholder="$500"
                              />
                              <ErrorMessage
                                name="monthly_payment"
                                component="div"
                                className="text-red-600"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mb-6">
                          <label className="font-medium text-[13px] text-[#101828] ">
                            Bank Account Information{" "}
                            <span className="font-normal text-[#30303066]">
                              (Optional)
                            </span>
                          </label>
                          <div className="mt-[10px]">
                            <Field
                              type="text"
                              name="bank_acc_inf"
                              className="bg-white border border-[#30303033] w-full px-3 py-[10px] rounded-lg"
                              placeholder="Indicate the bank where your business account is held"
                            />
                            <ErrorMessage
                              name="bank_acc_inf"
                              component="div"
                              className="text-red-600"
                            />
                          </div>
                        </div>
                        <div className="mb-6 sm:mb-32 md:mb-32 lg:mb-32 xl:mb-32 ">
                          <label
                            htmlFor="business_address"
                            className="font-medium text-[13px] text-[#101828] "
                          >
                            Upload Supporting Documents
                          </label>
                          <div className="mt-[10px]  border-dotted border-[#EFEFEF] border-2 p-4">
                            <input
                              type="file"
                              id="average_monthly_card"
                              name="average_monthly_card"
                              className="hidden"
                              ref={inputRef}
                              onChange={(event) => {
                                setFieldValue(
                                  "average_monthly_card",
                                  event.currentTarget.files[0]
                                );
                              }}
                            />
                            <div className="flex flex-col items-center py-6 max-w-md mx-auto ">
                              {!values.average_monthly_card && (
                                <div>
                                  <img
                                    src={upload_Icon}
                                    alt="upload"
                                    className="w-full h-full"
                                  />
                                </div>
                              )}
                              {values.average_monthly_card && (
                                <div>
                                  <img
                                    src={URL.createObjectURL(
                                      values.average_monthly_card
                                    )}
                                    alt="Preview"
                                    style={{
                                      width: "100px",
                                      height: "100px",
                                      objectFit: "cover",
                                    }}
                                  />
                                </div>
                              )}
                              <h4 className="font-medium text-[13px] text-center text-[#101828] mt-3 mb-1">
                                Choose a file or drag & drop it here.
                              </h4>
                              <p className="mb-0 text-center  font-medium text-[13px] text-[#303030A3]">
                                Allowed file types: PDF, DOC, JPG. Max size: 5MB
                              </p>
                              <div className="mt-4">
                                <button
                                  type="button"
                                  className="border rounded-full border-[#30303033] py-[14px] px-6  font-medium text-[13px] text-[#171717] hover:bg-[#5D74F1] hover:text-[#fff] "
                                  onClick={handleImage}
                                >
                                  Browse File
                                </button>
                              </div>
                            </div>
                            {errors.average_monthly_card &&
                            touched.average_monthly_card ? (
                              <div style={{ color: "red" }}>
                                {errors.average_monthly_card}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* buttoms */}
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={handlePrevious}
                        className=" border rounded-full border-[#30303033] py-[14px] px-6  font-medium text-sm w-full text-[#171717] mb-4 hover:bg-[#5D74F1] hover:text-[#fff] whitespace-nowrap block sm:hidden md:hidden lg:hidden xl:hidden"
                      >
                        Previous Step
                      </button>
                    )}
                    <div className="flex justify-between items-center">
                      <div className=" flex gap-3 w-full sm:w-auto md:w-auto lg:w-auto xl:w-auto">
                        {currentStep > 1 && (
                          <button
                            type="button"
                            onClick={handlePrevious}
                            className=" border rounded-full border-[#30303033] py-[14px] px-6  font-medium text-sm text-[#171717] hover:bg-[#5D74F1] hover:text-[#fff] whitespace-nowrap hidden sm:block md:block lg:block xl:block"
                          >
                            Previous Step
                          </button>
                        )}

                        {currentStep === 3 ? (
                          <button
                            // onClick={() => {
                            //   if (isSubmitting) {
                            //     setIsModalOpen(true);
                            //   }
                            // }}
                            disabled={isSubmitting}
                            type="submit"
                            className="text-white font-medium text-sm bg-[#5D74F1] py-[14px] px-[26px] rounded-[100px] w-full hover:bg-blue-400 hover:text-[#000]"
                          >
                            Submit{" "}
                            <span className="hidden sm:hidden md:hidden lg:inline-block xl:inline-block">
                              Application
                            </span>
                          </button>
                        ) : (
                          currentStep < 3 && (
                            <button
                              type="button"
                              disabled={isSubmitting}
                              onClick={(e) =>
                                handleNext(e, validateForm, setTouched, values)
                              }
                              className="text-white font-medium text-sm bg-[#5D74F1] py-[14px] px-[26px] rounded-[100px] w-full hover:bg-blue-400 hover:text-[#000] whitespace"
                            >
                              Next Step
                            </button>
                          )
                        )}
                      </div>
                      <div className="ml-[15px] sm:ml-0 md:ml-0 lg:ml-0 xl:ml-0">
                        <button
                          type="button"
                          className="border rounded-full border-[#30303033] py-[14px] px-6  font-medium text-sm text-[#171717] hover:bg-[#5D74F1] hover:text-[#fff] "
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className="bg-white col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-5 xl:col-span-5 rounded-2xl border border-[#fff] p-6 h-full block mt-3 sm:block md:hidden lg:hidden xl:hidden">
            <div>
              <h4 className="text-[#171717] font-semibold text-base">
                Need Help?
              </h4>
              <p className="font-normal text-base text-[#303030A3] mt-[10px]">
                Get to know how your campaign can reach a wider audience.
              </p>
              <button
                className="border rounded-full border-[#30303033] shadow-[0px -0.5px 0px 0px #16191D1F inset] px-3 py-[10px] font-medium text-sm text-[#171717] hover:bg-[#5D74F1] hover:text-[#fff] mt-[30px]"
                onClick={() =>
                  window.open("mailto:support@procash.ai", "_self")
                }
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* {isModalOpen && <SuccessModal onClose={closeModal} />} */}
    </>
  );
};

export default StepForm;
