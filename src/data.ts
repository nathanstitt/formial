export type ChoicesLayoutTypes = 'vertical' | 'horizontal' | 'two_column' | 'three_column'

export interface SerializedElement {
    type: string
    id: string
    control: string
    className: string
    attributes?: {
        [value: string]: string
    }
}

export interface SerializedInputElement extends SerializedElement {
    type: string
    label: string
    name: string
    classNames: {
        wrapper: string
        label: string
        input: string
    }
    choicesLayout?: ChoicesLayoutTypes,
    options?: {
        [value: string]: string
    }
}

export interface SerializedTextElement extends SerializedElement {
    tag: string
    text: string
}

export type ElementSerialization =
    | SerializedForm
    | SerializedElement
    | SerializedContainer
    | SerializedTextElement
    | SerializedInputElement

export interface SerializedContainer extends SerializedElement {
    direction: string // 'row' | 'column'
    children: Array<ElementSerialization>
}

export interface SerializedForm extends SerializedContainer {

}

export function isSerializedInput(
    toBeDetermined: SerializedElement
): toBeDetermined is SerializedInputElement { return (toBeDetermined.type === 'INPUT') }

export function isSerializedContainer(
    toBeDetermined: SerializedElement
): toBeDetermined is SerializedContainer { return (toBeDetermined.type === 'CONTAINER') }

export function isSerializedText(
    toBeDetermined: SerializedElement
): toBeDetermined is SerializedTextElement { return (toBeDetermined.type === 'TEXT') }

export function isSerializedForm(
    toBeDetermined: any
): toBeDetermined is SerializedForm { return (toBeDetermined.type === 'FORM') }

