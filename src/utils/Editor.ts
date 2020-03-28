import paper from 'paper/dist/paper-core'
import { SIZE } from './const'
import {data} from './Data'
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
    Object.keys(color).forEach((key: string) => {
      this.#editor[key].value = color[key as keyof typeof color]
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
    Object.keys(coordinates).forEach((key: string) => {
      this.#editor[key].value = coordinates[key as keyof typeof coordinates]
    })
  }

  public submit = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
    purchase({coordinates: this.coordinates, color: this.color})
  }

  public selected = (coordinates: Coordinates, color?: Color) => {
    this.#selected = coordinates
    this.coordinates = {
      x: coordinates.x / SIZE + 0.5,
      y: coordinates.y / SIZE + 0.5,
    }
    if (color) {
      this.color = color
    }
    this.#editor.querySelector<HTMLButtonElement>('button[type=submit]')!.disabled = false
  }

  public unselected = () => {
    this.#selected = null
    this.#editor.querySelector<HTMLButtonElement>('button[type=submit]')!.disabled = true
  }

  private updatePreview = ()=>{
    const previewColor = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`
    this.#preview.style.backgroundColor = previewColor
    const text = `${previewColor.toUpperCase()}\n${rgbToHex(this.color).toUpperCase()}`
    this.#preview.querySelector('span')!.innerText = text
    if (this.#selected) {
      const cell = data.getCell({coordinates: [this.#selected.x - SIZE / 2, this.#selected.y - SIZE / 2]})
      if(cell) {
        cell.fillColor = new paper.Color(previewColor)
      }
    }
  }

  private registerEvents = () => {
    this.#editor.onchange = this.updatePreview
    this.#editor.onsubmit = this.submit
  }

}

export const editor = new Editor()
