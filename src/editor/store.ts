/* eslint-disable consistent-return */
import * as React from 'react'

import produce, { Draft } from 'immer'
import {
    Container,
    FormElement,
    Control,
    NestedType,
    ControlsMap,
    Form,
    isInput,
    defaultControls,
    unserialize,
    isContainer,
} from './models'

import {
    isSerializedForm,
    SerializedForm,
} from '../data'

export interface Store {
    controls: ControlsMap,
    form: Form
    editingId?: string
}

interface StoreContextI {
    store: Store
    dispatch: React.Dispatch<Action> //  (patch:any): void
}

export const StoreContext = React.createContext(null as any as StoreContextI)
export const useStoreContext = ():StoreContextI => React.useContext(StoreContext)
export const useStore = ():Store => useStoreContext().store

StoreContext.displayName = 'StoreContext'


interface InsertElementOptions {
    id: string,
    containerId: string, destIndex: number,
    fromIndex?: number, fromContainerId?: string
}

export const findElement = (el: FormElement, id: string): Array<FormElement> => {
    if (el.id === id) {
        return [el]
    }
    if (isContainer(el)) {
        for (let i = 0; i < el.children.length; i++) {
            const child = el.children[i]
            const match = findElement(child, id)
            if (match.length) {
                return match.concat(el)
            }
        }
    }
    return []
}

export const useEditingElement = (): FormElement|undefined => {
    const sc = useStore()
    if (sc.editingId) {
        return findElement(sc.form, sc.editingId)[0]
    }
    return undefined
}

export function addElement(
    store: Draft<Store>,
    {
        id, containerId, destIndex, fromIndex, fromContainerId,
    }: InsertElementOptions,
): void {
    let cntrl: Control | undefined
    let element: FormElement | undefined
    const container = findElement(store.form, containerId)[0]
    if (!isContainer(container)) {
        return
    }

    if (fromIndex != null && fromContainerId) {
        const fromContainer = findElement(store.form, fromContainerId)[0]
        if (!isContainer(fromContainer)) {
            return
        }
        element = fromContainer.children[fromIndex]
        fromContainer.children.splice(fromIndex, 1)
        if (fromContainer === container && fromIndex < destIndex) {
            destIndex -= 1 // eslint-disable-line no-param-reassign
        }
    } else {
        cntrl = store.controls[id]
        if (!cntrl) {
            // eslint-disable-next-line no-console
            console.warn(`attempted to drop id ${id} but no control exists`)
            return
        }
    }
    if (!element && cntrl) {
        element = cntrl.createElement()
    }
    if (element) {
        container.children.splice(destIndex, 0, element)
    }
}


type Action =
    | { type: 'REPLACE_FORM', controls: ControlsMap, form: SerializedForm|Form }
    | { type: 'APPEND_ELEMENT', control: Control }
    | { type: 'ADD_ELEMENT', id: string,
        containerId: string, destIndex: number,
        fromIndex?: number, fromContainerId?: string }
    | { type: 'DELETE_ELEMENT', elementId: string, containerId: string }
    | { type: 'UPDATE_ELEMENT', elementId: string, patch: any }
    | { type: 'UPSERT_OPTION', inputId: string, nested: NestedType, optionId: string, value?: string }
    | { type: 'EDIT_ELEMENT', elementId: string }
    | { type: 'HIDE_EDIT' }
    | { type: 'REORDER_OPTION', inputId: string, optionId: string, index: number, nested: NestedType }
    | { type: 'DELETE_OPTION', inputId: string, nested: NestedType, id: string }


const storeReducer:React.Reducer<Store, Action> = produce((draft:Draft<Store>, action: Action) => {
    switch (action.type) {
        case 'ADD_ELEMENT': {
            return addElement(draft, action)
        }

        case 'APPEND_ELEMENT': {
            draft.form.children.push(action.control.createElement())
            return
        }

        case 'REPLACE_FORM': {
            let form: FormElement|null = null
            if (isSerializedForm(action.form)) {
                form = unserialize(action.controls, action.form)
            } else if (action.form instanceof Form) {
                form = action.form
            }
            if (form && form instanceof Form) {
                draft.form = form
            }
            return
        }

        case 'DELETE_ELEMENT': {
            const el = findElement(draft.form, action.elementId)
            const parent = el[1] as Container
            parent.children.splice(parent.children.indexOf(el[0]), 1)
            return
        }

        case 'UPSERT_OPTION': {
            const input = findElement(draft.form, action.inputId)[0]
            if (!isInput(input)) { return }
            const option = input.data[action.nested].find(o => o.id === action.optionId)
            if (option) {
                option.value = action.value || ''
            } else {
                input.data[action.nested].push({ id: action.optionId, value: action.value || '' })
            }
            return
        }

        case 'UPDATE_ELEMENT': {
            const input = findElement(draft.form, action.elementId)[0]
            Object.assign(input.data, action.patch)
            return
        }

        case 'EDIT_ELEMENT': {
            const input = findElement(draft.form, action.elementId)
            draft.editingId = input[0].id
            return
        }

        case 'HIDE_EDIT': {
            draft.editingId = undefined
            return
        }

        case 'REORDER_OPTION': {
            const input = findElement(draft.form, action.inputId)[0]
            if (!isInput(input)) {
                return
            }
            const options = input.data[action.nested]
            const currentIndex = options.findIndex(o => o.id === action.optionId)
            const option = options[currentIndex]
            input.data[action.nested].splice(currentIndex, 1)
            if (action.index > currentIndex) {
                action.index -= 1
            }
            input.data[action.nested].splice(action.index, 0, option)
            return
        }

        case 'DELETE_OPTION': {
            const input = findElement(draft.form, action.inputId)[0]
            if (!isInput(input)) {
                return
            }
            const option = input.nested(action.nested, action.id)
            if (option) {
                const index = input.data[action.nested].indexOf(option)
                if (index !== -1) {
                    input.data[action.nested].splice(index, 1)
                }
            }
        }
    }
})


export const initStore = (defaultValue?: SerializedForm):Store => {
    const store = Object.create(null)
    store.controls = { ...defaultControls.registered }

    store.form = defaultValue ? unserialize(store.controls, defaultValue)
        : new Form(store.controls, defaultValue)

    // store.elements.push(store.controls['select']!.createElement());
    // [store.editing] = store.elements

    return store
}

export const useStoreReducer = (defaultValue?: SerializedForm) => (
    React.useReducer(storeReducer, defaultValue, initStore)
)

export const useProvidedStoreContext = (defaultValue?: SerializedForm):StoreContextI => {
    const [store, dispatch] = useStoreReducer(defaultValue)
    return React.useMemo<StoreContextI>(() => ({ store, dispatch }), [store])
}
