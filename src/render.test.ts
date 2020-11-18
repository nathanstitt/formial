import { render } from './render'
import { SerializedContainer } from './data'

const testData:SerializedContainer = {
    "id":"4f78521b-59a8-4069-8ae8-8b0c793d9f5e","type":"CONTAINER","control":"col","className":"","direction":"col","children":[{"id":"2eb112bb-60ff-47a5-9ae0-f93ea3792014","type":"INPUT","control":"textarea","label":"Text Area label","className":"","name":"textarea-5470","classNames":{"wrapper":"form-floating mb-2","label":"","input":"form-control"},"attributes":{"":""}},{"id":"e22f3d00-6d2a-4f26-a813-e5581636ae77","type":"CONTAINER","control":"row","className":"","direction":"row","children":[{"id":"2f6ada7b-28bb-4a8a-a318-553fd357717b","type":"CONTAINER","control":"col","className":"","direction":"column","children":[{"id":"13112ece-52d3-4fe2-874c-939eb4429b6a","type":"TEXT","control":"para","tag":"p","text":"Some text…","className":""},{"id":"70353b38-ff98-46f6-91af-846aeb1881d0","type":"INPUT","control":"textarea","label":"Text Area label","className":"","name":"textarea-2452","classNames":{"wrapper":"form-floating mb-2","label":"","input":"form-control"},"attributes":{}}]},{"id":"2b9bed3e-647e-4559-b60e-6e8b6a2427f7","type":"CONTAINER","control":"col","className":"","direction":"column","children":[{"id":"80a4df1f-d041-4f9b-b1fc-cd68964a6e7d","type":"INPUT","control":"checkbox","label":"Checkboxes label","className":"","name":"checkbox-10613","classNames":{"wrapper":"form-control mb-2","label":"","input":"form-control"},"attributes":{},"options":{"1":"one","2":"two","3":"three"}},{"id":"233acef5-b749-4478-8179-142c5635d181","type":"INPUT","control":"radio","label":"Radio Input label","className":"","name":"radio-7972","classNames":{"wrapper":"form-control mb-2","label":"","input":"form-control"},"attributes":{},"options":{"1":"one","2":"two","3":"three"}},{"id":"7e7af9f4-1e35-4c4b-af81-e52b9ff7b245","type":"INPUT","control":"select","label":"Select label","className":"","name":"select-2778","classNames":{"wrapper":"form-floating mb-2","label":"","input":"form-control"},"attributes":{},"options":{"1":"one","2":"two","3":"three","":""}}]}]}]
}

describe('rendering', () => {

    test('plain adding', () => {

        const el = document.createElement('div')

        render(el, testData)
        expect(el.innerHTML).not.toBeFalsy()
    })


})
