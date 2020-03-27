import { LENGTH } from './utils/const'
import { data } from './utils/Data'
import mosaic from './utils/mosaic'
import { client } from './utils/Client'

const init = () => {
  const canvas = document.querySelector<HTMLCanvasElement>('#paper')
  ;(window as any).client = client
  if (canvas) {
    canvas.width = LENGTH
    canvas.height = LENGTH
    const samples = data.samples
    mosaic(samples, canvas)
  }
}

window.onload = init
