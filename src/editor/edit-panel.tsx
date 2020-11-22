import React, { useContext, createContext, FC, useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { TrashAlt } from '@styled-icons/fa-solid/TrashAlt'
import {
    useStoreContext, InputElement, Element, Container, isContainer, isInput, isText, TextElement,
} from './store'
import { useKeyPress } from '../hooks/use-key-press'

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
    label: string, input: InputElement, nested: string,
}> = ({ label, input, nested }) => {
    const sc = useStoreContext()
    const options = input.data[nested]
    if (!options) {
        return null
    }
    const addAttribute = () => sc.dispatch({ type: 'ADD_ATTRIBUTE', nested, input })
    const optionNames = Object.keys(options)
    return (
        <fieldset className='options'>
            <legend>{label}:</legend>
            <div className='controls'>
                <button onClick={addAttribute} className='add-attr'>
                    +
                </button>
            </div>
            {optionNames.length > 0 && (
                <div className="heading">
                    <span>ID</span>
                    <span>Value</span>
                </div>)}
            {optionNames.map(attrName => (
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

const InputEdit: FC<{ input: InputElement }> = ({ input }) => {
    const sc = useStoreContext()
    const { data } = input
    const dp = (patch: any) => sc.dispatch({ type: 'UPDATE', target: input, patch })

    return (
        <div>
            <h4 className="title">Edit {input.control.name}</h4>
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
            <label>
                <span>Class:</span>

                <input
                    className="value"
                    value={data.className || ''}
                    onChange={({ target: { value } }) => dp({ className: value })}
                />
            </label>

            <Options input={input} label="Options" nested="options" />

            <fieldset>
                <legend>Other Class Names:</legend>
                <label>
                    <span>Wrapper:</span>
                    <input
                        className="value"
                        value={data.classNames.wrapper || ''}
                        onChange={({ target: { value } }) => dp({ classNames: { wrapper: value } })
                        }
                    />
                </label>
                <label>
                    <span>Label:</span>
                    <input
                        className="value"
                        value={data.classNames.label || ''}
                        onChange={({ target: { value } }) => dp({ classNames: { label: value } })
                        }
                    />
                </label>
                <label>
                    <span>Input:</span>
                    <input
                        className="value"
                        value={data.classNames.input || ''}
                        onChange={({ target: { value } }) => dp({ classNames: { input: value } })
                        }
                    />
                </label>
            </fieldset>


            <Options input={input} label="Attributes" nested="attributes" />

        </div>
    )
}

const ContainerEdit: FC<{ container: Container }> = ({ container }) => {
    const sc = useStoreContext()
    const { data } = container
    const dp = (patch: any) => sc.dispatch({ type: 'UPDATE', target: container, patch })

    return (
        <div>
            <h4 className="title">Edit {container.control.name} container</h4>
            <label>
                <span>Class:</span>
                <input
                    className="value"
                    value={data.className || ''}
                    onChange={({ target: { value } }) => dp({ className: value })}
                />
            </label>

        </div>
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
        <div>
            <h4 className="title">Edit text</h4>
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
        </div>
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


const EditPanelEl = styled.div<{ editing: boolean }>(({ editing }) => ({
    position: 'absolute',
    height: '100%',
    width: '400px',
    background: 'white',
    right: editing ? '0' : '-420px',
    transition: 'right 0.3s ease-in-out',
    display: 'flex',
    boxShadow: '-5px 0px 5px 0px rgba(50, 50, 50, 0.75)',

    '.title': {
        margin: '15px 0',
        borderBottom: '1px solid lightgray',
        paddingBottom: '10px',
    },
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
}))

export const EditPanel = () => {
    const sc = useStoreContext()
    const [canFocus, setCanFocus] = useState(false)
    const panelRef = useRef<HTMLDivElement>(null)
    const { editing } = sc.store
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
    return (
        <CanFocusContext.Provider value={canFocus}>
            <EditPanelEl editing={!!editing}>
                <div ref={panelRef} className='edit-pane'>
                    {editing && <Edit target={editing} />}
                </div>
                <div className='footer'>
                    <button
                        className="btn btn-primary"
                        onClick={() => sc.dispatch({ type: 'HIDE_EDIT' })}
                    >
                        Done
                    </button>
                </div>
            </EditPanelEl>
        </CanFocusContext.Provider>
    )
}
