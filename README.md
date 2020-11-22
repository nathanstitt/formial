# formial

A simple drag and drop form builder and renderer.

[![NPM](https://img.shields.io/npm/v/formial.svg)](https://www.npmjs.com/package/formial)
[![Actions Status](https://github.com/nathanstitt/formial/workflows/CI%20checks/badge.svg)](https://github.com/nathanstitt/formial/actions)

![Screenshot](screenshot.png "Screenshot of Editing Interface")

Demo can be viewed at [https://nathanstitt.github.io/formial/](https://nathanstitt.github.io/formial/)

Editing is a React application with the only major depenedency being react-dnd.  The form's data
renderer is standalong and renders using only DOM manipulation.


## Install

```bash
npm install --save formial
```

## Usage

Example from [example/src/App.tsx](example/src/App.tsx)

```tsx
import React, { Component } from 'react'
import { Editor, Container, render } from 'formial'

const DEFAULT = {} // this would normally be loaded from server

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

```

## Editor Props

* className?: string

* onChange?(form: Form): void
  Called anytime the form is modified

* defaultValue?: SerializedForm
  Initial state of form editor.

* value?: SerializedForm
  Form state will reset to this whenever value changes.  Note that setting "value" does
  not exactly match the normal behavior of a controlled input.  The form state can still be
  modified but will reset to value whenever it's changed.

## License

MIT © [nathanstitt](https://github.com/nathanstitt/formial)
