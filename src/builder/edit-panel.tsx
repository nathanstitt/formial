import * as React from 'react'
import styled from 'styled-components'
import { TrashAlt } from '@styled-icons/fa-solid/TrashAlt'
import {
    useStoreContext, Input, Element, Container, isContainer, isInput,
} from './store'
import { useKeyPress } from '../hooks/use-key-press'


const Width:React.FC<{
    el: Element,
    size: string,
}> = ({ el, size }) => {
    const sc = useStoreContext()
    const inputRef = React.useRef<HTMLInputElement>(null)

    return (
        <label>
            <span>{size}:</span>
            <input
                ref={inputRef}
                type="number"
                min="1"
                max="12"
                value={el.data.sizes[size] || 12}
                onChange={({ target: { value } }) => sc.dispatch({
                    type: 'UPDATE',
                    target: el,
                    patch: { sizes: { [size]: Math.max(1, Math.min(12, Number(value))) } },
                })}
            />
        </label>
    )
}

const Sizes:React.FC<{
    el: Element,
}> = ({ el }) => {
    if (isContainer(el) && el.type === 'row') {
        return null
    }
    return (
        <fieldset className="widths">
            <legend>Widths (1-12):</legend>
            <Width size="mobile" el={el} />
            <Width size="tablet" el={el} />
            <Width size="desktop" el={el} />
        </fieldset>
    )
}

const NewAttribute: React.FC<{ input: Input; nested: string }> = ({
    input,
    nested,
}) => {
    const sc = useStoreContext()
    const inputRef = React.useRef<HTMLInputElement>(null)
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
    input: Input
    nested: string
    attributeName: string
}> = ({ input, nested, attributeName }) => {
    const sc = useStoreContext()
    const inputRef = React.useRef<HTMLInputElement>(null)
    useKeyPress(['Enter', 'Tab'], (ev) => {
        ev.preventDefault()
        sc.dispatch({ type: 'ADD_ATTRIBUTE', nested, input })
    }, { target: inputRef })
    React.useEffect(() => {
        const attrs = Object.keys(input.data[nested])
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

const Attribute: React.FC<{
    input: Input
    nested: string
    attributeName: string,
}> = ({ input, nested, attributeName }) => {
    if ('' === attributeName) {
        return <NewAttribute nested={nested} input={input} />
    }
    return <EditAttribute nested={nested} attributeName={attributeName} input={input} />
}


const Options: React.FC<{
    label: string, input: Input, nested: string,
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

const InputEdit: React.FC<{ input: Input }> = ({ input }) => {
    const sc = useStoreContext()
    const { data } = input
    const dp = (patch: any) => sc.dispatch({ type: 'UPDATE', target: input, patch })

    return (
        <div>
            <h4>Edit {input.control.name}</h4>
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
            <Sizes el={input} />
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
                    <span>Input:</span>
                    <input
                        className="value"
                        value={data.classNames.input || ''}
                        onChange={({ target: { value } }) => dp({ classNames: { input: value } })
                        }
                    />
                </label>
            </fieldset>

            <Options input={input} label="Options" nested="options" />
            <Options input={input} label="Attributes" nested="attributes" />

        </div>
    )
}

const ContainerEdit: React.FC<{ container: Container }> = ({ container }) => {
    const sc = useStoreContext()
    const { data } = container
    const dp = (patch: any) => sc.dispatch({ type: 'UPDATE', target: container, patch })

    return (
        <div>
            <label>
                <span>Class:</span>
                <input
                    className="value"
                    value={data.className || ''}
                    onChange={({ target: { value } }) => dp({ className: value })}
                />
            </label>
            <Sizes el={container} />
        </div>
    )
}


const Edit: React.FC<{ target: Element }> = ({ target }) => {
    if (isContainer(target)) {
        return <ContainerEdit container={target} />
    }
    if (isInput(target)) {
        return <InputEdit input={target} />
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
    '.widths': {
        span: {
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            marginRight: '10px',
        },
    },

}))

export const EditPanel = () => {
    const sc = useStoreContext()
    const { editing } = sc.store
    return (
        <EditPanelEl editing={!!editing}>
            <div className='edit-pane'>
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
    )
}
