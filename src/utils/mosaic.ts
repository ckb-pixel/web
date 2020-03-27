import paper from 'paper/dist/paper-core'
import { SIZE, LENGTH, BORDER_COLOR } from './const'
import { editor } from './Editor'
import { data } from './Data'

export interface Sample {
  coordinates: [number, number] //[x,y]
  color: [number, number, number] //[r,g,b]
}

const isPointInCell = (point: paper.Point, cell: paper.Path.Rectangle) => {
  const { x, y } = cell.position
  return x - SIZE / 2 <= point.x && x + SIZE / 2 > point.x && y - SIZE / 2 < point.y && y + SIZE / 2 > point.y
}

const renderCell = (sample: Sample) => {
  const cell = new paper.Path.Rectangle(new paper.Point(sample.coordinates), new paper.Size(SIZE, SIZE))
  cell.fillColor = new paper.Color(`rgb(${sample.color.join(',')})`)
  cell.strokeColor = new paper.Color(BORDER_COLOR)
  data.cells.push(cell)
}

const mosaic = (samples: Sample[], canvas: HTMLCanvasElement) => {
  canvas.width = LENGTH
  canvas.height = LENGTH
  paper.setup(canvas)

  paper.view.onClick = (e: paper.MouseEvent) => {
    data.cells.forEach((cell, i) => {
      if (isPointInCell(e.point, cell)) {
        cell.selected = !cell.selected
        if (cell.selected) {
          const { color } = samples[i]
          editor.selected(cell.position, {
            r: color[0],
            g: color[1],
            b: color[2],
          })
        } else {
          editor.unselected()
        }
      } else {
        cell.selected = false
      }
    })
  }

  samples.forEach(sample => {
    renderCell(sample)
  })
  canvas.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.12)'
}

export default mosaic
