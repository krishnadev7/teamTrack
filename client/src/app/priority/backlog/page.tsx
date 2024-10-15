import React from 'react'
import PriorityWrapper from '../PriorityWrapper'
import { Priority } from '@/state/api'

const Backlog = () => {
  return (
    <PriorityWrapper priority={Priority.Backlog}/>
  )
}

export default Backlog