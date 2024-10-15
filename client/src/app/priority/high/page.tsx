import React from 'react'
import PriorityWrapper from '../PriorityWrapper'
import { Priority } from '@/state/api'

const High = () => {
  return (
    <PriorityWrapper priority={Priority.High}/>
  )
}

export default High