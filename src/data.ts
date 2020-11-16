export interface SerializedSize {
    mobile: number
    tablet: number
    desktop: number
}

export interface SerializedElement {
    type: string
    id: string
    control: string
    className: string
    sizes: SerializedSize
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
    options?: {
        [value: string]: string
    }
}

export interface SerializedTextElement extends SerializedElement {
    tag: string
    text: string
}
//  id: string; type: string; control: string;   tag: string; text: string;

export interface SerializedContainer extends SerializedElement {
    direction: string // 'row' | 'column'
    children: Array<SerializedElement|SerializedContainer|SerializedInputElement|SerializedTextElement>
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
