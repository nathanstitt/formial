import * as React from 'react'
import deepmerge from 'deepmerge'
import { uuidv4 } from '../lib'
import {
    SerializedForm,
    SerializedOption,
    SerializedElement,
    SerializedContainer,
    SerializedTextElement,
    SerializedInputElement,
    ChoicesLayoutTypes,
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
    hasOptions?: boolean,
    defaultValues?: any,
}

type ControlsMap = Map<string, Control>

export type NestedType = 'options' | 'attributes'

export interface Store {
    controls: ControlsMap,
    form: Form
    editing?: Element
}

export interface ElementData {
    className: string
    attributes: Array<SerializedOption>
}

export class Element {

    id: string
    control: Control
    data: ElementData
    constructor(control: Control, data:any = {}) {
        this.control = control
        this.id = data.id || uuidv4()
        this.data = deepmerge(control.defaultValues, data)
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

    constructor(control:Control, options: ContainerOptions = control.defaultValues) {
        super(control, options)
        this.direction = options.direction || control.defaultValues.direction
        this.children = options.children || control.defaultValues.children
        this.data = deepmerge(this.data, {
            ...options,
            className: '',
            attributes: [],
        })
    }

    get isRow(): boolean {
        return this.direction === 'row'
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
        this.data.className = 'formial-form'
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
        this.data = deepmerge(control.defaultValues, data) as TextData
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
    options: Array<SerializedOption>
    choicesLayout?: ChoicesLayoutTypes
}


export class InputElement extends Element {

    data: InputData

    constructor(control: Control, data = {}) {
        super(control, data)
        this.data = deepmerge(control.defaultValues, data)
        //this.data.attributes = (this.data.attributes || [])
        if (this.control.hasOptions) {
            this.data.options = (this.data.options || [])
        }
    }

    nested(nested: NestedType, id: string): SerializedOption | undefined {
        return this.data[nested].find(a => a.id == id)
    }

    // attrVal(value: string): string | undefined {
    //     this.attr()
    //     return this.data.attributes.find(a => a.value === value)
    // }

    get placeholder(): React.ReactNode {
        return (this.control.placeholder && this.control.placeholder(this)) || null
    }

    get optionPairs(): Array<[string, string]> {
        const { options } = this.data
        if (options) {
            return options.map(opt => (
                [opt.id, opt.value]
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


export class Control {

    id: string
    name: string
    icon: React.ReactNode
    _defaultValues: any
    hasOptions?: boolean
    placeholder?: (element: Element) => React.ReactNode

    constructor(definition: ControlDefinition) {
        this.name = definition.name
        this.id = definition.id
        this.icon = definition.icon
        this.placeholder = definition.placeholder
        this.hasOptions = definition.hasOptions
        this._defaultValues = deepmerge(this.defaultValues || {}, definition.defaultValues || {})
    }

    get defaultValues(): any {
        return deepmerge(this._defaultValues, {
            name: `${this.id}-${Math.round(Math.random() * 9999) + 1000}`,
        })
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

export class ContainerControl extends Control {

    constructor(definition: ControlDefinition) {
        super(definition)
        this._defaultValues = deepmerge((this._defaultValues || {}), {
            children: [],
        })
    }

    createElement(): Element {
        return new Container(this)
    }
}

export class InputControl extends Control {
    constructor(definition: ControlDefinition) {
        super(definition)
        this._defaultValues = deepmerge((this._defaultValues || {}), {
            label: `${definition.name} label`,
            className: 'mb-2',
            classNames: {
                wrapper: this.wrapperClassName,
                label: '',
                input: 'form-control',
            },
            attributes: [],
        })
    }

    get wrapperClassName() {
        switch (this.id) {
            case 'input':
            case 'textarea':
            case 'select': {
                return 'form-floating'
            }
        }
        return 'form-control'
    }

}

// export class ColumnControl extends Control {
//     createElement(): Element {
//         return new Container(this, { direction: 'column' })
//     }
// }

export class TextControl extends Control {
    constructor(definition: ControlDefinition) {
        super(definition)
        this._defaultValues = deepmerge((this._defaultValues || {}), {
            tag: this.id === 'para' ? 'p' : 'h3',
            text: 'Some text…',
            className: '',
        })
    }

    createElement(): Element {
        return new TextElement(this)
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
sc.displayName = 'StoreContext'
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
    | { type: 'APPEND_ELEMENT', control: Control }
    | { type: 'ADD_ELEMENT', id: string,
        container: Container, destIndex: number,
        fromIndex?: number, fromContainer?: Container }
    | { type: 'DELETE', target: Element, container: Container }
    | { type: 'UPDATE', target: Element, patch: any }
    | { type: 'UPSERT_OPTION', input: InputElement, nested: NestedType, id: string, value?: string }
    | { type: 'UPDATE_OPTION', option: SerializedOption, value: string }
    | { type: 'EDIT', target: Element }
    | { type: 'HIDE_EDIT' }
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
