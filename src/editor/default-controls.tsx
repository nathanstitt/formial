import * as React from 'react'
import cn from 'classnames'
import {
    CaretSquareDown, Font, GripLines, Square, Heading,
    Paragraph, GripLinesVertical, DotCircle, CheckSquare
} from './icons'

import {
    InputControl, ContainerControl, InputElement, TextControl, TextElement, defaultControls,
} from './models'


type RenderT = (key: string, value: string) => React.ReactNode


const renderOptions = (el: InputElement, rend: RenderT) => {
    const options = el.optionPairs
    if (0 === options.length) {
        return rend('', '')
    }
    const choices = options.map(([name, label]) => (
        <label key={name}>{rend(name, label)}<span>{label}</span></label>
    ))
    return (
        <div className={cn('choices', el.data.choicesLayout)}>{choices}</div>
    )
}


defaultControls.register([
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

    new InputControl({
        id: 'input',
        name: 'Text Input',
        icon: <Font />,
        placeholder() { return <input type='text' className='form-control' readOnly /> },
    }),

    new InputControl({
        id: 'textarea',
        name: 'Text Area',
        icon: <Square />,
        placeholder() { return <textarea className='form-control' readOnly /> },
    }),

    new InputControl({
        id: 'checkbox',
        name: 'Checkboxes',
        icon: <CheckSquare />,
        hasOptions: true,
        defaultValues: {
            options: [],
            choicesLayout: 'vertical',
        },
        placeholder(el: InputElement) {
            return renderOptions(el, (n: string) => (
                <input type="checkbox" name={`pv-${n}`} readOnly />
            ))
        },
    }),
    new InputControl({
        id: 'radio',
        name: 'Radio Input',
        hasOptions: true,
        icon: <DotCircle />,
        defaultValues: {
            options: [],
            choicesLayout: 'vertical',
        },
        placeholder(el: InputElement) {
            return renderOptions(el, (n: string) => (
                <input key={n} type="radio" name={`pv-${el.data.name}`} readOnly />
            ))
        },
    }),
    new InputControl({
        id: 'select',
        name: 'Select',
        hasOptions: true,
        icon: <CaretSquareDown />,
        defaultValues: {
            options: [],
        },
        placeholder(el: InputElement) {
            const options = el.optionPairs
            return (
                <select name={`pv-${el.data.name}`}>
                    {options.map(([v, l]) => (
                        <option key={v} value={v}>{l}</option>
                    ))}
                </select>
            )
        },
    }),
    new ContainerControl({
        id: 'row',
        name: 'Row',
        icon: <GripLines />,
        defaultValues: {
            direction: 'row',
        },
    }),
    new ContainerControl({
        id: 'col',
        name: 'Column',
        icon: <GripLinesVertical />,
        defaultValues: {
            direction: 'column',
        },
    }),
])
