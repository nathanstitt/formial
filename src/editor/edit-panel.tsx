import React, { FC, useRef } from 'react'
import styled from 'styled-components'
import { useOnClickOutside } from '../hooks/use-click-outside'
import {
    useStoreContext, useEditingElement,
} from './store'
import {
    InputElement, FormElement,
    Container, isContainer, isInput, isText, TextElement,
} from './models'
import { capitalize } from '../lib'
import { Title, Scrolling, Values } from './components'
import { InputOptions } from './input-options'

const REQUIRED_TYPES = ['input', 'textarea', 'radio']

const RequiredCheckmark: FC<{ input: InputElement }> = ({ input }) => {
    const sc = useStoreContext()
    if (!REQUIRED_TYPES.includes(input.control.id)) {
        return null
    }

    return (
        <label>
            <span>Required?</span>
            <input
                type="checkbox"
                className="value"
                checked={'true' === input.nested('attributes', 'required')?.value || false}
                onChange={({ target: { checked } }) => {
                    sc.dispatch({
                        type: 'UPSERT_OPTION',
                        inputId: input.id,
                        nested: 'attributes',
                        optionId: 'required',
                        value: String(checked),
                    })
                }}
            />
        </label>
    )
}

const InputType: FC<{ input: InputElement }> = ({ input }) => {
    const sc = useStoreContext()
    if (input.control.id !== 'input') {
        return null
    }
    return (
        <label>
            <span>Type:</span>
            <select
                name="type"
                className="value"
                value={input.nested('attributes', 'type')?.value || 'text'}
                onChange={({ target: { value } }) => sc.dispatch({
                    type: 'UPSERT_OPTION',
                    inputId: input.id,
                    optionId: 'type',
                    nested: 'attributes',
                    value,
                })}
            >
                {['text', 'number', 'email', 'tel', 'date'].map(
                    t => <option key={t} value={t}>{capitalize(t)}</option>,
                )}
            </select>
        </label>
    )
}


const OptionLayout: FC<{ input: InputElement }> = ({ input }) => {
    const sc = useStoreContext()
    if (!input.data.choicesLayout) { return null }
    return (
        <label>
            <span>Choices Layout:</span>
            <select
                value={input.data.choicesLayout}
                className="value"
                onChange={({ target: { value } }) => sc.dispatch({
                    type: 'UPDATE_ELEMENT',
                    elementId: input.id,
                    patch: { choicesLayout: value },
                })}
            >
                <option value="vertical">Vertical</option>
                <option value="horizontal">Horizontal</option>
                <option value="two_column">Two Column</option>
                <option value="three_column">Three Column</option>
            </select>
        </label>
    )
}

const InputEdit: FC<{ input: InputElement }> = ({ input }) => {
    const sc = useStoreContext()
    const { data } = input
    const dp = (patch: any) => sc.dispatch({ type: 'UPDATE_ELEMENT', elementId: input.id, patch })

    return (
        <Values className="input">
            <Title>Edit {input.control.name}</Title>
            <Scrolling>
                <label>
                    <span>Label:</span>
                    <input
                        className="value"
                        value={data.label || ''}
                        onChange={({ target: { value } }) => dp({ label: value })}
                    />
                </label>
                <label>
                    <span>Name:</span>
                    <input
                        className="value"
                        value={data.name || ''}
                        onChange={({ target: { value } }) => dp({ name: value })}
                    />
                </label>
                <InputType input={input} />
                <RequiredCheckmark input={input} />
                <label>
                    <span>Class:</span>

                    <input
                        className="value"
                        value={data.className || ''}
                        onChange={({ target: { value } }) => dp({ className: value })}
                    />
                </label>
                <OptionLayout input={input} />
                <InputOptions input={input} label="Options" nested="options" />
                <fieldset>
                    <legend>Other Class Names:</legend>
                    <label>
                        <span>Wrapper:</span>
                        <input
                            className="value"
                            value={data.classNames.wrapper || ''}
                            onChange={({ target: { value } }) => {
                                dp({ classNames: { wrapper: value } })
                            }}
                        />
                    </label>
                    <label>
                        <span>Label:</span>
                        <input
                            className="value"
                            value={data.classNames.label || ''}
                            onChange={({ target: { value } }) => {
                                dp({ classNames: { label: value } })
                            }}
                        />
                    </label>
                    <label>
                        <span>Input:</span>
                        <input
                            className="value"
                            value={data.classNames.input || ''}
                            onChange={({ target: { value } }) => {
                                dp({ classNames: { input: value } })
                            }}
                        />
                    </label>
                </fieldset>
                <InputOptions
                    input={input}
                    label="Attributes"
                    nested="attributes"
                    ignore={['required', 'type']}
                />
            </Scrolling>
        </Values>
    )
}

