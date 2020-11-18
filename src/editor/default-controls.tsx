import * as React from 'react'
import { CaretSquareDown } from '@styled-icons/fa-regular/CaretSquareDown'
import { Font } from '@styled-icons/fa-solid/Font'
import { GripLines } from '@styled-icons/fa-solid/GripLines'
import { Square } from '@styled-icons/fa-regular/Square'
import { Heading } from '@styled-icons/fa-solid/Heading'
import { Paragraph } from '@styled-icons/fa-solid/Paragraph'
import { GripLinesVertical } from '@styled-icons/fa-solid/GripLinesVertical'
import { DotCircle } from '@styled-icons/fa-solid/DotCircle'
import { CheckSquare } from '@styled-icons/fa-solid/CheckSquare'

import {
    Control, RowControl, ColumnControl, InputElement, TextControl, TextElement, defaultControls,
} from './store'

type RenderT = (key: string, value: string) => React.ReactNode

const renderOptions = (el: InputElement, rend: RenderT) => {
    const options = el.optionPairs
    if (options.length === 0) {
        return rend('', '')
    }
    return options.map(([name, label]) => (
        <label key={name}>{rend(name, label)}<span>{label}</span></label>
    ))
}


defaultControls.register([
    new RowControl({
        id: 'row',
        name: 'Row',
        icon: <GripLines />,
    }),
    new ColumnControl({
        id: 'col',
        name: 'Column',
        icon: <GripLinesVertical />,
    }),

    new TextControl({
        id: 'heading',
        name: 'Heading',
        icon: <Heading />,
        placeholder(h:TextElement) { return React.createElement(h.data.tag, h.data.text) },
    }),

    new TextControl({
        id: 'para',
        name: 'Paragraph',
        icon: <Paragraph />,
        placeholder(para:TextElement) { return <p>{para.data.text}</p> },
    }),

    new Control({
        id: 'input',
        name: 'Text Input',
        icon: <Font />,
        placeholder() { return <input type='text' className='form-control' readOnly /> },
    }),

    new Control({
        id: 'textarea',
        name: 'Text Area',
        icon: <Square />,
        placeholder() { return <textarea className='form-control' readOnly /> },
    }),

    new Control({
        id: 'checkbox',
        name: 'Checkboxes',
        icon: <CheckSquare />,
        hasOptions: true,
        placeholder(el: InputElement) {
            return renderOptions(el, (n: string) => (
                <input type="checkbox" name={n} readOnly />
            ))
        },
    }),
    new Control({
        id: 'radio',
        name: 'Radio Input',
        hasOptions: true,
        icon: <DotCircle />,
        placeholder(el: InputElement) {
            return renderOptions(el, (n: string) => (
                <input key={n} type="radio" name={n} readOnly />
            ))
        },
    }),
    new Control({
        id: 'select',
        name: 'Select',
        hasOptions: true,
        icon: <CaretSquareDown />,
        placeholder(el: InputElement) {
            const options = el.optionPairs
            return (
                <select name={el.data.name}>
                    {options.map(([v, l]) => (
                        <option key={v} value={v}>{l}</option>
                    ))}
                </select>
            )
        },
    }),
])
