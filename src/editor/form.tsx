import * as React from 'react'
import styled from 'styled-components'
import cn from 'classnames'
import { useDrop, useDrag, DragElementWrapper, DragSourceOptions } from 'react-dnd'
import { GripHorizontal } from '@styled-icons/fa-solid/GripHorizontal'
import { Edit } from '@styled-icons/fa-solid/Edit'
import { TrashAlt } from '@styled-icons/fa-solid/TrashAlt'
import { EditableText } from './editable-text'
import { Scrolling } from './components'
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

const DropEl = styled.div({
    transition: 'all 0.3s ease-in-out',
})

const HorizontalDropEl = styled(DropEl)({
    height: '15px',
    '&.isHovered': {
        height: '100px',
        background: revealColor,
    },
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

export const HorizonontalDrop: React.FC<DropProps> = (props) => {
    const { isHovered, dropRef } = useFormDrop(props)
    return <HorizontalDropEl ref={dropRef} className={cn('drop', { isHovered })} />
}

const VerticalDropEl = styled(DropEl)({
    minWidth: '20px',
    '&.isHovered': {
        flex: 1,
        // width: '100px',
        background: revealColor,
    },
})

const VerticalDrop: React.FC<DropProps> = (props) => {
    const { isHovered, dropRef } = useFormDrop(props)

    return (
        <VerticalDropEl
            ref={dropRef}
            className={cn('drop', 'container-drop', { isHovered })}
        />
    )
}

const ElementPreviewEl = styled.div<{ editing?: boolean }>(({ editing }) => ({
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    padding: '10px',
    color: '#0c0c0c',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    minHeight: 'fit-content',
    borderWidth: '2px',
    background: editing ? '#ffffed' : 'white',
    borderColor: editing ? '#a5a500;' : 'transparent',
    borderStyle: 'dashed',
    cursor: 'pointer',

    'input, textarea, select': {
        cursor: 'pointer',
        '&:focus': {
            outline: 'none',
            borderColor: 'inherit',
            boxShadow: 'none',
        },
    },

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
        '> .controls': {
            opacity: 1,
        },
    },

    '.controls': {
        opacity: 0,
        position: 'absolute',
        transition: 'opacity 0.3s ease-in-out',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        '.move svg': {
            cursor: 'move',
        },
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
    },

    '>.controls': {
        background: editing ? '#ffffed' : 'white',
        top: 0,
        right: 0,
        padding: '5px',
        borderBottomLeftRadius: '5px',
        position: 'absolute',
        width: 'fit-content',
        '> *': {
            margin: '0 5px',
        },
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
        flex: 1,
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
}))

const Controls:React.FC<{
    target: Element | Container
    container: Container,
    displayEdit: boolean,
    drag?: DragElementWrapper<DragSourceOptions>,
}> = ({
    target, container, drag, displayEdit,
}) => {
    const sc = useStoreContext()

    return (
        <div className={cn('controls', { container: isContainer(target) })}>
            <span>{target.control.name}</span>
            <button className='trash' onClick={() => sc.dispatch({
                type: 'DELETE', target, container,
            })}>
                <TrashAlt />
            </button>
            {displayEdit && (
                <button onClick={() => sc.dispatch({ type: 'EDIT', target })}>
                    <Edit />
                </button>)}
            {drag && (
                <button className='move' ref={drag}>
                    <GripHorizontal />
                </button>)}
        </div>
    )
}

const ControlPreview = styled.div.attrs({
    className: 'control-preview',
})({
    padding: '10px',
})

const InputPreview: React.FC<{
    index: number
    input: InputElement
    container: Container
}> = ({
    index, input, container,
}) => {
    const [{ opacity }, drag] = useDrag({
        item: { id: input.id, fromIndex: index, fromContainer: container, type: 'control' },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    })
    const sc = useStoreContext()

    return (
        <ElementPreviewEl
            ref={drag}
            style={{ opacity }}
            editing={sc.store.editing === input}
            className={cn('element-preview', input.control.id)}
            onClick={() => sc.dispatch({ type: 'EDIT', target: input })}
        >
            <Controls displayEdit={false} target={input} container={container} />
            <ControlPreview>
                <span className="label">{input.data.label}</span>
                {input.placeholder}
            </ControlPreview>
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
    const [{ opacity }, drag] = useDrag({
        item: { id: control.id, fromIndex: index, fromContainer: container, type: 'control' },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    })
    const text = React.createElement(control.data.tag, {}, control.data.text)

    return (
        <ElementPreviewEl
            editing={sc.store.editing === control}
            style={{ opacity }}
            ref={drag}
            className={cn('element-preview', control.control.id)}
        >
            <Controls displayEdit={false} target={control} container={container} />
            <div className='control-preview'>
                <EditableText
                    onTextSaved={(updated) => {
                        sc.dispatch({ type: 'UPDATE', target: control, patch: { text: updated } })
                    }}
                    textValue={control.data.text}
                >{text}</EditableText>
            </div>
        </ElementPreviewEl>
    )
}


const ContainerPreviewEl = styled(ElementPreviewEl)({
    border: '1px dashed gray',
    alignItems: 'stretch',
    padding: '5px',

    '> .container.controls': {
        background: 'white',
        border: '1px dashed gray',

        width: 'fit-content',
        '> *': {
            margin: '0 5px',
        },
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
            top: '-27px',
            left: 0,
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
    },
    '&.container-column': {

        '> .container.controls': {
            top: 'calc(50% - 40px)',
            left: '-25px',
            right: 'auto',
            display: 'flex',
            width: '30px',
            flexDirection: 'row-reverse',
            borderRadius: '5px',
            alignItems: 'center',
            writingMode: 'vertical-rl',
            textOrientation: 'upright',
            fontSize: '80%',
            '> *': {
                margin: '5px 0',
            },
        },
        '> .element-preview': {
            flex: 1,
        },
    },
})


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

    const Drop = container.isRow ? HorizonontalDrop : VerticalDrop

    return (
        <ContainerPreviewEl
            ref={preview}
            style={{ opacity }}
            className={cn('container-preview', `container-${container.direction}`, {
                empty: container.children.length === 0,
            })}
        >
            <Drop container={container} index={0} />
            <Controls displayEdit target={container} container={parent} drag={drag} />
            {container.children.map((el, i) => (
                <React.Fragment key={i}>
                    <ElementPreview index={i} container={container} el={el} />
                    <Drop container={container} index={i + 1} />
                </React.Fragment>
            ))}
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


const FormElementsEl = styled(Scrolling)({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'flex-start',
    background: '#fafafa',
    padding: '20px',
    boxSizing: 'border-box',
    boxShadow: '0 0 2px 1px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease-in-out',
    width: 'fit-content',
    minWidth: '100%',
    '> .container-preview': {
        margin: '0 2px',
    },
    'p, h1, h2, h3, h4, h5, h6': {
        padding: 0,
        margin: 0,
    },
})
export const FormElements = () => {
    const { form } = useStore()
    const [{ isHovered }, drop] = useDrop({
        accept: 'control',
        collect(item) {
            return { isHovered: item.isOver() }
        },
        canDrop: () => false,
    })

    return (
        <FormElementsEl
            ref={drop}
            className={cn('form-elements', { isHovered })}
        >

            <HorizonontalDrop container={form} index={0} />
            {form.children.map((e, i) => (
                <React.Fragment key={i}>
                    <ElementPreview index={i} container={form} el={e} />
                    <HorizonontalDrop container={form} index={i + 1} />
                </React.Fragment>
            ))}

        </FormElementsEl>
    )
}
