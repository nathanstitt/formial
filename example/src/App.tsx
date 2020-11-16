import React from 'react'
import { Builder, Container, render } from 'formial'
import 'formial/dist/index.css'

const DEFAULT = {
    "id":"6ae4215f-3525-4579-9570-2aae04b8cb01","type":"CONTAINER","control":"row","className":"","sizes":{"mobile":12,"tablet":12,"desktop":12},"attributes":{},"direction":"row","children":[{"id":"bd2d9c73-ad51-41a5-9e4a-a6cd7c55360c","type":"TEXT","control":"heading","tag":"h2","text":"How are you?","className":"","sizes":{"mobile":12,"tablet":12,"desktop":12}},{"id":"76aba5db-a017-4035-859d-5a7bd236a715","type":"TEXT","control":"para","tag":"p","text":"A few questions...","className":"","sizes":{"mobile":12,"tablet":12,"desktop":12}},{"id":"d6e17987-cb4b-41fc-806b-822d70ce8137","type":"CONTAINER","control":"row","className":"","sizes":{"mobile":12,"tablet":12,"desktop":12},"attributes":{},"direction":"row","children":[{"id":"5962abf3-4c66-4e27-a54f-8811a73b1c98","type":"CONTAINER","control":"col","className":"","sizes":{"mobile":12,"tablet":12,"desktop":12},"attributes":{},"direction":"column","children":[{"id":"29550f94-a533-43c1-857c-a5228a7bf728","type":"INPUT","control":"input","label":"Your Name?","className":"","sizes":{"mobile":12,"tablet":12,"desktop":12},"name":"name","classNames":{"wrapper":"form-group","label":"col-sm-2","input":"form-control col-sm-10"},"attributes":{}},{"id":"4427f619-93ab-4fa8-b6de-02d374136451","type":"INPUT","control":"textarea","label":"Your Message","className":"","sizes":{"mobile":12,"tablet":12,"desktop":12},"name":"message","classNames":{"wrapper":"form-group","label":"col-sm-2","input":"form-control col-sm-10"},"attributes":{}}]},{"id":"1ff69d7a-8e4e-44ca-b38f-cc030a7fffa2","type":"CONTAINER","control":"col","className":"","sizes":{"mobile":12,"tablet":12,"desktop":12},"attributes":{},"direction":"column","children":[{"id":"50920478-751b-4cf0-b18d-3e60c58c9cb8","type":"INPUT","control":"checkbox","label":"Favorite Letter?","className":"","sizes":{"mobile":12,"tablet":12,"desktop":12},"name":"fav-letter","classNames":{"wrapper":"form-group","label":"col-sm-2","input":"form-control col-sm-10"},"attributes":{},"options":{"a":"A","B":"B","C":"C"}},{"id":"b75dd548-134b-4db3-98ce-7fdf1badcc71","type":"INPUT","control":"radio","label":"How Many Cats?","className":"","sizes":{"mobile":12,"tablet":12,"desktop":12},"name":"how-many-cats","classNames":{"wrapper":"form-group","label":"col-sm-2","input":"form-control col-sm-10"},"attributes":{},"options":{"one":"1","two":"2","three":"3"}},{"id":"5ff73217-de33-4dc4-b5d4-9d2972f3ca82","type":"INPUT","control":"select","label":"Select label","className":"","sizes":{"mobile":12,"tablet":12,"desktop":12},"name":"","classNames":{"wrapper":"form-group","label":"col-sm-2","input":"form-control col-sm-10"},"attributes":{},"options":{"one":"one","two":"two","three":"three"}}]}]}]
}

const App = () => {
    const [value, setValue] = React.useState<Container>()
    const htmlRef = React.useRef(null)

    const onChange = (container: Container) => {

        setValue(container)
    }

    const renderHTML = () => {
        console.log(value?.serialized)
        render(htmlRef.current!, value!.serialized)
    }

    return (
        <div id="example-builder">
            <Builder onChange={onChange} defaultValue={DEFAULT} />
            <hr />
            <div><button onClick={renderHTML}>Render</button></div>
            <hr />
            <div ref={htmlRef}></div>
        </div>
    )
}

export default App