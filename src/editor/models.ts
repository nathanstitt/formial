import deepmerge from 'deepmerge'
import { immerable } from 'immer'
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
    placeholder?(element: FormElement): React.ReactNode
    hasOptions?: boolean,
    defaultValues?: any,
}

export type ControlsMap = {
    [key: string]: Control
}

export type NestedType = 'options' | 'attributes'

export interface ElementData {
    className: string
    attributes: Array<SerializedOption>
}

export class FormElement {

    [immerable] = true

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
    children: Array<FormElement>
}

export interface ContainerOptions {
    id?: string
    direction: string // 'row' | 'column'
    data?: ContainerData
    children?: Array<FormElement>
}

type ContainerChild = FormElement|TextElement|Container|InputElement

export class Container extends FormElement {

    [immerable] = true

    direction: string // 'row' | 'column'
    children: Array<ContainerChild>

    constructor(control:Control, options: ContainerOptions = control.defaultValues) {
        super(control, options)
        this.direction = options.direction || control.defaultValues.direction
        this.children = options.children || control.defaultValues.children || []
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
        const { col } = cm
        if (!col) { throw new Error("Column control doesn't exist?") }
        super(col, { ...options, direction: 'row' })
        this[immerable] = true
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

export class TextElement extends FormElement {

    [immerable] = true
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


export class InputElement extends FormElement {

    [immerable] = true
    data: InputData

    constructor(control: Control, data = {}) {
        super(control, data)
        this.data = deepmerge(control.defaultValues, data)
        // this.data.attributes = (this.data.attributes || [])
        if (this.control.hasOptions) {
            this.data.options = (this.data.options || [])
        }
    }

    nested(nested: NestedType, id: string): SerializedOption | undefined {
        return this.data[nested].find(a => a.id === id)
    }

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

    [immerable] = true
    id: string
    name: string
    icon: React.ReactNode
    _defaultValues: any
    hasOptions?: boolean
    placeholder?: (element: FormElement) => React.ReactNode

    constructor(definition: ControlDefinition) {
        this.name = definition.name
        this.id = definition.id
        this.icon = definition.icon
        this.placeholder = definition.placeholder
        this.hasOptions = definition.hasOptions
        this._defaultValues = deepmerge(this.defaultValues || {}, definition.defaultValues || {})
    }

    get defaultValues(): any {
        return { ...this._defaultValues }
    }

    createElement(): FormElement {
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

    [immerable] = true

    constructor(definition: ControlDefinition) {
        super(definition)
        this._defaultValues = deepmerge((this._defaultValues || {}), {
            children: [],
        })
    }

    createElement(): FormElement {
        return new Container(this)
    }

}

export class InputControl extends Control {

    [immerable] = true

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

    get defaultValues(): any {
        return deepmerge(this._defaultValues, {
            name: `${this.id}-${Math.round(Math.random() * 9999) + 1000}`,
        })
    }

}

export class TextControl extends Control {

    [immerable] = true

    constructor(definition: ControlDefinition) {
        super(definition)
        this._defaultValues = deepmerge((this._defaultValues || {}), {
            tag: this.id === 'para' ? 'p' : 'h3',
            text: 'Some text…',
            className: '',
        })
    }

    createElement(): FormElement {
        return new TextElement(this)
    }

}

export const defaultControls = {
    registered: Object.create(null),

    register(controls: Array<Control>) {
        controls.forEach((c) => {
            this.registered[c.id] = c
        })
    },
}

export const unserialize = (cm: ControlsMap, data: ElementSerialization):FormElement|null => {
    const control = cm[data.control]
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
