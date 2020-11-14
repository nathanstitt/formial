import * as React from 'react'
import deepmerge from 'deepmerge'
import { uuidv4 } from '../lib'


export interface ControlDefinition {
    id: string
    icon: React.ReactNode
    name: string
    placeholder?(element: Element): React.ReactNode
    hasOptions?: boolean
}

export interface SizeData {
    mobile: number
    tablet: number
    desktop: number
}

export interface Store {
    controls: Map<string, Control>,
    container: Container
    editing?: Container | Element
}

export interface ContainerData {
    className: string
    sizes: SizeData
}

export interface ContainerOptions {
    id?: string
    type: 'row' | 'column'
    data?: ContainerData
    children?: Array<Element | Container>
}

export function isContainer(
    toBeDetermined: Container|Element,
): toBeDetermined is Container {
    if ((toBeDetermined as Container).type) {
        return true
    }
    return false
}

const defaultSizes = ():SizeData => ({
    mobile: 12,
    tablet: 12,
    desktop: 12,
})

export class Container {

    id: string
    type: 'row' | 'column'
    data: ContainerData
    children: Array<Element | Container>

    constructor(options: ContainerOptions) {
        this.id = options.id || uuidv4()
        this.type = options.type
        this.children = options.children || []
        this.data = options.data || {
            sizes: defaultSizes(),
            className: this.type === 'row' ? 'row' : 'col'
        }
    }

    merge(patch: any): Container {
        return new Container({
            id: this.id,
            type: this.type,
            data: deepmerge(this.data, patch.data),
            children: [...patch.children || []],
        })
    }

    clone() {
        return new Container({
            id: this.id,
            type: this.type,
            data: {...this.data },
            children: [...this.children],
        })
    }

}

export interface ElementData {
    label: string
    name: string
    classNames: {
        wrapper: string
        label: string
        element: string
    }
    sizes: SizeData
    attributes: object
    options?: {
        [value: string]: string
    }
}

export class Element {

    id: string
    control: Control
    data: ElementData

    constructor(control: Control, data = {}) {
        this.control = control
        this.id = uuidv4()
        this.data = deepmerge(data, {
            label: `${this.control.name} label`,
            name: '',
            classNames: {
                wrapper: 'form-wrapper',
                label: 'col-sm-2',
                element: 'form-control col-sm-10',
            },
            sizes: defaultSizes(),
            attributes: {},
        })
        if (control.hasOptions) {
            this.data.options = {}
        }
    }

    get placeholder(): React.ReactNode {
        return (this.control.placeholder && this.control.placeholder(this)) || null
    }

    get optionPairs(): Array<[string, string]> {
        const { options } = this.data
        if (options) {
            return Object.keys(options).map(key => (
                [key, options[key]]
            ))
        }
        return []
    }

}


export class Control implements ControlDefinition {

    id: string
    name: string
    icon: React.ReactNode

    hasOptions?: boolean
    placeholder?: (element: Element) => React.ReactNode

    constructor(definition: ControlDefinition) {
        this.name = definition.name
        this.id = definition.id
        this.icon = definition.icon
        this.placeholder = definition.placeholder
        this.hasOptions = definition.hasOptions
    }

    createElement(): Element | Container {
        return new Element(this)
    }

}


export class RowControl extends Control {

    createElement(): Element | Container {
        return new Container({ type: 'row' })
    }

}


export class ColumnControl extends Control {

    createElement(): Element | Container {
        return new Container({ type: 'column' })
    }

}


export const defaultControls = {
    registered: new Map<string, Control>(),

    register(controls: Array<Control>) {
        controls.forEach(c => this.registered.set(c.id, c))
    },
}

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
    let element: Element| Container | undefined

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

interface StoreContext {
    store: Store
    dispatch: React.Dispatch<Action> //  (patch:any): void
}

const sc = React.createContext(null as any as StoreContext)

export const useStoreContext = ():StoreContext => React.useContext(sc)

export const useStore = ():Store => useStoreContext().store


type Action =
    | { type: 'test', index: number }
    | { type: 'ADD_ELEMENT', id: string,
        container: Container, destIndex: number,
        fromIndex?: number, fromContainer?: Container }
    | { type: 'DELETE', target: Element | Container, container: Container }
    | { type: 'UPDATE', target: Element | Container, patch: any }
    | { type: 'EDIT', target: Element | Container }
    | { type: 'HIDE_EDIT' }
    | { type: 'ADD_ATTRIBUTE', element: Element, nested: string }
    | { type: 'REPLACE_NEW_ATTRIBUTE', element: Element, nested: string, name: string, }
    | { type: 'DELETE_ATTRIBUTE', element: Element, nested: string, name: string }


const storeReducer = (st:Store, action: Action): Store => {
    switch (action.type) {
        case 'ADD_ELEMENT': {
            return addElement(st, action)
        }
        case 'DELETE': {
            action.container.children = [
                ...action.container.children.filter(e => e.id !== action.target.id),
            ]
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
        case 'ADD_ATTRIBUTE': {
            action.element.data[action.nested][''] = ''
            return { ...st }
        }
        case 'REPLACE_NEW_ATTRIBUTE': {
            delete action.element.data[action.nested]['']
            action.element.data[action.nested][action.name] = ''
            return { ...st }
        }
        case 'DELETE_ATTRIBUTE': {
            delete action.element.data[action.nested][action.name]
            return { ...st }
        }
    }

    return st
}

export const initStore = ():Store => {
    const store = Object.create(null)
    store.controls = new Map(defaultControls.registered)
    store.container = new Container({ type: 'row' })

    // store.elements.push(store.controls.get('select')!.createElement());
    // [store.editing] = store.elements

    return store
}

export const useStoreReducer = () => React.useReducer(storeReducer, {}, initStore)

export const useProvidedStoreContext = ():StoreContext => {
    const [store, dispatch] = useStoreReducer()

    return React.useMemo<StoreContext>(() => ({ store, dispatch }), [store])
}

export { sc as StoreContext }
