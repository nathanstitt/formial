import * as React from 'react'
import styled from 'styled-components'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { ControlsListing } from './builder/controls'
import { useProvidedStoreContext, StoreContext, Container } from './builder/store'
import { FormElements } from './builder/form'
import { EditPanel } from './builder/edit-panel'
import { SerializedContainer } from './data'

const FormPanelEl = styled.div({
    display: 'flex',
    width: '100%',
    overflow: 'scroll',
})
const FormPanel = () => {
    return (
        <FormPanelEl>
            <FormElements />
        </FormPanelEl>
    )
}

const BuilderEl = styled.div({
    display: 'grid',
    gridTemplateColumns: '1fr 200px',
    gridTemplateRows: '1fr',
    height: '100%',
    gap: '10px',
    position: 'relative',
    overflow: 'hidden',
    '> *': {
        display: 'flex',
        flexDirection: 'column',
    },
})

interface BuilderProps {
    onChange?(form: Container): void
    defaultValue?: SerializedContainer
    value?: SerializedContainer
}

export const Builder:React.FC<BuilderProps> = ({ onChange, value, defaultValue }) => {
    const ctx = useProvidedStoreContext(defaultValue)
    React.useEffect(() => {
        ctx.dispatch({ type: 'REPLACE', container: value })
    }, [value])
    React.useEffect(() => {
        if (onChange) { onChange(ctx.store.container) }
    }, [onChange, ctx.store])

    return (
        <DndProvider backend={HTML5Backend}>
            <StoreContext.Provider value={ctx}>
                <BuilderEl>
                    <FormPanel />
                    <ControlsListing />
                    <EditPanel />
                </BuilderEl>
            </StoreContext.Provider>
        </DndProvider>
    )
}
