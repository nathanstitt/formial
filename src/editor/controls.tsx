import * as React from 'react'
import styled from 'styled-components'
import { useDrag } from 'react-dnd'
import { useStore, useStoreContext } from './store'
import { Control } from './models'
import './default-controls'

import { Title, Scrolling } from './components'

const ControlLabelEl = styled.li({
    cursor: 'pointer',
    backgroundColor: 'white',
    listStyle: 'none',
    margin: '5px',
    padding: '10px',
    userSelect: 'none',
    border: '1px dashed #ddd',
    svg: {
        height: '20px',
        marginRight: '0.5rem',
    },
})

const ControlLabel:React.FC<{ control: Control }> = ({ control }) => {
    const { id, name, icon } = control
    const { dispatch } = useStoreContext()

    const [{ opacity }, drag] = useDrag({
        item: { id, type: 'control' },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    })

    return (
        <ControlLabelEl
            ref={drag}
            style={{ opacity }}
            onClick={() => {
                dispatch({ type: 'APPEND_ELEMENT', control })
            }}
        >
            {icon}
            <span>{name}</span>
        </ControlLabelEl>
    )
}

const ControlsEl = styled.div({
    ul: {
        padding: 0,
        margin: 0,
    },
})

export const Controls = () => {
    const { editingId, controls } = useStore()
    if (editingId) {
        return null
    }
    return (
        <ControlsEl>
            <Title>Elements</Title>
            <Scrolling className="listing">
                <ul>
                    {Object.values(controls).map(c => (
                        <ControlLabel key={c.id} control={c} />))}
                </ul>
            </Scrolling>
        </ControlsEl>
    )
}
