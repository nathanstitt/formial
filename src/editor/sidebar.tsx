import * as React from 'react'
import styled from 'styled-components'

import { Controls } from './controls'
import { EditPanel } from './edit-panel'

const SidebarEl = styled.div({
    overflow: 'hidden',
    display: 'flex',
    '> *': {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        flexGrow: 1,
        minHeight: 0, /* for Firefox */
    },
    ul: {
        padding: 0,
        margin: 0,
    },
})
export const Sidebar:React.FC = () => (
    <SidebarEl className="sidebar">
        <Controls />
        <EditPanel />
    </SidebarEl>
)
