import { unserialize, render } from './render'
import { SerializedContainer } from './data'

const testData:SerializedContainer = {
    "id":"76b0d6a2-42e5-4fe2-8aca-6890da67fdb9","type":"CONTAINER",
    "control":"row","className":"","sizes":{"mobile":12,"tablet":12,"desktop":12},
    "direction":"row","children":[
        {"id":"96b89150-af88-4eb3-82b9-19308e8486f0","type":"TEXT",
         "control":"heading","tag":"h3","text":"Some text…","className":"",
         "sizes":{"mobile":12,"tablet":12,"desktop":12}
        },
        {"id":"77713daa-4737-4e3d-8446-48107f47518a","type":"TEXT","control":"para","tag":"p","text":"Some text…","className":"","sizes":{"mobile":12,"tablet":12,"desktop":12}},{"id":"aaf16903-5bd9-4413-b7cc-ecc391268047","type":"CONTAINER","control":"row","className":"","sizes":{"mobile":12,"tablet":12,"desktop":12},"direction":"row","children":[{"id":"81e5862f-a486-434f-ad80-290d2c621dbe","type":"CONTAINER","control":"col","className":"","sizes":{"mobile":12,"tablet":12,"desktop":12},"direction":"column","children":[{"id":"d1193125-3e5f-4d8f-abe6-d92f6bb2592a","type":"INPUT","control":"input","label":"Text Input label","className":"","sizes":{"mobile":12,"tablet":12,"desktop":12},"name":"","classNames":{"wrapper":"form-group","label":"col-sm-2","input":"form-control col-sm-10"},"attributes":{}},{"id":"d2c5f08e-430b-46f3-946a-3cb240b88f5c","type":"INPUT","control":"select","label":"Select label","className":"","sizes":{"mobile":12,"tablet":12,"desktop":12},"name":"","classNames":{"wrapper":"form-group","label":"col-sm-2","input":"form-control col-sm-10"},"attributes":{},"options":{"one":"one","two":"two","three":"three"}}]},{"id":"70234ab0-667d-45ae-af5f-90c9bafb70f9","type":"CONTAINER","control":"col","className":"","sizes":{"mobile":12,"tablet":12,"desktop":12},"direction":"column","children":[{"id":"691949ba-6fe1-437e-b8ea-63a9c2b12eb7","type":"INPUT","control":"textarea","label":"Text Area label","className":"","sizes":{"mobile":12,"tablet":12,"desktop":12},"name":"","classNames":{"wrapper":"form-group","label":"col-sm-2","input":"form-control col-sm-10"},"attributes":{}}]}]}]
}

describe('rendering', () => {

    test('plain adding', () => {

        const el = document.createElement('div')

        render(el, testData)
        console.log(el.innerHTML)
    })


})
