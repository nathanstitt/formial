import React from 'react'

import { Builder, Container } from 'formial'

import 'formial/dist/index.css'

const onChange = (container: Container) => {
    console.log(container)
}

const App = () => {

    return (
        <div id="example-builder">
            <Builder onChange={onChange}/>
        </div>
    )
}

export default App
