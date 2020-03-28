import paper from 'paper/dist/paper-core'
import { SIZE, BORDER_COLOR } from './const'
import purchase from './purchase'

export interface Color {
  r: number
  g: number
  b: number
}

export interface Coordinates {
  x: number
  y: number
}

const rgbToHex = (color: Partial<Color>) => {
  const {r = 0,g = 0, b = 0} = color
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

export default class Editor {
  #selected: Coordinates | null = null
  #editor: HTMLFormElement
  #preview: HTMLDivElement

  constructor(){
    this.#editor = document.querySelector<HTMLFormElement>('#editor')!
    this.#preview = document.querySelector<HTMLDivElement>('.color')!

    if (!this.#editor || !this.#preview) {
      throw new Error("Failed to initialize editor")
    }

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
    Object.keys(coordinates).forEach((key:'x'|'y') => {
      this.#editor[key].value = coordinates[key]
    })
  }

  public submit = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
    purchase()
    console.log(`submit: ${JSON.stringify(this.color)}, ${JSON.stringify(this.coordinates)}`)
  }

  public selected = (coordinates: Coordinates, color?: Color) => {
    this.#selected = coordinates
    this.coordinates = {
      x: coordinates.x/SIZE + 0.5,
      y: coordinates.y/SIZE + 0.5,
    }
    if (color) {
      this.color = color
    }
    this.#editor.querySelector('button')?.disabled = false
  }

  public unselected = () => {
    this.#selected = null
    this.#editor.querySelector('button')?.disabled = true
  }

  private updatePreview = ()=>{
    const previewColor = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`
    this.#preview.style.backgroundColor = previewColor
    const text = `${previewColor.toUpperCase()}\n${rgbToHex(this.color).toUpperCase()}`
    this.#preview.querySelector('span')?.innerText = text
    if (this.#selected){
      const path = new paper.Path.Rectangle(new paper.Point(this.#selected.x -SIZE/2, this.#selected.y -SIZE/2), new paper.Size(SIZE, SIZE))
      path.fillColor = new paper.Color(previewColor)
      path.strokeColor = new paper.Color(BORDER_COLOR)
    }
  }

  private registerEvents = () => {
    this.#editor.onchange = this.updatePreview
    this.#editor.onsubmit = this.submit
  }

}

export const editor = new Editor()
