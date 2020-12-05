import {
    Store, initStore, addElement,
} from './store'
import {
    Control, Form, Container,
    FormElement, unserialize, TextElement, InputElement, defaultControls,
} from './models'
import {
    SerializedContainer,
} from '../data'

class TestElement extends FormElement {

}

class TestControl extends Control {

    createElement(): FormElement {
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
        store.controls.test = testCntrl
    })

    const addStoreElement = (form:Form = store.form) => {
        addElement(store, {
            id: 'test', containerId: form.id, destIndex: 0,
        })
    }

    describe('add element', () => {
        test('plain adding', () => {
            addElement(store, {
                id: 'test', containerId: store.form.id, destIndex: 0,
            })
            expect(store.form.children).toHaveLength(1)
            expect((store.form.children[0] as InputElement).control.id).toEqual('col')
        })

        test('moving forward', () => {
            addStoreElement()
            addStoreElement()
            expect(store.form.children).toHaveLength(2)
            const ids = store.form.children.map(c => c.id)
            addElement(store, { id: 'test',
                containerId: store.form.id,
                destIndex: 2,
                fromIndex: 0,
                fromContainerId: store.form.id })
            expect(
                store.form.children.map(c => c.id),
            ).toEqual(ids.reverse())
        })

        test('moving backward', () => {
            addStoreElement()
            addStoreElement()
            const ids = store.form.children.map(c => c.id)
            addElement(store, { id: 'test',
                containerId: store.form.id,
                destIndex: 0,
                fromIndex: 1,
                fromContainerId: store.form.id })
            expect(
                store.form.children.map(c => c.id),
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

            addElement(store, {
                id: 'test',
                containerId: store.form.children[0].id,
                destIndex: 1,
                fromIndex: 0,
                fromContainerId: store.form.children[1].id,
            })

            expect(
                (store.form.children[0] as Container).children,
            ).toHaveLength(2)
            expect(
                (store.form.children[1] as Container).children,
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
            const el = unserialize(store.controls, obj) as InputElement
            expect(el).not.toBeNull()
            expect(el).toBeInstanceOf(FormElement)
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
            expect(ct.children[0]).toBeInstanceOf(FormElement)
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
            const obj: any = {
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
                testingElement: true,
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
