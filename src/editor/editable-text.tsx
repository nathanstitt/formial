import React, { useState, useEffect, useRef, useCallback } from 'react'
import cn from 'classnames'
import { useKeyPress } from '../hooks/use-key-press'

interface EditableTextProps {
    className?: string
    children: React.ReactNode
    textValue: string
    onTextSaved(text: string): void
}

interface EditingState {
    position: number
}

// mostly take from joelmturner.com/blog/inline-text-edit-react-hooks
// but sets cursor position to match click position
export const EditableText:React.FC<EditableTextProps> = (props) => {
    const { onTextSaved, textValue, children } = props

    const [isInputActive, setIsInputActive] = useState<boolean | EditingState>(
        false,
    )
    const [inputValue, setInputValue] = useState(textValue)

    const wrapperRef = useRef<HTMLSpanElement>(null)
    const textRef = useRef(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const onUpdated = ():void => {
        if (inputRef.current && inputRef.current.value !== textValue) {
            onTextSaved(inputRef.current.value)
        }
        setIsInputActive(false)
    }
    const onClear = ():void => {
        setInputValue(textValue)
        setIsInputActive(false)
    }
    useKeyPress(['Enter', 'Escape'], (ev) => {
        switch (ev.key) {
            case 'Enter': {
                onUpdated()
                break
            }
            case 'Escape': {
                onClear()
                break
            }
        }
    }, { target: inputRef })

    useEffect(() => {
        if (isInputActive !== false) {
            const edit = isInputActive as EditingState
            const input = inputRef.current!
            input.focus()
            input.setSelectionRange(edit.position, edit.position)
        }
    }, [isInputActive])

    const onBlur = useCallback(() => {
        onUpdated()
    }, [])

    const handleInputChange = useCallback(
        event => setInputValue(event.target.value),
        [setInputValue],
    )

    const handleSpanClick = useCallback(() => {
        const s = window.getSelection()
        if (!s) {
            return
        }
        const range = s.getRangeAt(0)
        setIsInputActive({
            position: range.startOffset,
        })
    }, [setIsInputActive])
    return (
        <span className={cn('inline-text', props.className)} ref={wrapperRef}>
            <span
                ref={textRef}
                onClick={handleSpanClick}
                style={{ display: isInputActive ? 'none' : 'inline' }}
                className='inline-text display'
            >
                {children}
            </span>
            <input
                ref={inputRef}
                style={{

                    display: isInputActive ? 'inline' : 'none',
                }}
                size={Math.round(inputValue.length * 1.1)}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={onBlur}
                className='inline-text editing'
            />
        </span>
    )
}
