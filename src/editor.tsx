import * as React from 'react'
import styled from 'styled-components'
import cn from 'classnames'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { Sidebar } from './editor/sidebar'
import { useProvidedStoreContext, StoreContext } from './editor/store'
import { Form } from './editor/models'
import { FormElements } from './editor/form'
import { SerializedForm } from './data'

const FormPanelEl = styled.div({
    display: 'flex',
    width: '100%',
    overflow: 'hidden',
})
const FormPanel:React.FC = () => {
    return (
        <FormPanelEl>
            <FormElements />
        </FormPanelEl>
    )
}

const EditorEl = styled.div({
    display: 'grid',
    gridTemplateColumns: '1fr 300px',
    gridTemplateRows: '1fr',
    height: '100%',
    gap: '10px',
    position: 'relative',
})

export interface EditorProps {
    className?: string
    onChange?(form: Form): void
    defaultValue?: SerializedForm
    value?: SerializedForm | Form
}


export const Editor:React.FC<EditorProps> = ({
    className, onChange, value, defaultValue,
}) => {
    const ctx = useProvidedStoreContext(defaultValue)

    React.useEffect(() => {
        if (value) {
            ctx.dispatch({ type: 'REPLACE_FORM', form: value, controls: ctx.store.controls })
        }
    }, [value])
    React.useEffect(() => {
        if (onChange) { onChange(ctx.store.form) }
    }, [onChange, ctx.store])

    return (
        <DndProvider backend={HTML5Backend}>
            <StoreContext.Provider value={ctx}>
                <EditorEl className={cn('formial-editor', className)}>
                    <FormPanel />
                    <Sidebar />
                </EditorEl>
            </StoreContext.Provider>
        </DndProvider>
    )
}
