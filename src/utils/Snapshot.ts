import { SIZE, LENGTH } from './const'
import { Sample } from './mosaic'
import { client } from './Client'

export default class Snapshot {
  constructor() {
    this.updateSnapshots()
    // setInterval(() => {
    //   this.updateSnapshots()
    // }, 10000)
  }

  public updateSnapshots = () => {
    client.getSnapshots().then((samplesList: any) => {
      const frag = document.createDocumentFragment()
      samplesList.forEach((samples: Sample[]) => {
        const canvas = this.createSnapshot(samples)
        frag.appendChild(canvas)
      })
      const container = document.querySelector('#history-items')
      if (container) {
        container.innerHTML = ''
        container.appendChild(frag)
      }
    })
  }

  private createSnapshot = (samples: Sample[]) => {
    const ratio = 10
    const canvas = document.createElement('canvas')
    canvas.width = LENGTH / ratio
    canvas.height = LENGTH / ratio
    const ctx = canvas.getContext('2d')!
    samples.forEach(sample => {
      const color = `rgb(${sample.color.join(',')})`
      ctx.fillStyle = color
      ctx.fillRect(sample.coordinates[0] / ratio, sample.coordinates[1] / ratio, SIZE / ratio, SIZE / ratio)
    })
    return canvas
  }
}

export const snapshot = new Snapshot()
