import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const initBusinessRegisterInfo = {
  businessType: '',
  bankAccount: '',
  quantity: '',
  financingFor: '',
  howLong: '',
  creditScore: '',
  industry: '',
  revenue: '',
  businessName: '',
}

const initUserRegisterInfo = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  phoneNumber2:''
}

// Versión persistente del store
const useStore = create(
  persist(
    (set) => ({
      businessRegisterInfo: { ...initBusinessRegisterInfo },
      userRegisterInfo: { ...initUserRegisterInfo },
      currentStep: 3,

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
    }),
    {
      name: 'business-storage', // Nombre único para el almacenamiento
      partialize: (state) => ({
        // Solo persistir estas partes del estado
        businessRegisterInfo: state.businessRegisterInfo,
        userRegisterInfo: state.userRegisterInfo,
        currentStep: state.currentStep,
      }),
    }
  )
)

export default useStore