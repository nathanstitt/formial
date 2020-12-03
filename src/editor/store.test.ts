import {
    Control, Store, Form, initStore, addElement, Container,
    Element, unserialize, TextElement, InputElement, defaultControls,
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

    get defaultValues(): any {
        return {
            testingElement: true,
        }
    }

}

describe('merging', () => {
    const testCntrl = new TestControl({
        id: 'col',
        name: 'A tester control',
        icon: 'none',
    })
    defaultControls.register([testCntrl])
    let store:Store
    beforeEach(() => {
        store = initStore()
        store.controls.set('test', testCntrl)
    })

    const addStoreElement = (form:Form = store.form) => {
        store = addElement(store, {
            id: 'test', container: form, destIndex: 0,
        })
    }

    describe('add element', () => {
        test('plain adding', () => {
            const st = addElement(store, {
                id: 'test', container: store.form, destIndex: 0,
            })
            expect(st.form.children).toHaveLength(1)
            expect((st.form.children[0] as Element).control.id).toEqual('col')
        })

        test('moving forward', () => {
            addStoreElement()
            addStoreElement()
            expect(store.form.children).toHaveLength(2)
            const ids = store.form.children.map(c => c.id)
            const st = addElement(store, { id: 'test',
                container: store.form,
                destIndex: 2,
                fromIndex: 0,
                fromContainer: store.form })
            expect(
                st.form.children.map(c => c.id),
            ).toEqual(ids.reverse())
        })

        test('moving backward', () => {
            addStoreElement()
            addStoreElement()
            const ids = store.form.children.map(c => c.id)
            const st = addElement(store, { id: 'test',
                container: store.form,
                destIndex: 0,
                fromIndex: 1,
                fromContainer: store.form })
            expect(
                st.form.children.map(c => c.id),
            ).toEqual(ids.reverse())
        })

        test('across containers', () => {
            store.form.children.push(new Container(testCntrl, {
                direction: 'row',
            }))
            store.form.children.push(new Container(testCntrl, {
                direction: 'row',
            }))

            addStoreElement(store.form.children[0] as Form)
            addStoreElement(store.form.children[1] as Container)

            const st = addElement(store, {
                id: 'test',
                container: store.form.children[0] as Container,
                destIndex: 1,
                fromIndex: 0,
                fromContainer: store.form.children[1] as Container,
            })

            expect(
                (st.form.children[0] as Container).children,
            ).toHaveLength(2)
            expect(
                (st.form.children[1] as Container).children,
            ).toHaveLength(0)
        })
    })

    describe('serializing', () => {
        test('elements', () => {
            const obj = {
                id: '1234',
                type: 'FORM',
                control: 'test',
                className: 'formial-form',
                testingElement: true,
                children: [],
                direction: 'row',
                attributes: [],
            }
            const el = unserialize(store.controls, obj) as Element
            expect(el).not.toBeNull()
            expect(el).toBeInstanceOf(Element)
            expect(el).toMatchObject({
                id: '1234',
                data: {
                    className: 'formial-form',
                },
            })
            expect(el.serialize()).toEqual(obj)
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
            expect(ct.children[0].serialize()).toMatchObject({
                id: '12345',
                type: 'FORM',
            })
        })

        test('text', () => {
            const obj = {
                id: '1234',
                type: 'TEXT',
                control: 'col',
                className: 'testcls',
                tag: 'p',
                testingElement: true,
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
            expect(el.serialize()).toEqual(obj)
        })
        test('input', () => {
            const obj: SerializedInputElement = {
                id: '1234',
                type: 'INPUT',
                control: 'test',
                className: 'testcls',
                label: 'My Input',
                name: 'input-test',
                testingElement: true,
                classNames: {
                    wrapper: 'input-group',
                    label: '',
                    input: '',
                },
                attributes: [
                    { id: 'data-test', value: 'true' },
                ],
                options: [
                    { id: 'one', value: 'One' },
                    { id: 'two', value: 'Two' },
                ],
            }
            const el = unserialize(store.controls, obj) as InputElement
            expect(el).not.toBeNull()
            expect(el).toBeInstanceOf(InputElement)
            expect(el).toMatchObject({
                id: '1234',
                data: {
                    label: 'My Input',
                    className: 'testcls',
                    testingElement: true,
                },
            })
            expect(el.serialize()).toEqual(obj)
        })
    })
})
