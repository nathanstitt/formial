import * as React from 'react'
import styled from 'styled-components'
import { TrashAlt } from '@styled-icons/fa-solid/TrashAlt'
import { useStoreContext, Element } from './store'
import { useKeyPress } from '../hooks/use-key-press'

const NewAttribute: React.FC<{ element: Element; nested: string }> = ({
    element,
    nested,
}) => {
    const sc = useStoreContext()
    const inputRef = React.useRef<HTMLInputElement>(null)
    const saveValue = () => sc.dispatch({
        type: 'REPLACE_NEW_ATTRIBUTE', nested, element, name: inputRef.current!.value,
    })
    const deleteAttr = () => sc.dispatch({ type: 'DELETE_ATTRIBUTE', element, nested, name: '' })

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

    React.useEffect(() => {
        inputRef.current!.focus()
    }, [])

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


const EditAttribute: React.FC<{
    element: Element
    nested: string
    attributeName: string
}> = ({ element, nested, attributeName }) => {
    const sc = useStoreContext()
    const inputRef = React.useRef<HTMLInputElement>(null)
    useKeyPress(['Enter', 'Tab'], (ev) => {
        ev.preventDefault()
        sc.dispatch({ type: 'ADD_ATTRIBUTE', nested, element })
    }, { target: inputRef })
    React.useEffect(() => {
        const attrs = Object.keys(element.data[nested])
        if (attributeName === attrs[attrs.length - 1]) {
            inputRef.current!.focus()
        }
    }, [])
    return (
        <label>
            <span>{attributeName}:</span>
            <input
                ref={inputRef}
                className="value"
                value={element.data[nested][attributeName] || ''}
                onChange={({ target: { value } }) => sc.dispatch({
                    type: 'UPDATE_ELEMENT',
                    element,
                    patch: { [nested]: { [attributeName]: value } },
                })}
            />
            <button
                onClick={() => {
                    sc.dispatch({ type: 'DELETE_ATTRIBUTE', element, nested, name: attributeName })
                }}
                className='del-attr'
            >
                <TrashAlt />
            </button>
        </label>
    )
}

const Attribute: React.FC<{
    element: Element
    nested: string
    attributeName: string,
}> = ({ element, nested, attributeName }) => {
    if ('' === attributeName) {
        return <NewAttribute nested={nested} element={element} />
    }
    return <EditAttribute nested={nested} attributeName={attributeName} element={element} />
}


const Options: React.FC<{
    label: string, element: Element, nested: string
}> = ({ label, element, nested }) => {
    const sc = useStoreContext()
    const options = element.data[nested]
    if (!options) {
        return null
    }
    const addAttribute = () => sc.dispatch({ type: 'ADD_ATTRIBUTE', nested, element })
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
                    element={element}
                    attributeName={attrName}
                />
            ))}
        </fieldset>
    )
}

const Edit: React.FC<{ element: Element }> = ({ element }) => {
    const sc = useStoreContext()
    const { data } = element
    const dp = (patch: any) => sc.dispatch({ type: 'UPDATE_ELEMENT', element, patch })

    return (
        <div>
            <h4>Edit {element.control.name}</h4>
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
            <fieldset>
                <legend>Class Names:</legend>
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
                    <span>Element:</span>
                    <input
                        className="value"
                        value={data.classNames.element || ''}
                        onChange={({ target: { value } }) => dp({ classNames: { element: value } })
                        }
                    />
                </label>
            </fieldset>

            <Options element={element} label="Options" nested="options" />
            <Options element={element} label="Attributes" nested="attributes" />

        </div>
    )
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
    },
    'label, .heading': {
        display: 'flex',
        marginBottom: '5px',
        '> *:first-child': {
            width: '125px',
        },
        // '> *:last-child': {
        //     flex: 1,
        // },
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
                margin: '-10px -5px 10px 0',
            },
        },
    },
}))

export const EditPanel = () => {
    const sc = useStoreContext()
    const { editing } = sc.store
    return (
        <EditPanelEl editing={!!editing}>
            <div className='edit-pane'>
                {editing && <Edit element={editing} />}
            </div>
            <div className='footer'>
                <button
                    className="btn btn-primary"
                    onClick={() => sc.dispatch({ type: 'HIDE_ELEMENT_EDIT' })}
                >
                    Done
                </button>
            </div>
        </EditPanelEl>
    )
}
