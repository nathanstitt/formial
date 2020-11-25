import styled from 'styled-components'
//import * as React from 'react'

export const Title = styled.h4.attrs({
    className: 'title',
})({
    borderBottom: '1px solid lightgray',
    padding: '5px 0',
})

export const Scrolling = styled.div({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: 0,
    paddingRight: '10px',
})

export const Values = styled.div({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minHeight: 0,
    overflow: 'hidden',
})
