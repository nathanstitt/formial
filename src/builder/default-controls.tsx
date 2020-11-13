import * as React from 'react'
import { CaretSquareDown } from '@styled-icons/fa-regular/CaretSquareDown'
import { Font } from '@styled-icons/fa-solid/Font'
import { GripLines } from '@styled-icons/fa-solid/GripLines'
import { GripLinesVertical } from '@styled-icons/fa-solid/GripLinesVertical'
import { DotCircle } from '@styled-icons/fa-solid/DotCircle'
import { CheckSquare } from '@styled-icons/fa-solid/CheckSquare'

import { Control, RowControl, ColumnControl, Element, defaultControls } from './store'

type RenderT = (key: string, value: string) => React.ReactNode

const renderOptions = (el: Element, rend: RenderT) => {
    const options = el.optionPairs
    if (options.length === 0) {
        return rend('', '')
    }
    return options.map(([name, label]) => rend(name, label))
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
    new Control({
        id: 'input',
        name: 'Text Input',
        icon: <Font />,
        placeholder() { return <input type='text' className='form-control' readOnly /> },
    }),

    new Control({
        id: 'checkbox',
        name: 'Checkboxes',
        icon: <CheckSquare />,
        hasOptions: true,
        placeholder(el: Element) {
            return renderOptions(el, (n: string) => (
                <input type="checkbox" name={n} className={el.data.classNames.element} readOnly />
            ))
        },
    }),
    new Control({
        id: 'radio',
        name: 'Radio Input',
        icon: <DotCircle />,
        placeholder(el: Element) {
            return renderOptions(el, (n: string) => (
                <input type="radio" name={n} className={el.data.classNames.element} readOnly />
            ))
        },
    }),
    new Control({
        id: 'select',
        name: 'Select',
        hasOptions: true,
        icon: <CaretSquareDown />,
        placeholder(el: Element) {
            return (
                <select name={el.data.name}>
                    {renderOptions(el, (v: string, l:string) => (
                        <option key={v} value={v}>{l}</option>
                    ))}
                </select>
            )
        },
    }),
])
