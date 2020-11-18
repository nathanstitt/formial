import * as React from 'react'
import styled from 'styled-components'
import { useDrag } from 'react-dnd'
import { useStore, ControlDefinition } from './store'
import './default-controls'

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
    const [, drag] = useDrag({
        item: { id, type: 'control' },
    })
    return (
        <ControlLabelEl ref={drag}>
            {icon}
            <span>{name}</span>
        </ControlLabelEl>
    )
}

const ControlsListingEl = styled.div({
    overflow: 'auto',
    paddingRight: '10px',
    ul: {
        padding: 0,
        margin: 0,
    },
})
export const ControlsListing:React.FC = () => {
    const { controls } = useStore()
    return (
        <ControlsListingEl className="controls-listing">
            <ul>
                {Array.from(controls.values()).map(definition => (
                    <ControlLabel key={definition.id} {...definition} />))}
            </ul>
        </ControlsListingEl>
    )
}
