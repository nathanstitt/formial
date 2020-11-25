import * as React from 'react'
import styled from 'styled-components'
import { useDrag } from 'react-dnd'
import { useStore, ControlDefinition } from './store'
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

const ControlLabel:React.FC<ControlDefinition> = ({ id, name, icon }) => {
    const [{ opacity }, drag] = useDrag({
        item: { id, type: 'control' },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    })

    return (
        <ControlLabelEl ref={drag} style={{ opacity }}>
            {icon}
            <span>{name}</span>
        </ControlLabelEl>
    )
}


const ControlsEl = styled.div({

    // '.listing': {
    //     flex: 1,
    //     overflow: 'auto',
    // },
})

export const Controls = () => {
    const { editing, controls } = useStore()
    if (editing) {
        return null
    }
    return (
        <ControlsEl>
            <Title>Elements</Title>
            <Scrolling className="listing">
                <ul>
                    {Array.from(controls.values()).map(definition => (
                        <ControlLabel key={definition.id} {...definition} />))}
                </ul>
            </Scrolling>
        </ControlsEl>
    )
}

