import { Control, Store, initStore, addElement, Container, Element } from './store'


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


    describe("add element", () => {

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
            const st = addElement(store, { id: 'test', container: store.container,
                destIndex: 2, fromIndex: 0, fromContainer: store.container })
            expect(
                st.container.children.map(c => c.id)
            ).toEqual(ids.reverse())

        })

        test('moving backward', () => {
            addStoreElement()
            addStoreElement()
            const ids = store.container.children.map(c => c.id)
            const st = addElement(store, { id: 'test', container: store.container,
                destIndex: 0, fromIndex: 1, fromContainer: store.container })
            expect(
                st.container.children.map(c => c.id)
            ).toEqual(ids.reverse())

        })

        test.only('across containers', () => {
            store.container.children.push(new Container({
                type: 'row',
            }))
            store.container.children.push(new Container({
                type: 'row',
            }))

            addStoreElement(store.container.children[0] as Container)
            addStoreElement(store.container.children[1] as Container)

            const st = addElement(store, {
                id: 'test',
                container: store.container.children[0] as Container,
                destIndex: 1, fromIndex: 0,
                fromContainer: store.container.children[1] as Container
            })

            expect(
                (st.container.children[0] as Container).children
            ).toHaveLength(2)
            expect(
                (st.container.children[1] as Container).children
            ).toHaveLength(0)
        })

    })

    test('containers', () => {
        const el = testCntrl.createElement()
        const c = new Container({ type: 'row' })
        c.children.push(el)

        const newC = c.merge({ children: c.children })

        expect(newC.id).toEqual(c.id)
        
        expect(newC.children[0].id).toEqual(el.id)
        
        // const el = cntrl.createElement()
        // expect(el).toBeInstanceOf(TestElement)
    })
})
