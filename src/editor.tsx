import * as React from 'react'
import cn from 'classnames'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { Sidebar } from './editor/sidebar'
import { useProvidedStoreContext, StoreContext } from './editor/store'
import { Form } from './editor/models'
import { FormElements } from './editor/form'
import { SerializedForm } from './data'

const FormPanel: React.FC = () => {
    return (
        <div className="form-panel">
            <FormElements />
        </div>
    )
}


export interface FormRef {
    readonly form: Form
    clear(): void
    update(form: SerializedForm): void
}

export interface EditorProps {
    className?: string
    defaultValue?: SerializedForm
    formRef?: React.MutableRefObject<FormRef | null>
}

export const Editor: React.FC<EditorProps> = ({
    className, formRef, defaultValue,
}) => {
    const ctx = useProvidedStoreContext(defaultValue)

    React.useEffect(() => {
        if (formRef) {
            formRef.current = {
                get form() { return ctx.store.form },
                clear() { ctx.dispatch({ type: 'CLEAR' }) },
                update(form: SerializedForm) {
                    ctx.dispatch({ type: 'REPLACE_FORM', form, controls: ctx.store.controls })
                },
            }
        }
        return () => {
            if (formRef) { formRef.current = null }
        }
    }, [formRef, ctx.store.form])


    return (
        <DndProvider backend={HTML5Backend}>
            <StoreContext.Provider value={ctx}>
                <div className={cn('formial-editor', className)}>
                    <FormPanel />
                    <Sidebar />
                </div>
            </StoreContext.Provider>
        </DndProvider>
    )
}
