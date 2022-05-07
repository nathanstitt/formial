import * as React from 'react'
import cn from 'classnames'
import { FC } from './types'
import { useDrop, useDrag, DragElementWrapper, DragSourceOptions, ConnectDropTarget } from 'react-dnd'
import { GripHorizontal, Edit, TrashAlt } from './icons'
import {
    useStore,
    useStoreContext,
} from './store'
import {
    isInput,
    InputElement,
    TextElement,
    Container,
    isText,
    isContainer,
    FormElement,
} from './models'

interface DropProps {
    index: number
    container: Container
}

interface DropItem {
    id: string
    fromIndex?: number
    fromContainer?: Container
}

type useFormDropReturn = {
    dropRef: ConnectDropTarget
    isHovered: boolean
}


const useFormDrop = ({ index, container }: DropProps): useFormDropReturn => {
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
                containerId: container.id,
                fromIndex,
                fromContainerId: fromContainer?.id,
            })
        },
    })
    return { isHovered, dropRef }
}

export const HorizonontalDrop: FC<DropProps> = (props) => {
    const { isHovered, dropRef } = useFormDrop(props)
    return <div ref={dropRef} className={cn('drop', 'horizontal', { 'is-hovered': isHovered })} />
}


const VerticalDrop: FC<DropProps> = (props) => {
    const { isHovered, dropRef } = useFormDrop(props)

    return (
        <div
            ref={dropRef}
            className={cn('drop', 'vertical', 'container-drop', { 'is-hovered': isHovered })}
        />
    )
}


//`<{ editing?: boolean }>(({ editing }) => ({

const Controls: FC<{
    target: FormElement | Container
    container: Container,
    displayEdit: boolean,
    drag?: DragElementWrapper<DragSourceOptions>,
}> = ({
    target, container, drag, displayEdit,
}) => {
        const sc = useStoreContext()
        const onDelete = (ev: React.MouseEvent<HTMLButtonElement>): void => {
            ev.stopPropagation()
            sc.dispatch({
                type: 'DELETE_ELEMENT', elementId: target.id, containerId: container.id,
            })
        }
        return (
            <div className={cn('controls', { container: isContainer(target) })}>
                <span>{target.control.name}</span>
                <button className='trash' onClick={onDelete}>
                    <TrashAlt />
                </button>
                {displayEdit && (
                    <button onClick={(): void => sc.dispatch({ type: 'EDIT_ELEMENT', elementId: target.id })}>
                        <Edit />
                    </button>)}
                {drag && (
                    <button className='move' ref={drag}>
                        <GripHorizontal />
                    </button>)}
            </div>
        )
    }


const InputPreview: FC<{
    index: number
    input: InputElement
    container: Container
}> = ({
    index, input, container,
}) => {
        const [{ opacity }, drag] = useDrag({
            type: 'control',
            item: { id: input.id, fromIndex: index, fromContainer: container, type: 'control' },
            collect: monitor => ({
                opacity: monitor.isDragging() ? 0.4 : 1,
            }),
        })
        const sc = useStoreContext()
        return (
            <div
                ref={drag}
                style={{ opacity }}
                className={cn('element-preview', input.control.id, {
                    'is-editing': sc.store.editingId === input.id,
                })}
                onClick={(): void => sc.dispatch({ type: 'EDIT_ELEMENT', elementId: input.id })}
            >
                <Controls displayEdit={false} target={input} container={container} />
                <div className="control-preview">
                    <span className="label">{input.data.label}</span>
                    {input.placeholder}
                </div>
            </div>
        )
    }

const TextPreview: FC<{
    index: number
    control: TextElement
    container: Container
}> = ({
    index, control, container,
}) => {
        const sc = useStoreContext()
        const [{ opacity }, drag] = useDrag({
            type: 'control',
            item: { id: control.id, fromIndex: index, fromContainer: container, type: 'control' },
            collect: monitor => ({
                opacity: monitor.isDragging() ? 0.4 : 1,
            }),
        })
        const text = React.createElement(control.data.tag, {}, control.data.text)

        return (
            <div
                style={{ opacity }}
                ref={drag}
                onClick={(): void => sc.dispatch({ type: 'EDIT_ELEMENT', elementId: control.id })}
                className={cn('element-preview', control.control.id, {
                    'is-editing': sc.store.editingId === control.id,
                })}
            >
                <Controls displayEdit target={control} container={container} />
                <div className='control-preview'>
                    {text}
                </div>
            </div>
        )
    }


const ContainerPreview: FC<{
    container: Container
    parent: Container
    index: number
}> = ({ parent, container, index }) => {
    const [{ opacity }, drag, preview] = useDrag({
        type: 'control',
        item: { id: container.id, fromIndex: index, fromContainer: parent, type: 'control' },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    })

    const Drop = container.isRow ? HorizonontalDrop : VerticalDrop

    return (
        <div
            ref={preview}
            style={{ opacity }}
            className={cn('element-preview', 'container', `container-${container.direction}`, {
                empty: 0 === container.children.length,
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
        </div>
    )
}


const ElementPreview: FC<{
    el: FormElement | Container,
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
        <div
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

        </div>
    )
}
