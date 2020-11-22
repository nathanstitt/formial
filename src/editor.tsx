import * as React from 'react'
import styled from 'styled-components'
import cn from 'classnames'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { ControlsListing } from './editor/controls'
import { useProvidedStoreContext, StoreContext, Form } from './editor/store'
import { FormElements } from './editor/form'
import { EditPanel } from './editor/edit-panel'
import { SerializedForm } from './data'

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

const EditorEl = styled.div({
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

export interface EditorProps {
    className?: string
    onChange?(form: Form): void
    defaultValue?: SerializedForm
    value?: SerializedForm
}

export const Editor:React.FC<EditorProps> = ({
    className, onChange, value, defaultValue,
}) => {
    const ctx = useProvidedStoreContext(defaultValue)
    React.useEffect(() => {
        ctx.dispatch({ type: 'REPLACE', form: value })
    }, [value])
    React.useEffect(() => {
        if (onChange) { onChange(ctx.store.form) }
    }, [onChange, ctx.store])

    return (
        <DndProvider backend={HTML5Backend}>
            <StoreContext.Provider value={ctx}>
                <EditorEl className={cn('formial-editor', className)}>
                    <FormPanel />
                    <ControlsListing />
                    <EditPanel />
                </EditorEl>
            </StoreContext.Provider>
        </DndProvider>
    )
}
