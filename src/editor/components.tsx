import * as React from 'react'
import cn from 'classnames'
import { FCWC } from './types'

interface SimpleComponentProps {
    className?: string
}

export const Title: FCWC<SimpleComponentProps> = ({ children }) => (
    <h4 className="title">
        {children}
    </h4>
)

export const Scrolling: FCWC<SimpleComponentProps> = ({ children }) => (
    <div className="scrolling">
        {children}
    </div>
)


export const Values: FCWC<SimpleComponentProps> = ({ children, className }) => (
    <div className={cn('values', className)}>
        {children}
    </div>
)

