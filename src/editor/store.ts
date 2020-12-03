import * as React from 'react'
import deepmerge from 'deepmerge'
import {
    Container,
    FormElement,
    Control,
    InputElement,
    NestedType,
    ControlsMap,
    Form,
    defaultControls,
    unserialize,
} from './models'

import {
    SerializedForm,
    SerializedOption,
} from '../data'

export interface Store {
    controls: ControlsMap,
    form: Form
    editing?: FormElement
}

export const useStore = ():Store => useStoreContext().store

interface StoreContext {
    store: Store
    dispatch: React.Dispatch<Action> //  (patch:any): void
}

const sc = React.createContext(null as any as StoreContext)
sc.displayName = 'StoreContext'
export const useStoreContext = ():StoreContext => React.useContext(sc)

interface InsertElementOptions {
    id: string,
    container: Container, destIndex: number,
    fromIndex?: number, fromContainer?: Container
}

export function addElement(
    store: Store,
    {
        id, container, destIndex, fromIndex, fromContainer,
    }: InsertElementOptions,
): Store {
    let cntrl: Control | undefined
    let element: FormElement | undefined

    if (fromIndex != null && fromContainer) {
        element = fromContainer.children[fromIndex]
        fromContainer.children.splice(fromIndex, 1)
        if (fromContainer === container && fromIndex < destIndex) {
            destIndex -= 1 // eslint-disable-line no-param-reassign
        }
    } else {
        cntrl = store.controls.get(id)
        if (!cntrl) {
            // eslint-disable-next-line no-console
            console.warn(`attempted to drop id ${id} but no control exists`)
            return store
        }
    }
    if (!element && cntrl) {
        element = cntrl.createElement()
    }
    if (element) {
        container.children.splice(destIndex, 0, element)
    }
    return { ...store }
}

type Action =
    | { type: 'REPLACE', form?: SerializedForm }
    | { type: 'APPEND_ELEMENT', control: Control }
    | { type: 'ADD_ELEMENT', id: string,
        container: Container, destIndex: number,
        fromIndex?: number, fromContainer?: Container }
    | { type: 'DELETE', target: FormElement, container: Container }
    | { type: 'UPDATE', target: FormElement, patch: any }
    | { type: 'UPSERT_OPTION', input: InputElement, nested: NestedType, id: string, value?: string }
    | { type: 'UPDATE_OPTION', option: SerializedOption, value: string }
    | { type: 'EDIT', target: FormElement }
    | { type: 'HIDE_EDIT' }
    | { type: 'REORDER_OPTION', input: InputElement, id: string, index: number, nested: NestedType }
    | { type: 'ADD_ATTRIBUTE', input: InputElement, nested: NestedType }
    | { type: 'DELETE_OPTION', input: InputElement, nested: NestedType, id: string }
    | { type: 'REPLACE_NEW_ATTRIBUTE', input: InputElement, nested: string, name: string, }

const storeReducer = (st:Store, action: Action): Store => {
    switch (action.type) {
        case 'ADD_ELEMENT': {
            return addElement(st, action)
        }
        case 'APPEND_ELEMENT': {
            st.form.children.push(action.control.createElement())
            return { ...st }
        }
        case 'REPLACE': {
            if (action.form) {
                const form = unserialize(st.controls, action.form)
                if (form && form instanceof Form) {
                    return { ...st, form }
                }
            }
            return st
        }
        case 'DELETE': {
            action.container.children = [
                ...action.container.children.filter(e => e.id !== action.target.id),
            ]
            return { ...st, editing: undefined }
        }
        case 'UPSERT_OPTION': {
            const option = action.input.nested(action.nested, action.id)
            if (option) {
                option.value = action.value || ''
            } else {
                action.input.data[action.nested]
                    .push({ id: action.id, value: action.value || '' })
            }
            return { ...st }
        }
        case 'UPDATE_OPTION': {
            action.option.value = action.value
            return { ...st }
        }
        case 'UPDATE': {
            action.target.data = deepmerge(action.target.data as any, action.patch)
            return { ...st }
        }
        case 'EDIT': {
            return { ...st, editing: action.target }
        }
        case 'HIDE_EDIT': {
            return { ...st, editing: undefined }
        }
        case 'REORDER_OPTION': {
            const options = action.input.data[action.nested]
            const currentIndex = options.findIndex(o => o.id === action.id)

            const option = options[currentIndex]
            action.input.data[action.nested].splice(currentIndex, 1)

            if (action.index > currentIndex) {
                action.index -= 1
            }
            action.input.data[action.nested].splice(action.index, 0, option)
            return { ...st }
        }
        case 'ADD_ATTRIBUTE': {
            action.input.data[action.nested].push({ id: '', value: '' })
            return { ...st }
        }
        case 'REPLACE_NEW_ATTRIBUTE': {
            delete action.input.data[action.nested]['']
            action.input.data[action.nested][action.name] = ''
            return { ...st }
        }
        case 'DELETE_OPTION': {
            const option = action.input.nested(action.nested, action.id)
            if (option) {
                const index = action.input.data[action.nested].indexOf(option)
                if (index != -1) {
                    action.input.data[action.nested].splice(index, 1)
                }
            }
            return { ...st }
        }
    }
    return st
}

export const initStore = (defaultValue?: SerializedForm):Store => {
    const store = Object.create(null)
    store.controls = new Map(defaultControls.registered)

    store.form = defaultValue ? unserialize(store.controls, defaultValue)
        : new Form(store.controls, defaultValue)

    // store.elements.push(store.controls.get('select')!.createElement());
    // [store.editing] = store.elements

    return store
}

export const useStoreReducer = (defaultValue?: SerializedForm) => (
    React.useReducer(storeReducer, defaultValue, initStore)
)

export const useProvidedStoreContext = (defaultValue?: SerializedForm):StoreContext => {
    const [store, dispatch] = useStoreReducer(defaultValue)

    return React.useMemo<StoreContext>(() => ({ store, dispatch }), [store])
}

export { sc as StoreContext, unserialize }
