import * as React from 'react'
import styled, { CSSObject } from 'styled-components'
import { CaretSquareDown } from '@styled-icons/fa-regular/CaretSquareDown'
import { Font } from '@styled-icons/fa-solid/Font'
import { GripLines } from '@styled-icons/fa-solid/GripLines'
import { Square } from '@styled-icons/fa-regular/Square'
import { Heading } from '@styled-icons/fa-solid/Heading'
import { Paragraph } from '@styled-icons/fa-solid/Paragraph'
import { GripLinesVertical } from '@styled-icons/fa-solid/GripLinesVertical'
import { DotCircle } from '@styled-icons/fa-solid/DotCircle'
import { CheckSquare } from '@styled-icons/fa-solid/CheckSquare'
import { ChoicesLayoutTypes } from '../data'
import {
    InputControl, ContainerControl, InputElement, TextControl, TextElement, defaultControls,
} from './models'

type RenderT = (key: string, value: string) => React.ReactNode

const Choices = styled.div<{ layout?: ChoicesLayoutTypes }>(({ layout }) => {
    const style:CSSObject = {
        display: 'flex',
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'column',
    }
    if (layout && layout !== 'vertical') {
        style.flexDirection = 'row'
        const label:CSSObject = {
            paddingRight: '5px',

        }
        if ('two_column' === layout) {
            label.width = '50%'
        }
        if ('three_column' === layout) {
            label.width = '33%'
        }
        style['> label'] = label
    }
    return style
})

const renderOptions = (el: InputElement, rend: RenderT) => {
    const options = el.optionPairs
    if (0 === options.length) {
        return rend('', '')
    }
    const choices = options.map(([name, label]) => (
        <label key={name}>{rend(name, label)}<span>{label}</span></label>
    ))
    return (
        <Choices layout={el.data.choicesLayout}>{choices}</Choices>
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
