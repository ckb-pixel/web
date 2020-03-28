import { SIZE, LENGTH } from './const'
import { Sample } from './mosaic'
import { client } from './Client'

export default class Snapshot {
  #showIdx: number|undefined
  #samplesList: Sample[][] = []
  #timer: ReturnType<typeof setTimeout> | undefined

  constructor() {
    this.start()
  }

  public start = () => {

    this.updateData()
    // update mock
    this.updateThumbnails()
  }

  public updateData = () => {
    client.getSnapshots().then((samplesList:any) => {
      this.#samplesList = samplesList
    }).then(() => this.updateThumbnails()).catch(err => {
      console.error(err)
    })
  }

  public updateThumbnails = () => {
    const frag = document.createDocumentFragment()
    this.#samplesList.forEach((samples: Sample[], idx: number) => {
      const thumbnail = this.createCanvas(samples, 10)
      thumbnail.addEventListener('click', () => {
        this.showSnapshot(idx)
      })
      frag.appendChild(thumbnail)
    })
    const container = document.querySelector('#history-items')
    if (container) {
      container.innerHTML = ''
      container.appendChild(frag)
    }
  }


  private showSnapshot = (index: number) => {
      let idx = index % this.#samplesList.length
      const dialog = document.querySelector<HTMLDialogElement>('#dialog')

      const snapshot = this.createCanvas(this.#samplesList[idx])

      if (dialog) {
        if (dialog.open) {
          const canvas = dialog.querySelector<HTMLCanvasElement>('canvas')
          canvas?.getContext('2d')?.drawImage(snapshot, 0, 0)
        } else {
          const prevBtn = document.createElement('button')
          prevBtn.innerText = 'Prev'
          const nextBtn = document.createElement('button')
          nextBtn.innerText = 'Next'
          const closeBtn =document.createElement('button')
          closeBtn.innerText='Close'

          const playBtn = document.createElement('button')
          playBtn.innerText =  this.#timer === undefined ? 'Play' : 'Stop'

          prevBtn.addEventListener('click', () => {
            this.showSnapshot(((--idx + this.#samplesList.length) % this.#samplesList.length))
          })
          nextBtn.addEventListener('click', () => {
            this.showSnapshot((++idx % this.#samplesList.length))
          })
          closeBtn.addEventListener('click', () => {
            clearInterval(this.#timer)
            this.#timer = undefined
            dialog.close()
          })

          playBtn.addEventListener('click', () => {
            if (playBtn.innerText === 'Play') {
              playBtn.innerText = "Stop"
              let i = idx
              this.showSnapshot((i++))
              this.#timer = setInterval(()=>{
                this.showSnapshot((i++))
              }, 500)
            } else {
              playBtn.innerText = "Play"
              clearInterval(this.#timer)
              this.#timer = undefined
            }
          })

          const btns = document.createElement('div')
          btns.className='dialog-footer'
          btns.appendChild(prevBtn)
          btns.appendChild(nextBtn)
          btns.appendChild(playBtn)
          btns.appendChild(closeBtn)

          dialog.innerHTML = ''
          dialog.appendChild(snapshot)
          dialog.appendChild(btns)

          dialog.showModal()
        }
      }
  }

  private createCanvas = (samples: Sample[], ratio: number = 1) => {
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
