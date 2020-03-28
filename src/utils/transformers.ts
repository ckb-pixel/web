import { SIZE } from './const'
export const cellToSample = (cell: any) => ({
  capacity: cell.attributes.capacity,
  lock: {
    args: cell.attributes.lock.args,
    codeHash: cell.attributes.lock.code_hash,
    hashType: cell.attributes.lock.hash_type,
  },
  type: {
    args: cell.attributes.type.args,
    codeHash: cell.attributes.type.code_hash,
    hashType: cell.attributes.type.hash_type,
  },
  outPoint: {
    index: cell.attributes.out_point.index,
    txHash: cell.attributes.out_point.tx_hash,
  },
  coordinates: [
    SIZE * +`0x${cell.attributes.output_data.substr(2, 2)}`,
    SIZE * +`0x${cell.attributes.output_data.substr(4, 2)}`,
  ],
  color: [
    +`0x${cell.attributes.output_data.substr(6, 2)}`,
    +`0x${cell.attributes.output_data.substr(8, 2)}`,
    +`0x${cell.attributes.output_data.substr(10, 2)}`,
  ],
})

export const recordToSample = (record: any) => {
  if (record?.attributes?.pixel_cells) {
    const cells = record.attributes.pixel_cells
    return cells.map((cell: any) => ({
      coordinates: [16 * +`0x${cell.substr(2, 2)}`, 16 * +`0x${cell.substr(4, 2)}`],
      color: [+`0x${cell.substr(6, 2)}`, +`0x${cell.substr(8, 2)}`, +`0x${cell.substr(10, 2)}`],
    }))
  } else {
    return []
  }
}
