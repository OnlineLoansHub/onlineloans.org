import { create } from 'zustand'

const initBusinessRegisterInfo = {
  businessType: '',
  bankAccount: '',
  quantity: '',
  financingFor: '',
  howLong: '',
  revenue: '',
  creditScore: '',
  businessName: '',
  industry: '',
}

const initUserRegisterInfo = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
}

const useStore = create((set) => ({
  businessRegisterInfo: { ...initBusinessRegisterInfo },
  userRegisterInfo: { ...initUserRegisterInfo },
  currentStep: 1,

  setUserRegisterInfo: (userRegisterInfo) =>
    set((state) => {
      const newState = {
        userRegisterInfo: {
          ...state.userRegisterInfo,
          ...userRegisterInfo,
        },
      }
      console.log('UserRegisterInfo - Cambios:', userRegisterInfo)
      return newState
    }),

  setBusinessRegisterInfo: (businessRegisterInfo) =>
    set((state) => {
      const newState = {
        businessRegisterInfo: {
          ...state.businessRegisterInfo,
          ...businessRegisterInfo,
        },
      }
      console.log('BusinessRegisterInfo - Cambios:', businessRegisterInfo)
      return newState
    }),

  incrementCurrentStep: () =>
    set((state) => ({ currentStep: state.currentStep + 1 })),
  decrementCurrentStep: () =>
    set((state) => ({
      currentStep: state.currentStep === 1 ? 1 : state.currentStep - 1,
    })),

  reset: () => {
    set(() => {
      const newState = {
        businessRegisterInfo: initBusinessRegisterInfo,
        userRegisterInfo: initUserRegisterInfo,
        currentStep: 1,
      }
      console.log('Estado reseteado:', newState)
      return newState
    })
  },
}))

export default useStore
