// import * as React from 'react'

export * from './builder'
export * from './builder/store'
export * from './data'

export class Foo {

    constructor() {
        console.log("new Foo")
    }

    speak() {
        console.log("hi from foo")
    }

}

// export { Builder }

// interface Props { }
//
// export const ExampleComponent = ({  }: Props) => {
//   return <Builder />
// }
