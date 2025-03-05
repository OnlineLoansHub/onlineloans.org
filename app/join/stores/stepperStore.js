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
  phoneNumber2: ''
}

// Inicialización para archivos
const initDocumentsInfo = {
  driversLicense: null,
  bankStatements: []
}

// Función para crear cliente Supabase en el navegador
const getSupabaseClient = () => {
  // Verificamos si estamos en el navegador
  if (typeof window !== 'undefined') {
    // Verificamos si supabase está disponible (cargado desde CDN)
    if (window.supabase) {
      return window.supabase.createClient(
        'https://wvgqvjeurcwlzhgvutvs.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2Z3F2amV1cmN3bHpoZ3Z1dHZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExOTYwNzcsImV4cCI6MjA1Njc3MjA3N30.gdqrXtNBNkfkVKsGdVEzFaZgaBQ-XZP8NAW1VZOm4Rg'
      );
    }
    console.error('Supabase no está disponible. Asegúrate de incluir el script de Supabase en tu HTML.');
    return null;
  }
  return null;
}

// Función para generar un nombre de carpeta seguro para la URL
const createSafeFolderName = (firstName, businessName) => {
  // Eliminar caracteres especiales y espacios
  const safeFirstName = (firstName || '').replace(/[^a-zA-Z0-9]/g, '')
  const safeBusinessName = (businessName || '').replace(/[^a-zA-Z0-9]/g, '')
  
  // Si ambos nombres están vacíos, usar un timestamp
  if (!safeFirstName && !safeBusinessName) {
    return `user_${Date.now()}`
  }
  
  // Combinar nombres
  return `${safeFirstName || 'user'}_${safeBusinessName || 'business'}`
}

// Versión persistente del store
const useStore = create(
  persist(
    (set, get) => ({
      businessRegisterInfo: { ...initBusinessRegisterInfo },
      userRegisterInfo: { ...initUserRegisterInfo },
      documentsInfo: { ...initDocumentsInfo },
      uploadResults: [], // Para guardar los resultados de las subidas
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

      // Obtener el nombre de la carpeta para el usuario
      getUserFolderName: () => {
        const { firstName } = get().userRegisterInfo
        const { businessName } = get().businessRegisterInfo
        
        return createSafeFolderName(firstName, businessName)
      },

      // Subir un archivo a Supabase
      uploadFileToSupabase: async (file, folderPath) => {
        if (!file) return null
        
        const supabase = getSupabaseClient()
        if (!supabase) {
          return { success: false, error: "Supabase client not available", file }
        }

        const fileName = `${folderPath}/${Date.now()}-${file.name}`

        try {
          const { data, error } = await supabase.storage
            .from('onchash_5_steps')
            .upload(fileName, file, {
              contentType: file.type
            })

          if (error) {
            console.error('Error al subir archivo:', error)
            return { success: false, error, file }
          }

          const { data: publicUrlData } = supabase.storage
            .from('onchash_5_steps')
            .getPublicUrl(data.path)

          return {
            success: true,
            path: data.path,
            url: publicUrlData.publicUrl,
            fileName: file.name
          }
        } catch (err) {
          console.error('Error en la subida:', err)
          return { success: false, error: err, file }
        }
      },

      // Subir todos los documentos a Supabase
      uploadAllDocuments: async () => {
        const folderName = get().getUserFolderName()
        const folderPath = `users/${folderName}`
        const { driversLicense, bankStatements } = get().documentsInfo

        set({ uploadResults: [] }) // Resetear resultados anteriores

        const results = []

        // Subir licencia de conducir
        if (driversLicense) {
          const result = await get().uploadFileToSupabase(driversLicense, `${folderPath}/drivers-license`)
          results.push({
            type: 'driversLicense',
            ...result
          })
        }

        // Subir estados de cuenta
        for (let i = 0; i < bankStatements.length; i++) {
          const result = await get().uploadFileToSupabase(bankStatements[i], `${folderPath}/bank-statements`)
          results.push({
            type: 'bankStatement',
            index: i,
            ...result
          })
        }

        // Guardar resultados en el estado
        set({ uploadResults: results })
        return results
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
            uploadResults: [],
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
        uploadResults: state.uploadResults,
        currentStep: state.currentStep,
      }),
    }
  )
)

export default useStore