import { createRoot } from 'react-dom/client'
import * as React from 'react'
import Demo from './demo'

window.addEventListener('DOMContentLoaded', (event) => {
    const el = document.getElementById('app-root')
    const root = createRoot(el)
    root.render(<React.StrictMode><Demo /></React.StrictMode>)
});
