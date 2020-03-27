import { LENGTH } from './utils/const'
import { data } from './utils/Data'
import mosaic, { Sample } from './utils/mosaic'

const init = () => {
  const canvas = document.querySelector<HTMLCanvasElement>('#paper')
  canvas.width = LENGTH
  canvas.height = LENGTH
  const samples = data.samples
  mosaic(samples, canvas)
}

window.onload = init
