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

// Initial state for document files
const initDocumentsInfo = {
  driversLicense: null,
  bankStatements: []
}

// Function to create Supabase client in the browser
const getSupabaseClient = () => {
  // Check if we're in the browser
  if (typeof window !== 'undefined') {
    // Check if supabase is available (loaded from CDN)
    if (window.supabase) {
      return window.supabase.createClient(
        'https://wvgqvjeurcwlzhgvutvs.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2Z3F2amV1cmN3bHpoZ3Z1dHZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExOTYwNzcsImV4cCI6MjA1Njc3MjA3N30.gdqrXtNBNkfkVKsGdVEzFaZgaBQ-XZP8NAW1VZOm4Rg'
      );
    }
    console.error('Supabase is not available. Make sure to include the Supabase script in your HTML.');
    return null;
  }
  return null;
}

// Function to generate a URL-safe folder name
const createSafeFolderName = (firstName, businessName) => {
  // Remove special characters and spaces
  const safeFirstName = (firstName || '').replace(/[^a-zA-Z0-9]/g, '')
  const safeBusinessName = (businessName || '').replace(/[^a-zA-Z0-9]/g, '')
  
  // If both names are empty, use a timestamp
  if (!safeFirstName && !safeBusinessName) {
    return `user_${Date.now()}`
  }
  
  // Combine names
  return `${safeFirstName || 'user'}_${safeBusinessName || 'business'}`
}

// Persistent store with Zustand
const useStore = create(
  persist(
    (set, get) => ({
      businessRegisterInfo: { ...initBusinessRegisterInfo },
      userRegisterInfo: { ...initUserRegisterInfo },
      documentsInfo: { ...initDocumentsInfo },
      uploadResults: [], // To store upload results
      
      // Update user registration information
      setUserRegisterInfo: (userRegisterInfo) =>
        set((state) => {
          const newState = {
            userRegisterInfo: {
              ...state.userRegisterInfo,
              ...userRegisterInfo,
            },
          }
          console.log('UserRegisterInfo - Changes:', userRegisterInfo)
          return newState
        }),

      // Update business registration information  
      setBusinessRegisterInfo: (businessRegisterInfo) =>
        set((state) => {
          const newState = {
            businessRegisterInfo: {
              ...state.businessRegisterInfo,
              ...businessRegisterInfo,
            },
          }
          console.log('BusinessRegisterInfo - Changes:', businessRegisterInfo)
          return newState
        }),

      // Methods for handling files
      // Set driver's license file
      setDriversLicense: (file) => {
        set((state) => ({
          documentsInfo: {
            ...state.documentsInfo,
            driversLicense: file
          }
        }))
        console.log('Driver\'s license updated:', file?.name)
      },

      // Add a bank statement file to the collection
      addBankStatement: (file) => {
        set((state) => ({
          documentsInfo: {
            ...state.documentsInfo,
            bankStatements: [...state.documentsInfo.bankStatements, file]
          }
        }))
        console.log('Bank statement added:', file?.name)
      },

      // Remove a bank statement file by index
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
        console.log('Bank statement removed at position:', index)
      },

      // Remove all bank statement files
      removeAllBankStatements: () => {
        set((state) => ({
          documentsInfo: {
            ...state.documentsInfo,
            bankStatements: []
          }
        }))
        console.log('All bank statements removed')
      },

      // Check if required documents are valid
      // Requires driver's license and at least 3 bank statements
      areDocumentsValid: () => {
        const { driversLicense, bankStatements } = get().documentsInfo
        return driversLicense !== null && bankStatements.length >= 3
      },

      // Get folder name based on user and business names
      getUserFolderName: () => {
        const { firstName } = get().userRegisterInfo
        const { businessName } = get().businessRegisterInfo
        
        return createSafeFolderName(firstName, businessName)
      },

      // Upload a single file to Supabase storage
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
            console.error('Error uploading file:', error)
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
          console.error('Error during upload:', err)
          return { success: false, error: err, file }
        }
      },

      // Upload all documents (driver's license and bank statements) to Supabase
      uploadAllDocuments: async () => {
        const folderName = get().getUserFolderName()
        const folderPath = `users/${folderName}`
        const { driversLicense, bankStatements } = get().documentsInfo

        set({ uploadResults: [] }) // Reset previous results

        const results = []

        // Upload driver's license
        if (driversLicense) {
          const result = await get().uploadFileToSupabase(driversLicense, `${folderPath}/drivers-license`)
          results.push({
            type: 'driversLicense',
            ...result
          })
        }

        // Upload bank statements
        for (let i = 0; i < bankStatements.length; i++) {
          const result = await get().uploadFileToSupabase(bankStatements[i], `${folderPath}/bank-statements`)
          results.push({
            type: 'bankStatement',
            index: i,
            ...result
          })
        }

        // Save results to state
        set({ uploadResults: results })
        return results
      },

      // Reset the entire application state to initial values
      reset: () => {
        set(() => {
          const newState = {
            businessRegisterInfo: { ...initBusinessRegisterInfo },
            userRegisterInfo: { ...initUserRegisterInfo },
            documentsInfo: { ...initDocumentsInfo },
            uploadResults: []
          }
          console.log('State reset:', newState)
          return newState
        })
      },
    }),
    {
      name: 'business-storage', // Unique name for storage
      partialize: (state) => ({
        // Only persist these parts of the state
        businessRegisterInfo: state.businessRegisterInfo,
        userRegisterInfo: state.userRegisterInfo,
        documentsInfo: state.documentsInfo,
        uploadResults: state.uploadResults
      }),
    }
  )
)

export default useStore