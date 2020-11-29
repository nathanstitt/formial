import React, { useContext, createContext, FC, useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { TrashAlt } from '@styled-icons/fa-solid/TrashAlt'
import { useOnClickOutside } from '../hooks/use-click-outside'
import {
    useStoreContext, InputElement, Element, Container, isContainer, isInput, isText, TextElement,
} from './store'
import { capitalize } from '../lib'
import { useKeyPress } from '../hooks/use-key-press'
import { Title, Scrolling, Values } from './components'

const CanFocusContext = createContext<boolean>(false)
CanFocusContext.displayName = 'FocusContext'


const NewAttribute: FC<{ input: InputElement; nested: string }> = ({
    input,
    nested,
}) => {
    const sc = useStoreContext()
    const canFocus = useContext(CanFocusContext)
    const inputRef = useRef<HTMLInputElement>(null)
    const saveValue = () => sc.dispatch({
        type: 'REPLACE_NEW_ATTRIBUTE', nested, input, name: inputRef.current!.value,
    })
    const deleteAttr = () => sc.dispatch({ type: 'DELETE_ATTRIBUTE', input, nested, name: '' })

    useKeyPress(['Enter', 'Escape'], (ev) => {
        switch (ev.key) {
            case 'Enter': {
                saveValue()
                break
            }
            case 'Escape': {
                deleteAttr()
                break
            }
        }
    }, { target: inputRef })

    useEffect(() => {
        if (canFocus) {
            inputRef.current!.focus()
        }
    }, [canFocus])

    return (
        <label>
            <input
                ref={inputRef}
                defaultValue=''
                onBlur={saveValue}
            />
            <span className="value" />
            <button onClick={deleteAttr} className='del-attr'>
                <TrashAlt />
            </button>
        </label>
    )
}


const EditAttribute: FC<{
    input: InputElement
    nested: string
    attributeName: string
}> = ({ input, nested, attributeName }) => {
    const sc = useStoreContext()
    const canFocus = useContext(CanFocusContext)
    const inputRef = useRef<HTMLInputElement>(null)
    useKeyPress(['Enter', 'Tab'], (ev) => {
        ev.preventDefault()
        sc.dispatch({ type: 'ADD_ATTRIBUTE', nested, input })
    }, { target: inputRef })
    useEffect(() => {
        const attrs = Object.keys(input.data[nested])
        if (canFocus && attributeName === attrs[attrs.length - 1]) {
            inputRef.current!.focus()
        }
    }, [canFocus])
    return (
        <label>
            <span>{attributeName}:</span>
            <input
                ref={inputRef}
                className="value"
                value={input.data[nested][attributeName] || ''}
                onChange={({ target: { value } }) => sc.dispatch({
                    type: 'UPDATE',
                    target: input,
                    patch: { [nested]: { [attributeName]: value } },
                })}
            />
            <button
                onClick={() => {
                    sc.dispatch({ type: 'DELETE_ATTRIBUTE', input, nested, name: attributeName })
                }}
                className='del-attr'
            >
                <TrashAlt />
            </button>
        </label>
    )
}

const Attribute: FC<{
    input: InputElement
    nested: string
    attributeName: string,
}> = ({ input, nested, attributeName }) => {
    if ('' === attributeName) {
        return <NewAttribute nested={nested} input={input} />
    }
    return <EditAttribute nested={nested} attributeName={attributeName} input={input} />
}

const Options: FC<{
    label: string,
    input: InputElement,
    nested: string,
    ignore?: Array<string>
}> = ({
    label,
    input,
    nested,
    ignore = [],
}) => {
    const sc = useStoreContext()
    const addAttribute = () => sc.dispatch({ type: 'ADD_ATTRIBUTE', nested, input })
    const options = input.data[nested]
    if (!options) {
        return null
    }
    const names = Object
        .keys(input.data[nested] || {})
        .filter(name => !ignore.includes(name))

    return (
        <fieldset className='options'>
            <legend>{label}:</legend>
            <div className='controls'>
                <button onClick={addAttribute} className='add-attr'>
                    ➕
                </button>
            </div>
            {names.length > 0 && (
                <div className="heading">
                    <span>ID</span>
                    <span>Value</span>
                </div>)}
            {names.map(attrName => (
                <Attribute
                    key={attrName}
                    nested={nested}
                    input={input}
                    attributeName={attrName}
                />
            ))}
        </fieldset>
    )
}

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
                checked={input.data.attributes?.required === 'true' || false}
                onChange={({ target: { checked } }) => {
                    sc.dispatch({
                        type: 'UPDATE',
                        target: input,
                        patch: { attributes: { required: String(checked) } },
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
                value={input.data.attributes?.type || 'text'}
                onChange={({ target: { value } }) => sc.dispatch({
                    type: 'UPDATE',
                    target: input,
                    patch: { attributes: { type: value } },
                })}
            >
                {['text', 'number', 'email', 'date'].map(
                    t => <option key={t} value={t}>{capitalize(t)}</option>,
                )}
            </select>
        </label>
    )
}


const OptionLayout: FC<{ input: InputElement }> = ({ input }) => {
    const sc = useStoreContext()
    if (!input.control.hasOptions) { return null }
    return (
        <label>
            <span>Choices Layout:</span>
            <select
                value={input.data.choicesLayout}
                onChange={({ target: { value } }) => sc.dispatch({
                    type: 'UPDATE',
                    target: input,
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
    const dp = (patch: any) => sc.dispatch({ type: 'UPDATE', target: input, patch })

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
                <Options input={input} label="Options" nested="options" />
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
                <Options
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
    const dp = (patch: any) => sc.dispatch({ type: 'UPDATE', target: container, patch })

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
    const dp = (patch: any) => sc.dispatch({ type: 'UPDATE', target: control, patch })

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


const Edit: FC<{ target: Element }> = ({ target }) => {
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
        marginBottom: '5px',
        '> *:first-child': {
            width: '125px',
        },
    },
    '.heading > *': {
        fontWeight: 'bold',
    },
    '.value': {
        minWidth: '150px',
        flex: 1,
    },
    button: {
        marginLeft: '1rem',
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

export const EditPanel = () => {
    const sc = useStoreContext()
    const [canFocus, setCanFocus] = useState(false)
    const panelRef = useRef<HTMLDivElement>(null)
    const { editing } = sc.store
    useOnClickOutside(panelRef, () => sc.dispatch({ type: 'HIDE_EDIT' }))
    useEffect(() => {
        if (!editing) {
            setCanFocus(false)
        }
        if (editing) {
            setTimeout(() => { // setTimeout to focus after animation completes
                if (panelRef.current) {
                    setCanFocus(true)
                    const firstInput = panelRef.current.querySelector('input,textarea')
                    if (firstInput) {
                        (firstInput as HTMLInputElement).focus()
                    }
                }
            }, 250)
        }
    }, [editing])

    if (!editing) {
        return null
    }

    return (
        <CanFocusContext.Provider value={canFocus}>
            <EditPanelEl ref={panelRef} className="edit-panel">

                {editing && <Edit target={editing} />}

            </EditPanelEl>
        </CanFocusContext.Provider>
    )
}
