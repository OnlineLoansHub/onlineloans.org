'use client'
import Clarity from '@microsoft/clarity'
import { useEffect } from 'react'

interface ClarityProps {
  id: string
}

export const useClarity = ({ id }: ClarityProps): void => {
  useEffect(() => {
    Clarity.init(id)
  }, [id]) // Dependencia del ID
}
