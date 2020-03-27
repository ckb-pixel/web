import { LENGTH } from './utils/const'
import { editor } from './utils/Editor'
import mosaic, { Sample } from './utils/mosaic'
import mock from './utils/mock'

const init = () => {
  const canvas = document.querySelector<HTMLCanvasElement>('#paper')
  canvas.width = LENGTH
  canvas.height = LENGTH
  mosaic(mock as Sample[], canvas)
}

window.onload = init
