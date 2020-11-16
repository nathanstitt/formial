import {
    isSerializedText,
    isSerializedContainer,
    isSerializedInput,
    SerializedElement,
    SerializedContainer,
    SerializedTextElement,
    SerializedInputElement
} from './data'

import cx from 'classnames'

class Element {
    data: SerializedElement

    constructor(data: SerializedElement) {
        this.data = data
    }
    el?:HTMLElement

    createElement():HTMLElement {
        return document.createElement('div')
    }

    render(root:HTMLElement, skipAttributes:boolean = false){
        if (!this.el) {
            this.el = this.createElement()
        }
        this.setAttributes({
            'data-type': this.data.type,
            'data-id': this.data.id,
            'class': cx(this.data.className, this.sizeClassNames),
        })

        if (!skipAttributes) {
            this.setAttributes()
        }

        if (this.el.parentElement != root) {
            root.appendChild(this.el)
        }
        return this
    }

    get sizeClassNames() {
        if (!this.data) {
            console.log("NO DATA", this)
        }
        const sz = this.data.sizes || {}

        return cx({
            [`col-sm-${sz.mobile}`]: sz.mobile,
            [`col-md-${sz.tablet}`]: sz.tablet,
            [`col-lg-${sz.desktop}`]: sz.desktop,
        })
    }

    setAttributes(
        attrs = this.data.attributes,
        el:HTMLElement|undefined = this.el,
    ) {
        if (!el || !attrs) {
            return
        }
        Object.keys(attrs).forEach((k) => {
            el.setAttribute(k, String(attrs[k]))
        })
    }

}

// interface AttrsT { [key: string]: string | number }

// const setAttributes = (el:HTMLElement, attrs:AttrsT = {}) => {
//     Object.keys(attrs).forEach((k) => {
//         el.setAttribute(k, String(attrs[k]))
//     })
// }

class TextElement extends Element {

    data: SerializedTextElement

    constructor(data: SerializedTextElement) {
        super(data)
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

    constructor(data: SerializedInputElement) {
        super(data)
        this.data = data
    }

    render(root:HTMLElement){
        super.render(root, true)


        this.setAttributes({
            class: cx(this.data.classNames.wrapper, this.sizeClassNames),
        })

        if (!this.label) {
            this.label = document.createElement('label')
            this.el!.appendChild(this.label)
        }
        this.label.className = this.data.classNames.label
        this.label.innerText = this.data.label
        this.label.setAttribute('for', this.data.id)

        if (!this.input) {
            const renderer = this[`_${this.data.control}`]
            if (renderer) {
                const input =  renderer.apply(this)
                this.input = input as HTMLElement
                this.input.className = this.data.classNames.input
                this.input.id = this.data.id
                this.el!.appendChild(this.input)
            } else {
                console.warn(`Can't render input type ${this.data.control}`)
            }
        }


        if (this.data.options) {

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
        const input = document.createElement(tag)
        this.setAttributes(this.data.attributes, input)
        this.setAttributes({
            name: this.data.name,
            class: this.data.classNames.input,
        }, input)
        return input
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
        this.optionPairs.forEach(([optId, optValue]) => {
            const { id, inputType, name, value, label } = cb(optId, optValue)
            const option = document.createElement('input')
            this.setAttributes({
                'data-id': id, type: inputType, name, value
            }, option)
            const labelEl = document.createElement('label')
            labelEl.appendChild(option)
            const txt = document.createElement('span')
            txt.innerText = label
            labelEl.appendChild(txt)
            wrapper.appendChild(labelEl)
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

    _select(): HTMLSelectElement {
        const input = document.createElement('select')
        input.setAttribute('name', this.data.name)
        this.optionPairs.forEach(([value, label]) => {
            const option = document.createElement('option')
            this.setAttributes({ value }, option)
            option.innerText = label
            input.appendChild(option)
        })
        return input
    }
}


class Container extends Element {
    children: Array<Element>

    data: SerializedContainer
    constructor(data: SerializedContainer) {
        super(data)
        this.data = data
        this.children = data.children.map(c => unserialize(c)).filter(Boolean) as Array<Element>
    }

    render(root:HTMLElement){
        super.render(root)
        this.el!.className = cx(this.el?.className, this.data.direction)
        this.children.forEach(c => c.render(this.el!))
        return this
    }

}


const unserialize = (data: SerializedElement):Element => {

    if (isSerializedText(data)) {
        return new TextElement(data)
    }

    if (isSerializedContainer(data)) {
        return new Container(data)
    }

    if (isSerializedInput(data)) {
        return new InputElement(data)
    }

    return new Element(data)
}


export const render = (root: HTMLElement, container: SerializedContainer) => {
    const form = unserialize(container)
    form.render(root)
}
