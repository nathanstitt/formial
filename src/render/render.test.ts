import { render } from '../render'
import { SerializedForm } from '../data'

const testData:SerializedForm = { id: '48be90c9-3a9a-4fc6-9626-242a30febc05', type: 'FORM', control: 'col', direction: 'row', children: [], className: 'formial-form', attributes: [] }


describe('rendering', () => {
    test('plain adding', () => {
        const el = document.createElement('div')

        render(el, testData)
        expect(el.innerHTML).not.toBeFalsy()
    })
})
