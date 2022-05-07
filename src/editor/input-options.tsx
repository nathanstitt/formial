import React, { FC, useRef, useEffect, useState } from 'react'
import { TrashAlt } from './icons'
import cn from 'classnames'
import { useDrop, useDrag } from 'react-dnd'
import { SerializedOption } from '../data'
import { useKeyPress } from '../hooks/use-key-press'
import { NestedType, InputElement } from './models'
import { useStoreContext } from './store'


const NEW = Symbol('new')
const DELETE = Symbol('delete')

interface DropProps {
    input: InputElement
    index: number
    nested: NestedType
}

interface DropItem {
    id: string
}


interface OptionProps {
    input: InputElement
    nested: NestedType
    onComplete: (id: string | typeof DELETE) => void
}

const NewOption: FC<OptionProps> = ({
    input,
    nested,
    onComplete,
}) => {
    const sc = useStoreContext()

    const inputRef = useRef<HTMLInputElement>(null)
    const saveValue = ():void => {
        const id = inputRef.current?.value
        if (id) {
            sc.dispatch({ type: 'UPSERT_OPTION', nested, inputId: input.id, optionId: id })
            onComplete(id)
        }
    }

    const deleteAttr = ():void => {
        sc.dispatch({ type: 'DELETE_OPTION', inputId: input.id, nested, id: '' })
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
        inputRef.current?.focus()
    }, [])

    return (
        <label>
            <input
                ref={inputRef}
                defaultValue=''
            />
            <span className="value" />
            <button className="delete-btn" onClick={deleteAttr}>
                <TrashAlt />
            </button>
        </label>
    )
}

const Option:FC<{
    input: InputElement
    nested: NestedType
    index: number
    focused: boolean
    option: SerializedOption,
    onComplete: (id: string | typeof NEW | typeof DELETE) => void
}> = ({ input, nested, focused, index, onComplete, option }) => {
    const sc = useStoreContext()
    const inputRef = useRef<HTMLInputElement>(null)
    const [{ opacity }, drag] = useDrag({
        type: 'control',
        item: { id: option.id, index, type: 'option' },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    })
    const updateOption = ():void => {
        sc.dispatch({
            type: 'UPSERT_OPTION', inputId: input.id, nested, optionId: option.id, value: inputRef.current?.value,
        })
    }
    useKeyPress(['Enter', 'Tab'], (ev) => {
        ev.preventDefault()
        updateOption()
        onComplete(option.id)
    }, { target: inputRef })

    useEffect(() => {
        if (focused) {
            inputRef.current?.focus()
        }
    }, [focused])
    return (
        <label
            className="input-option-label draggable"
            style={{ opacity }}
            ref={drag}
        >
            <div className="label">{option.id}:</div>
            <input
                ref={inputRef}
                className="value"
                value={option.value || ''}
                onChange={updateOption}
            />
            <button
                className="delete-btn"
                onClick={():void => {
                    sc.dispatch({ type: 'DELETE_OPTION', id: option.id, inputId: input.id, nested })
                    onComplete(DELETE)
                }}
            >
                <TrashAlt />
            </button>
        </label>
    )
}


export const Drop: React.FC<DropProps> = ({ input, nested, index }) => {
    const sc = useStoreContext()
    const [{ isHovered }, dropRef] = useDrop({
        accept: 'option',
        collect(item) {
            return { isHovered: item.isOver() }
        },
        drop: (item) => {
            const { id } = (item as any as DropItem)
            sc.dispatch({ type: 'REORDER_OPTION', nested, inputId: input.id, optionId: id, index })
        },
    })
    return <div ref={dropRef} className={cn('drop', 'drop-target', { 'is-hovered': isHovered })} />
}


export const InputOptions: FC<{
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
    let options = input.data[nested]
    if (!options) {
        return null
    }
    options = options.filter(opt => !ignore.includes(opt.id))

    return (
        <fieldset className='options'>
            <legend>{label}:</legend>
            <div className='controls'>
                <button onClick={():void => setEditing(NEW)} className='add-attr'>
                    ➕
                </button>
            </div>
            {options.length ? (
                <div className="heading">
                    <span>ID</span>
                    <span>Value</span>
                </div>) : null}
            {options.map((option, i) => (
                <React.Fragment key={option.id}>
                    <Drop input={input} nested={nested} index={i} />
                    <Option
                        focused={editingOption === option.id}
                        nested={nested}
                        option={option}
                        input={input}
                        index={i}
                        onComplete={(id):void => {
                            if (id === DELETE) {
                                setEditing('')
                            } else if (i === options.length - 1) {
                                setEditing(NEW)
                            }
                        }}
                    />
                </React.Fragment>
            ))}
            <Drop input={input} nested={nested} index={options.length} />
            {editingOption === NEW && (
                <NewOption
                    nested={nested}
                    input={input}
                    onComplete={(id):void => {
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
