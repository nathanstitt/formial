import * as React from 'react'
import styled from 'styled-components'
import cn from 'classnames'
import { useDrop, useDrag, DragElementWrapper, DragSourceOptions } from 'react-dnd'
import { GripHorizontal } from '@styled-icons/fa-solid/GripHorizontal'
import { Edit } from '@styled-icons/fa-solid/Edit'
import { TrashAlt } from '@styled-icons/fa-solid/TrashAlt'
import { EditableText } from './editable-text'

import {
    useStore,
    Element,
    isContainer,
    isText,
    isInput,
    InputElement,
    TextElement,
    useStoreContext,
    Container,
} from './store'

const revealColor = '#e8e8e8'
const dropAcceptableColor = '#c1c1c1'

const FormDropEl = styled.div({
    minHeight: '15px',
    border: '1px solid white',
    '&:last-child': {
        flex: 1,
    },
})

interface DropProps {
    index: number
    container: Container
}

interface DropItem {
    id: string
    fromIndex?: number
    fromContainer?: Container
}

const useFormDrop = ({ index, container }: DropProps) => {
    const sc = useStoreContext()
    const [{ isHovered }, dropRef] = useDrop({
        accept: 'control',
        collect(item) {
            return { isHovered: item.isOver() }
        },
        drop: (item) => {
            const { id, fromIndex, fromContainer } = (item as any as DropItem)
            sc.dispatch({
                type: 'ADD_ELEMENT',
                id,
                destIndex: index,
                container,
                fromIndex,
                fromContainer,
            })
        },
    })
    return { isHovered, dropRef }
}

export const FormDrop: React.FC<DropProps> = (props) => {
    const { isHovered, dropRef } = useFormDrop(props)
    return <FormDropEl ref={dropRef} className={cn('drop', { isHovered })} />
}

const ElementPreviewEl = styled.div({
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    padding: '20px',
    color: '#0c0c0c',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    minHeight: '40px',

    '&.input .label, &.textarea .label': {
        marginBottom: '-20px',
        zIndex: 1,
        fontSize: '80%',
        marginLeft: '10px',
    },
    '.control-type': {
        fontSize: '0.8rem',
        position: 'absolute',
        top: 0,
        right: 0,
        border: '1px solid',
        padding: '2px',
        borderRadius: '8px',
    },

    '&:hover': {
        backgroundColor: 'white',
        '> .controls': {
            opacity: 1,
        },
    },

    '.controls': {
        opacity: 0,
        transition: 'opacity 0.3s ease-in-out',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        width: '110px',
        button: {
            border: 0,
            padding: 0,
            cursor: 'pointer',
            backgroundColor: 'transparent',
            '&:hover': {
                svg: { color: '#212121' },
            },
        },
        svg: {
            height: '20px',
            color: 'gray',
            transition: 'opacity 0.3s ease-in-out',
        },
        '.move svg': { cursor: 'move' },
    },

    '.inline-text': {
        padding: 0,
        border: 0,
        fontSize: 'inherit',
        '&:focus': {
            outline: 'none',
        },
    },

    '.label': {
        fontSize: '20px',
        marginBottom: '5px',
    },

    '.control-preview': {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'center',
        '&.row': {
            flexDirection: 'column',
        },
    },
    'input + span': {
        marginLeft: '10px',
    },
})

const Controls:React.FC<{
    target: Element | Container
    container: Container,
    drag: DragElementWrapper<DragSourceOptions>,
}> = ({
    target, container, drag,
}) => {
    const sc = useStoreContext()

    return (
        <div className={cn('controls', { container: isContainer(target) })}>
            <button className='trash' onClick={() => sc.dispatch({
                type: 'DELETE', target, container,
            })}>
                <TrashAlt />
            </button>
            <button onClick={() => sc.dispatch({ type: 'EDIT', target })}>
                <Edit />
            </button>
            <button className='move' ref={drag}>
                <GripHorizontal />
            </button>
        </div>
    )
}

const InputPreview: React.FC<{
    index: number
    input: InputElement
    container: Container
}> = ({
    index, input, container,
}) => {
    const [{ opacity }, drag, preview] = useDrag({
        item: { id: input.id, fromIndex: index, fromContainer: container, type: 'control' },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    })

    return (
        <ElementPreviewEl
            ref={preview}
            style={{ opacity }}
            className={cn('element-preview', input.control.id)}
        >
            <div className='control-preview'>
                <span className="label">{input.data.label}</span>
                {input.placeholder}
            </div>
            <Controls target={input} container={container} drag={drag} />
        </ElementPreviewEl>
    )
}

const TextPreview: React.FC<{
    index: number
    control: TextElement
    container: Container
}> = ({
    index, control, container,
}) => {
    const sc = useStoreContext()
    const [{ opacity }, drag, preview] = useDrag({
        item: { id: control.id, fromIndex: index, fromContainer: container, type: 'control' },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    })
    const text = React.createElement(control.data.tag, {}, control.data.text)

    return (
        <ElementPreviewEl
            ref={preview}
            style={{ opacity }}
            className={cn('element-preview', control.control.id)}
        >
            <div className='control-preview'>
                <EditableText
                    onTextSaved={(updated) => {
                        sc.dispatch({ type: 'UPDATE', target: control, patch: { text: updated } })
                    }}
                    textValue={control.data.text}
                >{text}</EditableText>
            </div>
            <Controls target={control} container={container} drag={drag} />
        </ElementPreviewEl>
    )
}


