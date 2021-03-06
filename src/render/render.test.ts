import { render } from '../render'
import { SerializedForm } from '../data'

const testData:SerializedForm = {
    id: '48be90c9-3a9a-4fc6-9626-242a30febc05',
    type: 'FORM',
    control: 'col',
    className: 'formial-form',
    attributes: [],
    direction: 'row',
    children: [
        {
            id: '051dc23f-d3b6-4783-a45d-54f6f4801ba2',
            type: 'INPUT',
            control: 'input',
            name: 'email',
            label: 'Email',
            className: 'mb-2',
            classNames: { wrapper: 'form-floating', label: '', input: 'form-control' },
            attributes: [
                { id: 'required', value: 'true' },
                { id: 'type', value: 'email' },
            ],
        },
        {
            id: 'bee89fae-9075-415e-b4b9-82c587c4ef10',
            type: 'INPUT',
            control: 'input',
            name: 'tn',
            label: 'test name',
            className: 'mb-2',
            classNames: {
                wrapper: 'form-floating', label: '', input: 'form-control',
            },
            attributes: [],
        },
    ],
}


describe('rendering', () => {
    test.only('plain', () => {
        const el = document.createElement('div')
        render(el, testData)
        const input = el.querySelector('input[type="text"]')
        expect(input).toBeTruthy()
        expect(input?.outerHTML).toEqual(
            '<input name="tn" id="bee89fae-9075-415e-b4b9-82c587c4ef10" class="form-control" placeholder="test name" type="text">',
        )
    })
    test('email', () => {
        const el = document.createElement('div')
        render(el, testData)
        const email = el.querySelector('input[type="email"]')
        expect(email).toBeTruthy()
        expect(email?.outerHTML).toEqual(
            '<input name="email" id="051dc23f-d3b6-4783-a45d-54f6f4801ba2" class="form-control" type="email" placeholder="Email" required="true">',
        )
    })
})
