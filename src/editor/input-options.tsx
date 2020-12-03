import React, { FC, useState, useRef, useEffect } from 'react'
import { TrashAlt } from '@styled-icons/fa-solid/TrashAlt'
import styled from 'styled-components'
import cn from 'classnames'
import { useDrop, useDrag } from 'react-dnd'
import { SerializedOption } from '../data'
import { DropRevealColor } from './components'
import { useKeyPress } from '../hooks/use-key-press'
import {
    NestedType, useStoreContext, InputElement,
} from './store'

interface DropProps {
    input: InputElement
    index: number
    nested: NestedType
}

interface DropItem {
    id: string
}

const DeleteBtn = styled.button({
    border: 0,
})

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
        inputRef.current!.focus()
    }, [])

    return (
        <label>
            <input
                ref={inputRef}
                defaultValue=''
            />
            <span className="value" />
            <DeleteBtn onClick={deleteAttr}>
                <TrashAlt />
            </DeleteBtn>
        </label>
    )
}

const NEW = Symbol('new')
const DELETE = Symbol('delete')

const OptionEl = styled.label({
    padding: '2px 0 2px 5px',
})

const OptionLabel = styled.div({
    flex: 1,
    cursor: 'grab',
})

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
        item: { id: option.id, index, type: 'option' },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    })
    useKeyPress(['Enter', 'Tab'], (ev) => {
        ev.preventDefault()
        sc.dispatch({ type: 'UPDATE_OPTION', option, value: inputRef.current!.value })
        onComplete(option.id)
    }, { target: inputRef })

    useEffect(() => {
        if (focused) {
            inputRef.current!.focus()
        }
    }, [focused])
    return (
        <OptionEl
            className="draggable"
            style={{ opacity }}
            ref={drag}
        >
            <OptionLabel>{option.id}:</OptionLabel>
            <input
                ref={inputRef}
                className="value"
                value={option.value || ''}
                onChange={({ target: { value } }) => sc.dispatch({
                    type: 'UPDATE_OPTION', option, value,
                })}
            />
            <DeleteBtn
                onClick={() => {
                    sc.dispatch({ type: 'DELETE_OPTION', id: option.id, input, nested })
                    onComplete(DELETE)
                }}
            >
                <TrashAlt />
            </DeleteBtn>
        </OptionEl>
    )
}

const DropEl = styled.div({
    transition: 'all 0.3s ease-in-out',
    height: '10px',
    minHeight: '10px',
    '&.isHovered': {
        height: '40px',
        minHeight: '40px',
        border: `1px dashed ${DropRevealColor}`,
    },
    '&:last-child': {
        flex: 1,
    },
})


export const Drop: React.FC<DropProps> = ({ input, nested, index }) => {
    const sc = useStoreContext()
    const [{ isHovered }, dropRef] = useDrop({
        accept: 'option',
        collect(item) {
            return { isHovered: item.isOver() }
        },
        drop: (item) => {
            const { id } = (item as any as DropItem)
            sc.dispatch({ type: 'REORDER_OPTION', nested, input, id, index })
        },
    })
    return <DropEl ref={dropRef} className={cn('drop', { isHovered })} />
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
                <React.Fragment key={option.id}>
                    <Drop input={input} nested={nested} index={i} />
                    <Option
                        focused={editingOption === option.id}
                        nested={nested}
                        option={option}
                        input={input}
                        index={i}
                        onComplete={(id) => {
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