const ContainerPreviewEl = styled(ElementPreviewEl)({
    border: '1px dashed gray',
    minHeight: '40px',
    borderRadius: '5px',
    padding: '0',
    alignItems: 'stretch',
    '> .container.controls': {
        background: 'white',
        border: '1px dashed gray',
        position: 'absolute',
    },
    '&.container-row': {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        minHeight: '80px',
        '> .container-drop': {
            width: '100%',
        },
        '> .container-column': {
            margin: '-1px',
            flex: 1,
        },
        '> .container.controls': {
            position: 'absolute',
            top: '-27px',
            left: 'calc(50% - 15px)',
            padding: '2px 5px',
            borderTopRightRadius: '5px',
            borderTopLeftRadius: '5px',
            borderBottomWidth: 0,
        },
    },
    '> .container-preview': {
        flex: 1,
    },

    '&.empty': {
        alignItems: 'stretch',
        '> .drop': {
            flex: 1,
        },
    },
    '&.container-col': {
        '> .container.controls': {
            top: 'calc(50% - 40px)',
            left: '-25px',
            display: 'flex',
            flexDirection: 'column',
            width: '30px',
            borderRadius: '5px',
            alignItems: 'center',
            '> *': {
                marginLeft: 0,
            },
        },
        '> .element-preview': {
            flex: 1,
        },
    },
    '&:hover': {
        '.container-drop': {
            backgroundColor: revealColor,
        },
    },
})

const ContainerDropEl = styled(FormDropEl)({
    minWidth: '20px',

})

const ContainerDrop: React.FC<DropProps> = (props) => {
    const { isHovered, dropRef } = useFormDrop(props)

    return (
        <ContainerDropEl
            ref={dropRef}
            className={cn('drop', 'container-drop', { isHovered })}
        />
    )
}

const ContainerPreview:React.FC<{
    container: Container
    parent: Container
    index: number
}> = ({ parent, container, index }) => {
    const [{ opacity }, drag, preview] = useDrag({
        item: { id: container.id, fromIndex: index, fromContainer: parent, type: 'control' },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    })

    return (
        <ContainerPreviewEl
            ref={preview}
            style={{ opacity }}
            className={cn('container-preview', `container-${container.direction}`, {
                empty: container.children.length === 0,
            })}
        >
            <ContainerDrop container={container} index={0} />

            {container.children.map((el, i) => (
                <React.Fragment key={i}>
                    <ElementPreview index={i} container={container} el={el} />
                    <ContainerDrop container={container} index={i + 1} />
                </React.Fragment>
            ))}

            <Controls target={container} container={parent} drag={drag} />

        </ContainerPreviewEl>
    )
}


const ElementPreview:React.FC<{
    el: Element|Container,
    index: number,
    container: Container,
}> = ({ el, index, container }) => {

    if (isContainer(el)) {
        return <ContainerPreview parent={container} container={el} index={index} />
    }
    if (isText(el)) {
        return <TextPreview control={el} container={container} index={index} />
    }
    if (isInput(el)) {
        return <InputPreview input={el} container={container} index={index} />
    }

    return null
}


const FormElementsEl = styled.div<{editing: boolean}>(({ editing }) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'flex-start',
    background: '#fafafa',
    padding: '20px',
    boxSizing: 'border-box',
    boxShadow: '0 0 2px 1px rgba(0, 0, 0, 0.1)',
    opacity: editing ? '0.3' : '1',
    transition: 'all 0.3s ease-in-out',
    width: 'fit-content',
    minWidth: '100%',

    '.drop': {
        transition: 'all 0.3s ease-in-out',
    },
    '> .container-preview': {
        margin: '0 2px',
    },
    '&.isHovered': {
        '.drop': {
            backgroundColor: revealColor,
        },
    },
    '&:hover': {
        '.drop': {
            backgroundColor: revealColor,
        },
    },
    '.drop.isHovered': {
        borderColor: 'black',
        backgroundColor: dropAcceptableColor,
    },
    '.drop:hover': {
        backgroundColor: dropAcceptableColor,
    },
    'p, h1, h2, h3, h4, h5, h6': {
        padding: 0,
        margin: 0,
    },
}))
export const FormElements = () => {
    const { form, editing } = useStore()
    const [{ isHovered }, drop] = useDrop({
        accept: 'control',
        collect(item) {
            return { isHovered: item.isOver() }
        },
        canDrop: () => false,
    })
    // if (!container.children.length) {
    //     return <FormDrop container={container} index={0} />
    // }

    return (
        <FormElementsEl ref={drop} editing={!!editing} className={cn('form-elements', { isHovered })}>
            <FormDrop container={form} index={0} />
            {form.children.map((e, i) => (
                <React.Fragment key={i}>
                    <ElementPreview index={i} container={form} el={e} />
                    <FormDrop container={form} index={i + 1} />
                </React.Fragment>
            ))}
        </FormElementsEl>
    )
}
