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
      this.#samples = JSON.parse(local)
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

  public fetch () {
    // TODO:
  }

}

export const data = new Data()
