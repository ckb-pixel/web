import { LENGTH } from './utils/const'
import { data } from './utils/Data'
import mosaic from './utils/mosaic'
import './utils/Snapshot'

const init = () => {
  const canvas = document.querySelector<HTMLCanvasElement>('#paper')
  if (canvas) {
    canvas.width = LENGTH
    canvas.height = LENGTH
    const samples = data.samples
    mosaic(samples, canvas)
  }
}

window.onload = init
