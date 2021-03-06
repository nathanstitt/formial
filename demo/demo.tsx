import * as React from 'react'
import '../src/editor/styles.scss'
import { Editor, render, FormRef } from '../src'
import './demo.css'
import 'bootstrap/scss/bootstrap.scss'

const DEFAULT = { "id": "48be90c9-3a9a-4fc6-9626-242a30febc05", "type": "FORM", "control": "col", "direction": "row", "children": [{ "id": "d69b7300-312a-4b8b-9da9-b616e987b8b4", "type": "TEXT", "control": "heading", "tag": "h3", "text": "Hello World", "className": "" }, { "id": "9e2e85b9-b24e-4d51-b126-a7f5c579039a", "type": "TEXT", "control": "para", "name": "para-9368", "tag": "p", "text": "Please, tell us a bit about yourself", "className": "" }, { "id": "91a1e96a-e603-4dd7-92fd-14b4090c4754", "type": "CONTAINER", "control": "col", "name": "col-7258", "direction": "column", "children": [{ "id": "09f04ad7-b72b-481d-90c4-535bb5b1b632", "type": "CONTAINER", "control": "row", "name": "row-1462", "direction": "row", "children": [{ "id": "e6b074bf-4c4d-447e-890a-bb52bc24aece", "type": "INPUT", "control": "input", "name": "name", "label": "Your name", "className": "mb-2", "classNames": { "wrapper": "form-floating", "label": "", "input": "form-control" }, "attributes": [{ "id": "type", "value": "text" }, { "id": "required", "value": "true" }] }, { "id": "051dc23f-d3b6-4783-a45d-54f6f4801ba2", "type": "INPUT", "control": "input", "name": "email", "label": "Email", "className": "mb-2", "classNames": { "wrapper": "form-floating", "label": "", "input": "form-control" }, "attributes": [{ "id": "required", "value": "true" }, { "id": "type", "value": "email" }] }, { "id": "11fa0234-0c92-4a2c-864e-668cd8580fd8", "type": "INPUT", "control": "textarea", "name": "address", "label": "Address", "className": "mb-2", "classNames": { "wrapper": "form-floating", "label": "", "input": "form-control" }, "attributes": [] }], "className": "", "attributes": [] }, { "id": "05df9d75-a59f-4f44-99bb-c37bd17db17d", "type": "CONTAINER", "control": "row", "name": "row-10995", "direction": "row", "children": [{ "id": "1d1b3a3d-88b0-4ca2-979b-4fb231c33f9a", "type": "INPUT", "control": "checkbox", "name": "foods", "options": [{ "id": "steak", "value": "Steak" }, { "id": "tomatoe", "value": "Tomato" }, { "id": "pinapple", "value": "Pineapple" }, { "id": "spinach", "value": "Spinach" }, { "id": "candy", "value": "Candy" }, { "id": "broccoli ", "value": "Broccoli" }], "choicesLayout": "vertical", "label": "Which foods do you like?", "className": "mb-2", "classNames": { "wrapper": "form-control", "label": "", "input": "form-control" }, "attributes": [] }, { "id": "7a16f198-cac0-440e-93a8-3c0bc153184e", "type": "INPUT", "control": "radio", "name": "cats", "options": [{ "id": "1", "value": "One" }, { "id": "2", "value": "Two" }, { "id": "3", "value": "Three" }], "choicesLayout": "vertical", "label": "How many Cats?", "className": "mb-2", "classNames": { "wrapper": "form-control", "label": "", "input": "form-control" }, "attributes": [] }, { "id": "b8a55c2a-6044-4672-a384-74be779b8f95", "type": "INPUT", "control": "select", "name": "number", "options": [{ "id": "2", "value": "2" }, { "id": "1", "value": "one" }, { "id": "5", "value": "5" }, { "id": "42", "value": "forty two" }], "label": "Pick a number", "className": "mb-2", "classNames": { "wrapper": "form-floating", "label": "", "input": "form-control" }, "attributes": [] }], "className": "", "attributes": [] }], "className": "", "attributes": [] }], "className": "formial-form", "attributes": [] }


const Demo = () => {
    const formRef = React.useRef<FormRef>(null)
    const htmlRef = React.useRef(null)

    const renderHTML = () => {
        if (!formRef.current) return
        // json would normally be saved.
        // It's intended to be loading back into the editor or rendered to a form
        const json = formRef.current.form.serialize()

        console.log(JSON.stringify(json))
        render(htmlRef.current!, json)

        formRef.current.clear()
    }

    return (
        <div id="example-builder">
            <h3>Formial Demo</h3>
            <p>
                This is an example of Formial editing and rendering forms.  The source
                code for this demo can be viewed in <a href="https://github.com/nathanstitt/formial/blob/main/demo/demo.tsx">demo/demo.tsx</a>.
            </p>
            <Editor formRef={formRef} defaultValue={DEFAULT} />
            <hr />
            <div><button onClick={renderHTML}>Render</button></div>
            <hr />
            <div className="mb-4" ref={htmlRef}></div>
        </div>
    )
}

export default Demo
