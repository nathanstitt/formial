import * as React from 'react'
import cn from 'classnames'

interface SimpleComponentProps {
    className?: string
}

export const Title:React.FC<SimpleComponentProps> = ({children}) => (
    <h4 className="title">
        {children}
    </h4>
)

export const Scrolling:React.FC<SimpleComponentProps> = ({children}) => (
    <div className="scrolling">
        {children}
    </div>
)


export const Values:React.FC<SimpleComponentProps> = ({children, className}) => (
    <div className={cn('values', className)}>
        {children}
    </div>
)

