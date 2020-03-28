import { SIZE } from './const'
import { Sample } from './mosaic'
import paper from 'paper/dist/paper-core'
export default class Data {
  #key = 'samples'
  #samples: Sample[]= []
  cells: paper.Path.Rectangle[] = []
  constructor(){
    this.load()
  }

  get samples(){
    return this.#samples || []
  }
  public load = () => {
    const local  = window.localStorage.getItem(this.#key)
    try {
      this.#samples = JSON.parse(local!)
    } catch {
      // ignore
    }
  }

  public save = () => {
    try{
      window.localStorage.setItem(this.#key, JSON.stringify(this.#samples))
    }catch{
      //ignore
    }
  }

  public update = (samples: Sample[]) => {
    this.#samples = samples
    setTimeout(() => {
      this.save()
    },1000)
  }

  public getCell = (sample: Pick<Sample, 'coordinates'>) => {
    return this.cells.find(c => {
      return (
        c?.position?.x &&
        c.position.x - SIZE / 2 === sample.coordinates[0] &&
        c?.position?.y &&
        c.position.y - SIZE / 2 === sample.coordinates[1]
      )
    })
  }

}

export const data = new Data()
