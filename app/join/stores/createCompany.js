import { create } from 'zustand'
import { postCompany } from '../services/postCompany'
import { updateCompany } from '../services/updateCompany'

export const useCreateCompany = create((set, get) => ({
  officialName: '',
  companyAlias: '',
  fielPassword: '',
  cerFile: null,
  keyFile: null,
  postResponse: null,
  updateResponse: null,
  setOfficialName: (officialName) => {
    set((state) => ({ officialName }))
    console.log(get().officialName)
  },
  setCompanyAlias: (companyAlias) => {
    set((state) => ({ companyAlias }))
    console.log(get().companyAlias)
  },
  setFielPassword: (fielPassword) => {
    set((state) => ({ fielPassword }))
    console.log(get().fielPassword)
  },
  setCerFile: (cerFile) => {
    set((state) => ({ cerFile }))
  },
  setKeyFile: (keyFile) => {
    set((state) => ({ keyFile }))
  },
  setPostResponse: (postResponse) => {
    set((state) => ({ postResponse }))
  },
  setUpdateResponse: (updateResponse) => {
    set((state) => ({ updateResponse }))
  },
  sendData: async ({ token }) => {
    const formData = new FormData()
    formData.append('name', get().officialName)
    formData.append('alias', get().companyAlias)
    formData.append('cert_file', get().cerFile)
    formData.append('key_file', get().keyFile)
    formData.append('key_password', get().fielPassword)

    const postResponse = await postCompany(token, formData)
    set((state) => ({
      postResponse,
    }))
  },
  updateData: async ({ token }, companyId) => {
    const formData = new FormData()
    formData.append('name', get().officialName)
    formData.append('alias', get().companyAlias)
    formData.append('cert_file', get().cerFile)
    formData.append('key_file', get().keyFile)
    formData.append('key_password', get().fielPassword)

    const updateResponse = await updateCompany(token, formData, companyId)
    set((state) => ({
      updateResponse,
    }))
  },
}))
