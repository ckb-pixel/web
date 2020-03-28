import { LENGTH } from './const'
import { client } from './Client'
import mosaic from './mosaic'
import { data } from './Data'

client.getCurrentPixels()
export const updatePaper = () => {
  client.getCurrentPixels().then(samples => {
    const canvas = document.querySelector<HTMLCanvasElement>('#paper')
    mosaic(data.samples, canvas)
  })
}

export const initPaper = () => {
  const canvas = document.querySelector<HTMLCanvasElement>('#paper')
  if (canvas) {
    canvas.width = LENGTH
    canvas.height = LENGTH
    const samples = data.samples
    mosaic(samples, canvas)
  }
}

export const start = () => {
  initPaper()

  updatePaper()
  setInterval(updatePaper, 10000)
}
