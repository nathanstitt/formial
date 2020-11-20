import * as React from 'react'
import deepmerge from 'deepmerge'
import { uuidv4 } from '../lib'
import {
    SerializedForm,
    SerializedElement,
    SerializedContainer,
    SerializedTextElement,
    SerializedInputElement,
    isSerializedText,
    isSerializedContainer,
    isSerializedInput,
    ElementSerialization,
} from '../data'

export interface ControlDefinition {
    id: string
    icon: React.ReactNode
    name: string
    placeholder?(element: Element): React.ReactNode
    hasOptions?: boolean
}

type ControlsMap = Map<string, Control>

export interface Store {
    controls: ControlsMap,
    form: Form
    editing?: Element
}

export interface ElementData {
    className: string
    attributes?: {
        [value: string]: string
    }
}

export class Element {

    id: string
    control: Control
    data: ElementData
    constructor(control: Control, data:any = {}) {
        this.control = control
        this.id = data.id || uuidv4()
        this.data = deepmerge({
            className: '',
        }, data)
    }

    serialize(): SerializedElement {
        return {
            id: this.id,
            type: 'element',
            control: this.control.id,
            ...this.data,
        }
    }

}


interface ContainerData extends ElementData {
    children: Array<Element>
}


export interface ContainerOptions {
    id?: string
    direction: string // 'row' | 'column'
    data?: ContainerData
    children?: Array<Element>
}

type ContainerChild = Element|TextElement|Container|InputElement

export class Container extends Element {

    direction: string // 'row' | 'column'
    children: Array<ContainerChild>
    constructor(control:Control, options: ContainerOptions) {
        super(control, options)
        this.direction = options.direction || 'row'
        this.children = options.children || []
    }

    serialize(): SerializedContainer {
        return {
            ...super.serialize(),
            ...this.data,
            children: this.children.map(c => c.serialize()),
            direction: this.direction,
            type: 'CONTAINER',
        }
    }

}

export class Form extends Container {

    constructor(cm: ControlsMap, options?: ContainerOptions) {
        const col = cm.get('col')
        if (!col) { throw new Error("Column control doesn't exist?") }
        super(col, { ...options, direction: 'row' })
    }

    serialize(): SerializedForm {
        return {
            ...super.serialize(),
            type: 'FORM',
        }
    }

}

interface TextData extends ElementData {
    tag: string
    text: string
}

export class TextElement extends Element {

    data: TextData

    constructor(control:Control, data = {}) {
        super(control, data)
        this.data = deepmerge.all([{
            tag: control.id === 'para' ? 'p' : 'h3',
            text: 'Some text…',
            className: '',
        }, data]) as TextData
    }

    serialize(): SerializedTextElement {
        return {
            ...super.serialize(),
            ...this.data,
            type: 'TEXT',
        }
    }

}

export interface InputData extends ElementData {
    label: string
    name: string
    classNames: {
        wrapper: string
        label: string
        input: string
    }
    options?: {
        [value: string]: string
    }
}


export class InputElement extends Element {

    data: InputData

    constructor(control: Control, data = {}) {
        super(control, data)
        this.data = deepmerge({
            label: `${this.control.name} label`,
            className: 'mb-2',
            name: `${this.control.id}-${Math.round(Math.random() * 9999) + 1000}`,
            classNames: {
                wrapper: this.wrapperClassName,
                label: '',
                input: 'form-control',
            },
            attributes: {},
        }, data)
        if (control.hasOptions && !this.data.options) {
            this.data.options = {}
        }
    }

    get wrapperClassName() {
        switch (this.control.id) {
            case 'input':
            case 'textarea':
            case 'select': {
                return 'form-floating'
            }
        }
        return 'form-control'
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

    serialize(): SerializedInputElement {
        return {
            ...super.serialize(),
            ...this.data,
            type: 'INPUT',
        }
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
    toBeDetermined: any,
): toBeDetermined is Container {
    return (toBeDetermined instanceof Container)
}

export function isInput(
    toBeDetermined: any,
): toBeDetermined is InputElement {
    return (toBeDetermined instanceof InputElement)
}

export function isText(
    toBeDetermined: any,
): toBeDetermined is TextElement {
    return (toBeDetermined instanceof TextElement)
}

export class RowControl extends Control {

    createElement(): Element {
        return new Container(this, { direction: 'row' })
    }

}

export class TextControl extends Control {

    createElement(): Element {
        return new TextElement(this)
    }

}

export class ColumnControl extends Control {

    createElement(): Element {
        return new Container(this, { direction: 'column' })
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

const unserialize = (cm: ControlsMap, data: ElementSerialization):Element|null => {
    const control = cm.get(data.control)
    if (!control) { return null }

    if (isSerializedText(data)) {
        return new TextElement(control, data)
    }

    if (isSerializedInput(data)) {
        return new InputElement(control, data)
    }


    const children:Array<ContainerChild> = []
    const dataChildren = (data as any).children
    if (dataChildren) {
        dataChildren.forEach((c:ElementSerialization) => {
            const child = unserialize(cm, c)
            if (child) children.push(child)
        })
    }

    if (isSerializedContainer(data)) {
        return new Container(control, { ...data, children })
    }

    // if all else fails attempt to create a form and unserialize it
    return new Form(cm, { ...data, children } as any as ContainerOptions)
}

type Action =
    | { type: 'REPLACE', form?: SerializedForm }
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
