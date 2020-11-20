import React from 'react'
import { Editor, Container, render } from 'formial'

const DEFAULT = {"id":"4f78521b-59a8-4069-8ae8-8b0c793d9f5e","type":"FORM","control":"col","className":"","direction":"row","children":[{"id":"5421839e-6592-4c7b-aea6-72dd889f2354","type":"TEXT","control":"heading","tag":"h3","text":"Hello!","className":""},{"id":"31650e8e-a0ee-4c2b-a35d-5d5c344fabd0","type":"TEXT","control":"para","tag":"p","text":"Tell us something about yourself","className":""},{"id":"e22f3d00-6d2a-4f26-a813-e5581636ae77","type":"CONTAINER","control":"col","className":"","direction":"column","children":[{"id":"2f6ada7b-28bb-4a8a-a318-553fd357717b","type":"CONTAINER","control":"row","className":"","direction":"row","children":[{"id":"fe50d0bb-ed56-4870-a79c-2a9cf03eacd8","type":"INPUT","control":"input","label":"What's your name?","className":"mb-2","name":"input-5597","classNames":{"wrapper":"form-floating","label":"","input":"form-control"},"attributes":{}},{"id":"70353b38-ff98-46f6-91af-846aeb1881d0","type":"INPUT","control":"textarea","label":"What do you like?","className":"flex-fill","name":"textarea-2452","classNames":{"wrapper":"form-floating mb-2","label":"","input":"form-control"},"attributes":{}}]},{"id":"2b9bed3e-647e-4559-b60e-6e8b6a2427f7","type":"CONTAINER","control":"row","className":"","direction":"row","children":[{"id":"80a4df1f-d041-4f9b-b1fc-cd68964a6e7d","type":"INPUT","control":"checkbox","label":"Fruits you like","className":"","name":"checkbox-10613","classNames":{"wrapper":"form-control mb-2","label":"","input":"form-control"},"attributes":{},"options":{"1":"Bannana","2":"Orange","3":"Mango"}},{"id":"233acef5-b749-4478-8179-142c5635d181","type":"INPUT","control":"radio","label":"How Many Cats?","className":"","name":"radio-7972","classNames":{"wrapper":"form-control mb-2","label":"","input":"form-control"},"attributes":{},"options":{"1":"one","2":"two","3":"three"}},{"id":"7e7af9f4-1e35-4c4b-af81-e52b9ff7b245","type":"INPUT","control":"select","label":"Pick a number","className":"","name":"select-2778","classNames":{"wrapper":"form-floating mb-2","label":"","input":"form-control"},"attributes":{},"options":{"1":"one","2":"two","3":"three","4":"four","5":"five"}}]}]}]
}


const App = () => {
    const [value, setValue] = React.useState<Container>()
    const htmlRef = React.useRef(null)

    const onChange = (container: Container) => setValue(container)

    const renderHTML = () => {
        // json would normally be saved.
        // It's intended to be loading back into the editor or rendered to a form
        const json = value!.serialize()
        console.log(JSON.stringify(json))
        render(htmlRef.current!, json)
    }

    return (
        <div id="example-builder">
            <Editor onChange={onChange} defaultValue={DEFAULT}  />
            <hr />
            <div><button onClick={renderHTML}>Render</button></div>
            <hr />
            <div ref={htmlRef}></div>
        </div>
    )
}

export default App