const ContainerEdit: FC<{ container: Container }> = ({ container }) => {
    const sc = useStoreContext()
    const { data } = container
    const dp = (patch: any) => sc.dispatch({ type: 'UPDATE_ELEMENT', elementId: container.id, patch })

    return (
        <Values className="container">
            <Title>Edit {container.control.name} container</Title>
            <label>
                <span>Class:</span>
                <input
                    className="value"
                    value={data.className || ''}
                    onChange={({ target: { value } }) => dp({ className: value })}
                />
            </label>

        </Values>
    )
}

const TextHeadingSize: FC<{
    txt: TextElement
    onChange: (value: string) => void
}> = ({ txt, onChange }) => {
    if (txt.control.id !== 'heading') {
        return null
    }
    return (
        <label>
            <span>Size:</span>
            <select value={txt.data.tag} onChange={ev => onChange(ev.target.value)}>
                <option value="h1">Heading 1</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
                <option value="h4">Heading 4</option>
                <option value="h5">Heading 5</option>
                <option value="h6">Heading 6</option>
            </select>
        </label>
    )
}

const TextEdit: FC<{ control: TextElement }> = ({ control }) => {
    const sc = useStoreContext()
    const { data } = control
    const dp = (patch: any) => sc.dispatch({ type: 'UPDATE_ELEMENT', elementId: control.id, patch })

    return (
        <Values className="text">
            <Title>Edit text</Title>
            <label>
                <span>Text:</span>

                <textarea
                    id={control.id}
                    value={data.text || ''}
                    onChange={({ target: { value } }) => dp({ text: value })}
                />
            </label>
            <TextHeadingSize
                txt={control}
                onChange={(tag:string) => dp({ tag })}

            />
            <label>
                <span>Class:</span>

                <input
                    className="value"
                    value={data.className || ''}
                    onChange={({ target: { value } }) => dp({ className: value })}
                />
            </label>
        </Values>
    )
}


const Edit: FC<{ target: FormElement }> = ({ target }) => {
    if (isContainer(target)) {
        return <ContainerEdit container={target} />
    }
    if (isInput(target)) {
        return <InputEdit input={target} />
    }
    if (isText(target)) {
        return <TextEdit control={target} />
    }
    return null
}


const EditPanelEl = styled.div({
    height: '100%',
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',

    '.edit-pane': {
        flex: 1,
        overflowY: 'auto',
        padding: '10px',
    },
    '.footer': {
        padding: '10px',
        display: 'flex',
        justifyContent: 'flex-end',
        borderTop: '1px solid lightGrey',
    },
    legend: {
        backgroundColor: '#000',
        color: '#fff',
        padding: '3px 6px',
        fontSize: '16px',
    },
    'label, .heading': {
        display: 'flex',
        alignItems: 'center',
        '&:not(.draggable)': {
            marginBottom: '5px',
        },
        '> *:first-child': {
            width: '125px',
        },
    },
    '.heading > *': {
        fontWeight: 'bold',
    },
    '.value': {
        flex: 1,
        width: '125px',
    },
    button: {
        marginLeft: '5px',
        svg: {
            height: '18px',
        },
    },
    fieldset: {
        marginTop: '1rem',
        '.controls': {
            display: 'flex',

            justifyContent: 'flex-end',
            '.add-attr': {
                border: 0,
                padding: '0 5px',
            },
        },
    },
    textarea: {
        width: '100%',
        minHeight: '50px',
        padding: '4px',
    },
    '.widths': {
        '.row': {
            display: 'flex',
            justifyContent: 'space-between',
            span: {
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
                marginRight: '10px',
                width: 'inherit',
            },
        },
    },
})

export const EditPanel:FC = () => {
    const editing = useEditingElement()
    const sc = useStoreContext()
    const panelRef = useRef<HTMLDivElement>(null)

    useOnClickOutside(panelRef, () => {
        sc.dispatch({ type: 'HIDE_EDIT' })
    })

    if (!editing) {
        return null
    }

    return (
        <EditPanelEl ref={panelRef} className="edit-panel">
            <Edit target={editing} />
        </EditPanelEl>
    )
}
