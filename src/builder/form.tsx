import * as React from 'react'
import styled from 'styled-components'
import cn from 'classnames'
import { useDrop, useDrag } from 'react-dnd'
import { GripHorizontal } from '@styled-icons/fa-solid/GripHorizontal'
import { Edit } from '@styled-icons/fa-solid/Edit'
import { TrashAlt } from '@styled-icons/fa-solid/TrashAlt'

import {
    useStore,
    Element,
    isContainerOrElement,
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
    padding: '10px',
    color: '#0c0c0c',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    '&.row': {
        '> .column': {
            margin: '-1px',
            flex: 1,
        },
        '> .container.controls': {
            top: 'calc(50% - 22px)',
            left: '-15px',
            right: undefined,
            display: 'flex',
            flexDirection: 'column',
            '> *': {
                marginLeft: 0,
            },
        },
    },

    '&.column': {
        flexDirection: 'column',
        '.container-drop': {
            width: '100%',
        },
        '&.empty': {
            flex: 1,
        },
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
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        '> *': {
            marginLeft: '15px',
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
        '&.row': {
            flexDirection: 'column',
        },
    },
})

const ControlPreview: React.FC<{
    index: number
    element: Element
    container: Container
}> = ({ index, element, container }) => {
    const sc = useStoreContext()
    const [{ opacity }, drag, preview] = useDrag({
        item: { id: element.id, fromIndex: index, fromContainer: container, type: 'control' },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    })

    return (
        <ElementPreviewEl
            ref={preview}
            style={{ opacity }}
            className={cn('element-preview', element.control.id)}
        >
            <div className='control-preview'>
                <span>{element.data.label}</span>
                {element.placeholder}
            </div>
            <div className='controls'>
                <button className='trash' onClick={() => sc.dispatch({
                    type: 'DEL_ELEMENT', element, container,
                })}>
                    <TrashAlt />
                </button>
                <button onClick={() => sc.dispatch({ type: 'EDIT_ELEMENT', element })}>
                    <Edit />
                </button>
                <button className='move' ref={drag}>
                    <GripHorizontal />
                </button>
            </div>
        </ElementPreviewEl>
    )
}

const ContainerPreviewEl = styled(ElementPreviewEl)({
    border: '1px dashed gray',
    minHeight: '40px',
    borderRadius: '5px',
    padding: '0',
    '&.empty': {
        alignItems: 'stretch',
        '> .drop': {
            flex: 1,
        },
    },
    '.container.controls': {
        position: 'absolute',
        top: '-27px',
        left: 'calc(50% - 15px)',
        background: 'white',
        padding: '2px 5px',
        borderTopRightRadius: '5px',
        borderTopLeftRadius: '5px',
        border: '1px dashed gray',
        borderBottomWidth: 0,
    },
    '.element-preview': {
        flex: 1,
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
    const sc = useStoreContext()
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
            className={cn('container-preview', container.type, {
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


            <div className='controls container'>
                <button className='trash' onClick={() => sc.dispatch({ type: 'DEL_ELEMENT', container: parent, element: container })}>
                    <TrashAlt />
                </button>

                <button className='move' ref={drag}>
                    <GripHorizontal />
                </button>
            </div>

        </ContainerPreviewEl>
    )
}


const ElementPreview:React.FC<{
    el: Element|Container,
    index: number,
    container: Container,
}> = ({ el, index, container }) => {
    if (isContainerOrElement(el)) {
        return <ContainerPreview parent={container} container={el} index={index} />
    }
    return <ControlPreview container={container} element={el} index={index} />
}


const FormElementsEl = styled.div<{editing: boolean}>(({ editing }) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'flex-start',
    background: '#fafafa',
    padding: '10px',
    boxSizing: 'border-box',
    boxShadow: '0 0 2px 1px rgba(0, 0, 0, 0.1)',
    opacity: editing ? '0.3' : '1',
    transition: 'opacity 0.3s ease-in-out',
    width: 'fit-content',
    minWidth: '100%',
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
}))
export const FormElements = () => {
    const { container, editing } = useStore()
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
            <FormDrop container={container} index={0} />
            {container.children.map((e, i) => (
                <React.Fragment key={i}>
                    <ElementPreview index={i} container={container} el={e} />
                    <FormDrop container={container} index={i + 1} />
                </React.Fragment>
            ))}
        </FormElementsEl>
    )
}
