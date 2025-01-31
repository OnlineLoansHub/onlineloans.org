'use client'
import Clarity from '@microsoft/clarity'
import { useEffect } from 'react'

const projectId = 'q22rqfm6yn'

export const useClarity = () => {
  useEffect(() => {
    Clarity.init(projectId)
  }, []) // Se asegura de que se ejecute una sola vez al montar
}
