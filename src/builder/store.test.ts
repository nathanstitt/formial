import {
    Control, Store, initStore, addElement, Container,
    Element, unserialize, TextElement, InputElement,
} from './store'
import {
    SerializedInputElement, SerializedContainer,
} from '../data'

class TestElement extends Element {

}


class TestControl extends Control {

    createElement(): Element {
        return new TestElement(this)
    }

}

describe('merging', () => {
    const testCntrl = new TestControl({
        id: 'test',
        name: 'A tester control',
        icon: 'none',
    })

    let store:Store
    beforeEach(() => {
        store = initStore()
        store.controls.set('test', testCntrl)
    })

    const addStoreElement = (container:Container = store.container) => {
        store = addElement(store, {
            id: 'test', container, destIndex: 0,
        })
    }

    describe('add element', () => {
        test('plain adding', () => {
            const st = addElement(store, {
                id: 'test', container: store.container, destIndex: 0,
            })
            expect(st.container.children).toHaveLength(1)
            expect((st.container.children[0] as Element).control.id).toEqual('test')
        })

        test('moving forward', () => {
            addStoreElement()
            addStoreElement()
            expect(store.container.children).toHaveLength(2)
            const ids = store.container.children.map(c => c.id)
            const st = addElement(store, { id: 'test',
                container: store.container,
                destIndex: 2,
                fromIndex: 0,
                fromContainer: store.container })
            expect(
                st.container.children.map(c => c.id),
            ).toEqual(ids.reverse())
        })

        test('moving backward', () => {
            addStoreElement()
            addStoreElement()
            const ids = store.container.children.map(c => c.id)
            const st = addElement(store, { id: 'test',
                container: store.container,
                destIndex: 0,
                fromIndex: 1,
                fromContainer: store.container })
            expect(
                st.container.children.map(c => c.id),
            ).toEqual(ids.reverse())
        })

        test('across containers', () => {
            store.container.children.push(new Container(testCntrl, {
                direction: 'row',
            }))
            store.container.children.push(new Container(testCntrl, {
                direction: 'row',
            }))

            addStoreElement(store.container.children[0] as Container)
            addStoreElement(store.container.children[1] as Container)

            const st = addElement(store, {
                id: 'test',
                container: store.container.children[0] as Container,
                destIndex: 1,
                fromIndex: 0,
                fromContainer: store.container.children[1] as Container,
            })

            expect(
                (st.container.children[0] as Container).children,
            ).toHaveLength(2)
            expect(
                (st.container.children[1] as Container).children,
            ).toHaveLength(0)
        })
    })

    describe('serializing', () => {
        test('elements', () => {
            const obj = {
                id: '1234',
                type: 'ELEMENT',
                control: 'test',
                className: 'testcls',
            }
            const el = unserialize(store.controls, obj) as Element
            expect(el).not.toBeNull()
            expect(el).toBeInstanceOf(Element)
            expect(el).toMatchObject({
                id: '1234',
                data: {
                    className: 'testcls',
                },
            })
            expect(el.serialized).toEqual(obj)
        })

        test('containers', () => {
            const obj: SerializedContainer = {
                id: '1234-col',
                type: 'CONTAINER',
                control: 'test',
                direction: 'column',
                className: 'testcls',
                children: [
                    {
                        id: '12345',
                        type: 'ELEMENT',
                        control: 'test',
                        className: 'testcls',

                    },
                ],
            }
            const ct = unserialize(store.controls, obj) as Container
            expect(ct).toBeInstanceOf(Container)
            expect(ct).toMatchObject({
                direction: 'column',
                id: '1234-col',
            })
            expect(ct.children[0]).toBeInstanceOf(Element)
            expect(ct.children[0].serialized).toMatchObject({
                id: '12345',
                type: 'ELEMENT',
            })
        })

        test('text', () => {
            const obj = {
                id: '1234',
                type: 'TEXT',
                control: 'test',
                className: 'testcls',
                tag: 'p',
                text: 'hello world',
            }
            const el = unserialize(store.controls, obj) as TextElement
            expect(el).not.toBeNull()
            expect(el).toBeInstanceOf(TextElement)
            expect(el).toMatchObject({
                id: '1234',
                data: {
                    text: 'hello world',
                    className: 'testcls',
                },
            })
            expect(el.serialized).toEqual(obj)
        })
        test('input', () => {
            const obj: SerializedInputElement = {
                id: '1234',
                type: 'INPUT',
                control: 'test',
                className: 'testcls',
                label: 'My Input',
                name: 'input-test',
                classNames: {
                    wrapper: 'input-group',
                    label: '',
                    input: '',
                },
                attributes: {
                    'data-test': 'true',
                },
                options: {
                    one: 'One',
                    two: 'Two',
                },
            }
            const el = unserialize(store.controls, obj) as InputElement
            expect(el).not.toBeNull()
            expect(el).toBeInstanceOf(InputElement)
            expect(el).toMatchObject({
                id: '1234',
                data: {
                    label: 'My Input',
                    className: 'testcls',
                },
            })
            expect(el.serialized).toEqual(obj)
        })
    })
})
