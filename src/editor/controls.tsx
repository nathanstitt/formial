import * as React from 'react'
import { useDrag } from 'react-dnd'
import cn from 'classnames'
import { useStore, useStoreContext } from './store'
import { Control } from './models'
import './default-controls'
import { Title, Scrolling } from './components'


const ControlLabel: React.FC<{ control: Control }> = ({ control }) => {
    const { id, name, icon } = control
    const { dispatch } = useStoreContext()

    const [{ opacity }, drag] = useDrag({
        type: 'control',
        item: { id, type: 'control' },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    })

    return (
        <div
            ref={drag}
            style={{ opacity }}
            className={cn('control-label')}
            onClick={() => {
                dispatch({ type: 'APPEND_ELEMENT', control })
            }}
        >
            {icon}
            <span>{name}</span>
        </div>
    )
}


export const Controls = () => {
    const { editingId, controls } = useStore()
    if (editingId) {
        return null
    }
    return (
        <div
            className="controls"
        >
            <Title>Elements</Title>
            <Scrolling className="listing">
                <ul>
                    {Object.values(controls).map(c => (
                        <ControlLabel key={c.id} control={c} />))}
                </ul>
            </Scrolling>
        </div>
    )
}
