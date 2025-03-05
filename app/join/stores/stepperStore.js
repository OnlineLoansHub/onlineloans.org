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
  uuid:'',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  phoneNumber2:''
}

// Inicialización para archivos
const initDocumentsInfo = {
  driversLicense: null,
  bankStatements: []
}

// Versión persistente del store
const useStore = create(
  persist(
    (set, get) => ({
      businessRegisterInfo: { ...initBusinessRegisterInfo },
      userRegisterInfo: { ...initUserRegisterInfo },
      documentsInfo: { ...initDocumentsInfo },
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

      // Métodos para manejar archivos
      setDriversLicense: (file) => {
        set((state) => ({
          documentsInfo: {
            ...state.documentsInfo,
            driversLicense: file
          }
        }))
        console.log('Licencia de conducir actualizada:', file?.name)
      },

      addBankStatement: (file) => {
        set((state) => ({
          documentsInfo: {
            ...state.documentsInfo,
            bankStatements: [...state.documentsInfo.bankStatements, file]
          }
        }))
        console.log('Estado de cuenta añadido:', file?.name)
      },

      removeBankStatement: (index) => {
        set((state) => {
          const updatedStatements = [...state.documentsInfo.bankStatements]
          updatedStatements.splice(index, 1)
          return {
            documentsInfo: {
              ...state.documentsInfo,
              bankStatements: updatedStatements
            }
          }
        })
        console.log('Estado de cuenta eliminado en posición:', index)
      },

      removeAllBankStatements: () => {
        set((state) => ({
          documentsInfo: {
            ...state.documentsInfo,
            bankStatements: []
          }
        }))
        console.log('Todos los estados de cuenta eliminados')
      },

      // Comprobación de validez de documentos
      areDocumentsValid: () => {
        const { driversLicense, bankStatements } = get().documentsInfo
        return driversLicense !== null && bankStatements.length >= 3
      },

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
            documentsInfo: initDocumentsInfo,
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
        documentsInfo: state.documentsInfo,
        currentStep: state.currentStep,
      }),
    }
  )
)

export default useStore