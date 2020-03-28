import Tranaction from './Transaction'
import { Coordinates, Color } from './Editor'
import { client } from './client'

export interface Pixel {
  outPoint: CKBComponents.OutPoint
  coordinates: Coordinates
  color: Color
  capacity: CKBComponents.Capacity
}
export default async (pixel: Pixel) => {
  const tx = new Tranaction()
  tx.hash()
  console.log(tx.current)
}
