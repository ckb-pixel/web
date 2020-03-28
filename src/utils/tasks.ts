import { LENGTH } from './const'
import { client } from './Client'
import mosaic from './mosaic'
import { data } from './Data'

client.getCurrentPixels()
export const updatePaper = () => {
  client.getCurrentPixels().then(samples => {
    const canvas = document.querySelector<HTMLCanvasElement>('#paper')
    if (canvas) {
      mosaic(data.samples, canvas)
    }
    document.body.classList.remove('initing')
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
  const INTERVAL_TIME = 10000

  updatePaper()
  // setInterval(updatePaper, INTERVAL_TIME)
}
