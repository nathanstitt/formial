# formial

A simple drag and drop form builder and renderer.

[![NPM](https://img.shields.io/npm/v/formial.svg)](https://www.npmjs.com/package/formial)
[![Actions Status](https://github.com/nathanstitt/formial/workflows/CI%20checks/badge.svg)](https://github.com/nathanstitt/formial/actions)

![Screenshot](screenshot.png "Screenshot of Editing Interface")

Demo can be viewed at [https://nathanstitt.github.io/formial/](https://nathanstitt.github.io/formial/)

Editing is a React application with the only major dependency being react-dnd.  The form's data
renderer is standalone and renders using only DOM manipulation.


## Install

```bash
npm install --save formial
```

## Usage

Example from [example/src/App.tsx](example/src/App.tsx)

```tsx
import React, { Component } from 'react'
import { Editor, Container, render } from 'formial'

 // this would normally be loaded from server
const DEFAULT = {"id":"4f78521b-59a8-4069-8ae8-8b0c793d9f5e","type":"FORM","control":"col","className":"","direction":"row","children":[{"id":"5421839e-6592-4c7b-aea6-72dd889f2354","type":"TEXT","control":"heading","tag":"h3","text":"Hello World!","className":""}]}

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
  Called anytime the form is modified.  A form should not be saved as-is, but provides a "serialized()" method that can be called to obtain the "SerializedForm" structure that can be saved

* defaultValue?: [SerializedForm](src/data.ts#L45)
  Initial state of form editor.

* value?:[SerializedForm](src/data.ts#L45)
  Form state will reset to this whenever value changes.  Note that setting "value" does
  not exactly match the normal behavior of a controlled input.  The form state can still be
  modified but will reset to value whenever it's changed.

## Styling

The editor is styled using styled-components but also assigns class names to elements to they can be overridden. The controls on the editor default to assigning elements bootstrap classes.

The form renderer does not include any styles by itself.  The demo loads the bootstrap 5 alpha styles on the page in order to show what's possible.

## Raison d'être

Formial was written for use by the [MyClientSpot](https://myclientspot.com/) project management application.  Customers can use it to easily build or customize premade forms and then embed them in their websites to feed data into their workflows.  It was important that the builder be easy to use and the rendering be very lightweight since it's intended to be loaded onto foreign websites.

Other form builders that were evaluated:

* https://github.com/Draggable/formeo - was almost perfect but the editor's drag and drop seemed a little hard to use, and it wasn't easy to customize.  I went pretty far with it, and even contributed a few PR's to the project though.

* https://github.com/andrewhathaway/Winterfell - very powerful forms, but no builder, and project hasn't been updated in a few years.  I considered using it's schema for the builder but ultimately decided it was too complex.

* https://github.com/blackjk3/react-form-builder - almost what I was looking for but seemed only semi-maintained and had quite a few complex inputs that were unwanted.  The rendering was a pretty large JS bundle.

## License

MIT © [nathanstitt](https://github.com/nathanstitt/formial)
