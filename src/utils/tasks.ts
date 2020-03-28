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
    document.body.classList.add('loaded')
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

export const updateIpoInfo = () => {
  client.getIpoInfo().then(res => {
    const address = res?.attributes.from_address
    if (address) {
      const title = document.querySelector('.main-title')
      if (title) {
        const text = document.createElement('div')
        text.innerText = `Thranks for your support\n${address}`
        text.className = 'support'
        title.appendChild(text)
      }
    }
  })
}

export const start = () => {
  /**
   * init the paper
   */
  initPaper()

  updateIpoInfo()

  /**
   * start pooling the current state
   */
  const INTERVAL_TIME = 10000
  updatePaper()
  setInterval(updatePaper, INTERVAL_TIME)

  /**
   * update the snapshots
   */
  snapshot.start()
}
