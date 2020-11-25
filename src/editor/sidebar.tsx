import * as React from 'react'
import styled from 'styled-components'

import { Controls } from './controls'
import { EditPanel } from './edit-panel'

const SidebarEl = styled.div({
//    paddingRight: '10px',
    overflow: 'hidden',
    display: 'flex',
    '> *': {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        flexGrow: 1,
        minHeight: 0,         /* for Firefox */
    },
    ul: {
        padding: 0,
        margin: 0,
    },
})
export const Sidebar:React.FC = () => {
    return (
        <SidebarEl className="sidebar">
            <Controls />
            <EditPanel />
        </SidebarEl>
    )
}
