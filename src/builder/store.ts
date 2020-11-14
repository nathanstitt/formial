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
    editing?: Element
}

export interface ElementData {
    className: string
    sizes: SizeData
}

const defaultSizes = ():SizeData => ({
    mobile: 12,
    tablet: 12,
    desktop: 12,
})

export class Element {
    id: string
    control: Control
    data: ElementData
    constructor(control: Control, data = {}) {
        this.control = control
        this.id = uuidv4()
        this.data = deepmerge({
            className: '',
            sizes: defaultSizes(),
        }, data)
    }

}

interface ContainerData extends ElementData {
    children: Array<Element>
}


export interface ContainerOptions {
    id?: string
    type: 'row' | 'column'
    data?: ContainerData
    children?: Array<Element>
}

interface TextData extends ElementData {
    tag: string
    text: string
}

export class TextElement extends Element {
    data: TextData

    constructor(control:Control, data = {}) {
        super(control, data)
        this.data = deepmerge.all([(this as this).data, {
            tag: control.id == 'para' ? 'p' : 'h3',
            text: 'Some text…'
        }, data]) as TextData
    }
}

export class Container extends Element {
    type: 'row' | 'column'
    children: Array<Element>
    constructor(control:Control, options: ContainerOptions) {
        super(control, options)
        this.type = options.type
        this.children = options.children || []
    }

    // merge(patch: any): Container {
    //     return new Container({
    //         id: this.id,
    //         type: this.type,
    //         data: deepmerge(this.data, patch.data),
    //         children: [...patch.children || []],
    //     })
    // }

    // clone() {
    //     return new Container({
    //         id: this.id,
    //         type: this.type,
    //         data: {...this.data },
    //         children: [...this.children],
    //     })
    // }

}



export interface InputData extends ElementData {
    label: string
    name: string
    classNames: {
        wrapper: string
        label: string
        input: string
    }
    sizes: SizeData
    attributes: object
    options?: {
        [value: string]: string
    }
}

export class InputElement extends Element {
    data: InputData

    constructor(control: Control, data = {}) {
        super(control, data)
        this.data = deepmerge(data, {
            label: `${this.control.name} label`,
            className: '',
            sizes: defaultSizes(),
            name: '',
            classNames: {
                wrapper: 'form-group',
                label: 'col-sm-2',
                input: 'form-control col-sm-10',
            },
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

    createElement(): Element {
        return new InputElement(this)
    }

}

export function isContainer(
    toBeDetermined: Element,
): toBeDetermined is Container {
    if (toBeDetermined instanceof Container) {
        return true
    }
    return false
}

export function isInput(
    toBeDetermined: Element,
): toBeDetermined is InputElement {
    if (toBeDetermined instanceof InputElement) {
        return true
    }
    return false
}

export function isText(
    toBeDetermined: Element,
): toBeDetermined is TextElement {
    if (toBeDetermined instanceof TextElement) {
        return true
    }
    return false
}

export class RowControl extends Control {

    createElement(): Element {
        return new Container(this, { type: 'row' })
    }

}

export class TextControl extends Control {
    createElement(): Element {
        return new TextElement(this)
    }
}

export class ColumnControl extends Control {
    createElement(): Element {
        return new Container(this, { type: 'column' })
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
    let element: Element | undefined

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
    | { type: 'DELETE', target: Element, container: Container }
    | { type: 'UPDATE', target: Element, patch: any }
    | { type: 'EDIT', target: Element }
    | { type: 'HIDE_EDIT' }
    | { type: 'ADD_ATTRIBUTE', input: InputElement, nested: string }
    | { type: 'DELETE_ATTRIBUTE', input: InputElement, nested: string, name: string }
    | { type: 'REPLACE_NEW_ATTRIBUTE', input: InputElement, nested: string, name: string, }


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
            action.input.data[action.nested][''] = ''
            return { ...st }
        }
        case 'REPLACE_NEW_ATTRIBUTE': {
            delete action.input.data[action.nested]['']
            action.input.data[action.nested][action.name] = ''
            return { ...st }
        }
        case 'DELETE_ATTRIBUTE': {
            delete action.input.data[action.nested][action.name]
            return { ...st }
        }
    }

    return st
}

export const initStore = ():Store => {
    const store = Object.create(null)
    store.controls = new Map(defaultControls.registered)
    store.container = new Container(store.controls.get('row'), { type: 'row' })

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
