import * as React from 'react'
import { Controls } from './controls'
import { EditPanel } from './edit-panel'



export const Sidebar:React.FC = () => (
    <div className="sidebar">
        <Controls />
        <EditPanel />
    </div>
)
