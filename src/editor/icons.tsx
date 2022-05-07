import React from 'react'

import { Icon, IconifyIcon } from '@iconify/react'

export type IconProps = Omit<IconifyIcon, 'icon' | 'body'>

import csdd from '@iconify-icons/fa-regular/caret-square-down'
export const CaretSquareDown = (props:IconProps) => <Icon {...props} icon={csdd} />

import fd from '@iconify-icons/fa-solid/font'
export const Font = (props:IconProps) => <Icon {...props} icon={fd} />

import gld from '@iconify-icons/fa-solid/grip-lines'
export const GripLines = (props:IconProps) => <Icon {...props} icon={gld} />

import sqd from '@iconify-icons/fa-solid/square'
export const Square = (props:IconProps) => <Icon {...props} icon={sqd} />

import hd from '@iconify-icons/fa-solid/heading'
export const Heading = (props:IconProps) => <Icon {...props} icon={hd} />

import pd from '@iconify-icons/fa-solid/paragraph'
export const Paragraph = (props:IconProps) => <Icon {...props} icon={pd} />

import glvd from '@iconify-icons/fa-solid/grip-lines-vertical'
export const GripLinesVertical = (props:IconProps) => <Icon {...props} icon={glvd} />

import dcd from '@iconify-icons/fa-solid/dot-circle'
export const DotCircle = (props:IconProps) => <Icon {...props} icon={dcd} />

import csd from '@iconify-icons/fa-solid/check-square'
export const CheckSquare = (props:IconProps) => <Icon {...props} icon={csd} />

import ghd from '@iconify-icons/fa-solid/grip-horizontal'
export const GripHorizontal = (props:IconProps) => <Icon {...props} icon={ghd} />

import tad from '@iconify-icons/fa-solid/trash-alt'
export const TrashAlt = (props:IconProps) => <Icon {...props} icon={tad} />

import ed from '@iconify-icons/fa-solid/edit'
export const Edit = (props:IconProps) => <Icon {...props} icon={ed} />
