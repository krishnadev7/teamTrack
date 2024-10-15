import React from 'react'
import PriorityWrapper from '../PriorityWrapper'
import { Priority } from '@/state/api'

const Urgent = () => {
  return (
   <PriorityWrapper priority={Priority.Urgent}/>
  )
}

export default Urgent