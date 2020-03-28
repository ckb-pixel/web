export const LENGTH = 800
export const BLOCKS = 50
export const SIZE = LENGTH / BLOCKS
export const BORDER_COLOR = 'lightgrey'

export const WS_URL = 'ws://localhost:50001'
export const UDT_ORIGIN = 'PIXEL'

export const WS_PREFIX = '42/keyper,'
export const SERVER_URL = 'http://localhost:1000'

export const TokenCellDep: CKBComponents.CellDep = {
  outPoint: {
    txHash: '0x6495cede8d500e4309218ae50bbcadb8f722f24cc7572dd2274f5876cb603e4e',
    index: '0x0',
  },
  depType: 'depGroup',
}
export const PixelCellDep: CKBComponents.CellDep = {
  outPoint: {
    txHash: '0x57c2344716e4ac7ef23fe84d9ebe9bf6f51079347c8f7e7796eba1dc22903b28',
    index: '0x0',
  },
  depType: 'code',
}
