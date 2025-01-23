import { create } from "zustand";

const initBusinessRegisterInfo = {
  businessType: "",
  bankAccount: "",
  quantity: "",
  financingFor: "",
  howLong: "",
  revenue: "",
  creditScore: "",
  businessName: "",
  industry: "",
};

const initUserRegisterInfo = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
};

const useStore = create((set) => ({
  businessRegisterInfo: { ...initBusinessRegisterInfo },

  userRegisterInfo: { ...initUserRegisterInfo },

  currentStep: 1,

  incrementCurrentStep: () =>
    set((state) => ({ currentStep: state.currentStep + 1 })),
  decrementCurrentStep: () =>
    set((state) => ({
      currentStep: state.currentStep === 1 ? 1 : state.currentStep - 1,
    })),

  setBusinessRegisterInfo: (businessRegisterInfo) =>
    set((state) => ({
      businessRegisterInfo: {
        ...state.businessRegisterInfo,
        ...businessRegisterInfo,
      },
    })),

  setUserRegisterInfo: (userRegisterInfo) =>
    set((state) => ({
      userRegisterInfo: { ...state.userRegisterInfo, ...userRegisterInfo },
    })),
  reset: () => {
    set(() => ({
      businessRegisterInfo: initBusinessRegisterInfo,
      userRegisterInfo: initUserRegisterInfo,
      currentStep: 1,
    }));
  },
}));

export default useStore;
