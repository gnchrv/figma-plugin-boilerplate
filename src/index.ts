import * as lib from './lib'

if (figma.command === 'stick-to-top')    lib.stick('y', true)
if (figma.command === 'stick-to-bottom') lib.stick('y', false)
if (figma.command === 'stick-to-left')   lib.stick('x', true)
if (figma.command === 'stick-to-right')  lib.stick('x', false)

