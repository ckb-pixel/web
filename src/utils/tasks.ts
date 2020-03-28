import { LENGTH } from './const'
import { client } from './Client'
import mosaic from './mosaic'
import { data } from './Data'
import { snapshot } from './Snapshot'

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
  /**
   * init the paper
   */
  // initPaper()

  /**
   * start pooling the current state
   */
  // const INTERVAL_TIME = 10000
  // updatePaper()
  // setInterval(updatePaper, INTERVAL_TIME)

  /**
   * update the snapshots
   */
  snapshot.start()
}
