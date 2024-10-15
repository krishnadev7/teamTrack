import React from 'react'
import PriorityWrapper from '../PriorityWrapper'
import { Priority } from '@/state/api'

const Low = () => {
  return (
    <PriorityWrapper priority={Priority.Low}/>
)
}

export default Low