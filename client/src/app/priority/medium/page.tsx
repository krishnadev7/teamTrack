import React from 'react'
import PriorityWrapper from '../PriorityWrapper'
import { Priority } from '@/state/api'

const Medium = () => {
    return (
        <PriorityWrapper priority={Priority.Medium} />
    )
}

export default Medium