import { SIZE } from './const'

export interface Color {
  r: number
  g: number
  b: number
}

export interface Coordinates {
  x: number
  y: number
}

export default class Editor {
  #selected: Coordinates | null
  #editor: HTMLFormElement
  #preview: HTMLDivElement

  constructor(){
    this.#editor = document.querySelector<HTMLFormElement>('#editor')
    this.#preview = document.querySelector<HTMLDivElement>('.color')

    this.registerEvents()
  }

  get color(){
    return {
      r: +this.#editor.r.value,
      g: +this.#editor.g.value,
      b: +this.#editor.b.value,
    }
  }

  set color(color: Partial<Color>) {
    Object.keys(color).forEach(key => {
      this.#editor[key].value = color[key]
    })
    this.updatePreview()
  }

  get coordinates(){
    return {
      x: +this.#editor.x.value,
      y: +this.#editor.y.value,
    }
  }

  set coordinates(coordinates: Partial<Coordinates>){
    Object.keys(coordinates).forEach(key => {
      this.#editor[key].value = coordinates[key]
    })
  }

  public submit = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
    console.log(`submit: ${JSON.stringify(this.color)}, ${JSON.stringify(this.coordinates)}`)
  }

  public selected = (coordinates: Coordinates) => {
    this.#selected = coordinates
    this.#editor.querySelector('button').disabled = true
  }

  public unselected = () => {
    this.#selected = null
    this.#editor.querySelector('button').disabled = false
  }

  private updatePreview = ()=>{
    const previewColor = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`
    this.#preview.style.backgroundColor = previewColor
    // TODO: render the preview in the paper
  }

  private registerEvents = () => {
    this.#editor.onchange = this.updatePreview
    this.#editor.onsubmit = this.submit
  }

}

export const editor = new Editor()
