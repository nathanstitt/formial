import React, { useContext, createContext, FC, useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { TrashAlt } from '@styled-icons/fa-solid/TrashAlt'
import { useOnClickOutside } from '../hooks/use-click-outside'
import { SerializedOption } from '../data'
import {
    NestedType, useStoreContext, InputElement, Element,
    Container, isContainer, isInput, isText, TextElement,
} from './store'
import { capitalize } from '../lib'
import { useKeyPress } from '../hooks/use-key-press'
import { Title, Scrolling, Values } from './components'

const CanFocusContext = createContext<boolean>(false)
CanFocusContext.displayName = 'FocusContext'


const NewOption: FC<{
    input: InputElement
    nested: NestedType
    onComplete: (id: string | typeof DELETE) => void
}> = ({
    input,
    nested,
    onComplete,
}) => {
    const sc = useStoreContext()
    const canFocus = useContext(CanFocusContext)
    const inputRef = useRef<HTMLInputElement>(null)
    const saveValue = () => {
        const id = inputRef.current!.value
        sc.dispatch({ type: 'UPSERT_OPTION', nested, input, id })
        onComplete(id)
    }

    const deleteAttr = () => {
        sc.dispatch({ type: 'DELETE_OPTION', input, nested, id: '' })
        onComplete(DELETE)
    }

    useKeyPress(['Enter', 'Escape', 'Tab'], (ev) => {
        switch (ev.key) {
            case 'Tab': {
                ev.preventDefault()
                saveValue()
                break
            }
            case 'Enter': {
                saveValue()
                break
            }
            case 'Escape': {
                deleteAttr()
                onComplete(DELETE)
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
            />
            <span className="value" />
            <button onClick={deleteAttr} className='del-attr'>
                <TrashAlt />
            </button>
        </label>
    )
}

const NEW = Symbol('new')
const DELETE = Symbol('delete')

const EditOption:FC<{
    input: InputElement
    nested: NestedType
    focused: boolean
    option: SerializedOption,
    onComplete: (id: string | typeof NEW | typeof DELETE) => void
}> = ({ input, nested, focused, onComplete, option }) => {
    const sc = useStoreContext()
    const canFocus = useContext(CanFocusContext)
    const inputRef = useRef<HTMLInputElement>(null)

    useKeyPress(['Enter', 'Tab'], (ev) => {
        ev.preventDefault()
        sc.dispatch({ type: 'UPDATE_OPTION', option, value: inputRef.current!.value })
        onComplete(option.id)
    }, { target: inputRef })

    useEffect(() => {
        if (canFocus && focused) {
            inputRef.current!.focus()
        }
    }, [canFocus, focused])
    return (
        <label>
            <span>{option.id}:</span>
            <input
                ref={inputRef}
                className="value"
                value={option.value || ''}
                onChange={({ target: { value } }) => sc.dispatch({
                    type: 'UPDATE_OPTION', option, value,
                })}
            />
            <button
                onClick={() => {
                    sc.dispatch({ type: 'DELETE_OPTION', id: option.id, input, nested })
                    onComplete(DELETE)
                }}
                className='del-attr'
            >
                <TrashAlt />
            </button>
        </label>
    )
}


const Options: FC<{
    label: string
    input: InputElement
    nested: NestedType
    ignore?: Array<string>
}> = ({
    label,
    input,
    nested,
    ignore = [],
}) => {
    const [editingOption, setEditing] = useState<string | typeof NEW>('')

    // const [Option, setAdding] = useState(false)
    // const addAttribute = () => sc.dispatch({ type: 'ADD_ATTRIBUTE', nested, input })
    let options = input.data[nested]
    if (!options) {
        return null
    }
    options = options.filter(opt => !ignore.includes(opt.id))

    return (
        <fieldset className='options'>
            <legend>{label}:</legend>
            <div className='controls'>
                <button onClick={() => setEditing(NEW)} className='add-attr'>
                    ➕
                </button>
            </div>
            {options.length ? (
                <div className="heading">
                    <span>ID</span>
                    <span>Value</span>
                </div>) : null}
            {options.map((option, i) => (
                <EditOption
                    key={i}
                    focused={editingOption === option.id}
                    nested={nested}
                    option={option}
                    input={input}
                    onComplete={(id) => {
                        if (id === DELETE) {
                            setEditing('')
                        } else if (i === options.length - 1) {
                            setEditing(NEW)
                        }
                    }}
                />
            ))}
            {editingOption === NEW && (
                <NewOption
                    nested={nested}
                    input={input}
                    onComplete={(id) => {
                        if (id === DELETE) {
                            setEditing('')
                        } else {
                            setEditing(id)
                        }
                    }}
                />)}
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
                checked={input.nested('attributes', 'required')?.value === 'true' || false}
                onChange={({ target: { checked } }) => {
                    sc.dispatch({ type: 'UPSERT_OPTION', input, nested: 'attributes', id: 'required', value: String(checked) })
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
                    input,
                    id: 'type',
                    nested: 'attributes',
                    value,
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
    if (!input.data.choicesLayout) { return null }
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
