import cx from 'classnames'
import {
    isSerializedText,
    isSerializedForm,
    isSerializedInput,
    SerializedElement,
    SerializedContainer,
    isSerializedContainer,
    SerializedTextElement,
    SerializedInputElement,
} from '../data'


interface UnserializeOptions {
    parent?: Container
}

class Element {

    data: SerializedElement
    options: UnserializeOptions

    constructor(data: SerializedElement, options: UnserializeOptions) {
        this.data = data
        this.options = options
    }

    el?:HTMLElement

    createElement():HTMLElement {
        return document.createElement('div')
    }

    get columnSmWidth():number {
        if (this.options.parent instanceof Container && this.options.parent.isBSRow) {
            return Math.round(12 / this.options.parent.children.length)
        }
        return 0
    }

    render(root:HTMLElement, skipAttributes = false) {
        if (!this.el) {
            this.el = this.createElement()
        }
        this.setAttributes({
            'data-control': this.data.type,
            'data-id': this.data.id,
            class: cx(this.data.className, {
                [`col-sm-${this.columnSmWidth}`]: this.columnSmWidth !== 0,
            }),
        })

        if (!skipAttributes) {
            this.setAttributes()
        }

        if (this.el.parentElement !== root) {
            root.appendChild(this.el)
        }
        return this
    }

    setAttributes(
        attrs = this.data.attributes,
        el:HTMLElement|undefined = this.el,
    ) {
        if (!el || !attrs) {
            return
        }
        Object.keys(attrs).forEach((k) => {
            if (k) {
                el.setAttribute(k, String(attrs[k]))
            }
        })
    }

}

class TextElement extends Element {

    data: SerializedTextElement

    constructor(data: SerializedTextElement, options: UnserializeOptions) {
        super(data, options)
        this.data = data
    }

    createElement():HTMLElement {
        return document.createElement(this.data.tag)
    }

    render(root:HTMLElement) {
        super.render(root)
        this.el!.innerText = this.data.text
        return this
    }

}

class InputElement extends Element {

    data: SerializedInputElement
    label?: HTMLLabelElement
    input?: HTMLElement

    constructor(data: SerializedInputElement, options: UnserializeOptions) {
        super(data, options)
        this.data = data
    }


    render(root:HTMLElement) {
        super.render(root, true)

        this.setAttributes({
            'data-type': this.data.control,
            class: cx(this.data.className, {
                [`col-sm-${this.columnSmWidth}`]: this.columnSmWidth !== 0,
            }),
        })

        if (!this.input) {
            const renderer = this[`_${this.data.control}`]
            if (renderer) {
                const input =  renderer.apply(this)
                this.input = input as HTMLElement
                // this.input.className = this.data.classNames.input
                // this.input.id = this.data.id
                this.el!.appendChild(this.input)
            }
        }
        return this
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

    createInput(tag: string) {
        const float = document.createElement('div')
        float.className = this.data.classNames.wrapper

        const input = document.createElement(tag)

        this.setAttributes({
            name: this.data.name,
            class: 'form-control',
            placeholder: this.data.label,
            ...this.data.attributes,
        }, input)

        float.appendChild(input)

        const label = document.createElement('label')
        label.innerText = this.data.label
        this.setAttributes({
            for: this.data.id,

        }, label)
        float.appendChild(label)

        return float
    }

    _textarea() {
        return this.createInput('textarea')
    }

    _input() {
        return this.createInput('input')
    }

    renderOptions(cb: (a:string, b:string) => { [k:string]: string }) {
        const wrapper = document.createElement('div')
        this.setAttributes(this.data.attributes, wrapper)
        wrapper.className = this.data.classNames.wrapper

        const labelTitle = document.createElement('label')
        labelTitle.innerText = this.data.label
        wrapper.appendChild(labelTitle)

        this.optionPairs.forEach(([optId, optValue]) => {
            const { id, inputType, name, value, label } = cb(optId, optValue)
            const inputId = `${id}-${this.data.id}`

            const option = document.createElement('label')
            this.setAttributes({ class: 'form-check' }, option)

            const input = document.createElement('input')
            this.setAttributes({
                class: 'form-check-input',
                'data-id': id,
                type: inputType,
                name,
                value,
                id: inputId,
            }, input)
            option.appendChild(input)

            const labelEl = document.createElement('span')
            this.setAttributes({
                className: 'form-check-label',
            }, labelEl)
            labelEl.innerText = label
            option.appendChild(labelEl)

            wrapper.appendChild(option)
        })
        return wrapper
    }

    _radio() {
        return this.renderOptions((id:string, value: string) => ({
            inputType: 'radio',
            name: this.data.name,
            id,
            value,
            label: value,
        }))
    }

    _checkbox(): HTMLDivElement {
        return this.renderOptions((id:string, value: string) => ({
            inputType: 'checkbox',
            name: id,
            value,
            id,
            label: value,
        }))
    }

    _select(): HTMLDivElement {
        const wrapper = document.createElement('div')
        wrapper.className = 'form-floating'

        const select = document.createElement('select')
        this.setAttributes({
            name: this.data.name,
            class: 'form-select',
            id: this.data.id,
        }, select)

        this.optionPairs.forEach(([value, label]) => {
            const option = document.createElement('option')
            this.setAttributes({ value }, option)
            option.innerText = label
            select.appendChild(option)
        })

        wrapper.appendChild(select)

        const label = document.createElement('label')
        this.setAttributes({
            for: this.data.id,
        }, label)
        label.innerText = this.data.label

        wrapper.appendChild(label)

        return wrapper
    }

}


class Container extends Element {

    children: Array<Element>

    data: SerializedContainer
    constructor(data: SerializedContainer, options: UnserializeOptions) {
        super(data, options)
        this.data = data
        this.children = data.children
            .map(c => unserialize(c, { parent: this }))
            .filter(Boolean) as Array<Element>
    }

    get isBSRow() {
        // counter intuitively, a bootstrap row is laid out in columns
        return this.data.direction === 'column'
    }

    render(root:HTMLElement) {
        super.render(root)
        this.el!.className = cx(this.el?.className, {
            row: this.isBSRow, // a bootstrap row lays out in columns
            'd-flex flex-column': !this.isBSRow,
        })
        this.children.forEach(c => c.render(this.el!))
        return this
    }

}

// { parent }: { parent?: Container }
// const

const unserialize = (data: SerializedElement, options: UnserializeOptions = {}):Element => {
    if (isSerializedText(data)) {
        return new TextElement(data, options)
    }

    if (isSerializedContainer(data) || isSerializedForm(data)) {
        return new Container(data, options)
    }

    if (isSerializedInput(data)) {
        return new InputElement(data, options)
    }

    return new Element(data, options)
}


export const render = (root: HTMLElement, container: SerializedContainer) => {
    root.innerHTML = ''
    const form = unserialize(container)
    form.render(root)
}
