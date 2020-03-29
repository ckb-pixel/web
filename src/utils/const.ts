export const LENGTH = 800
export const BLOCKS = 50
export const SIZE = LENGTH / BLOCKS
export const BORDER_COLOR = 'lightgrey'

export const WS_URL = 'ws://localhost:50001'
export const UDT_ORIGIN = 'PIXEL'

export const WS_PREFIX = '42/keyper,'
export const SERVER_URL = 'http://pixel.dev.nervos.tech/'
export const LIVE_CELLS_PATH = 'api/v1/live_cells/' // 'api/v1/live_cells/ckt1qyqd5eyygtdmwdr7ge736zw6z0ju6wsw7rssu8fcve?need_capacity=100000'
export const PIXEL_CELLS_PATH = 'api/v1/pixel_cells/' // http://pixel.dev.nervos.tech/api/v1/pixel_cells
export const SNAPSHOTS_PATH = '/api/v1/pixel_cell_recordings?page_size=10'
export const IPO_PATH = '/api/v1/ipo_events'
export const OFFICIAL_ADDRESS = 'ckt1qyqwmndf2yl6qvxwgvyw9yj95gkqytgygwasdjf6hm'
export const OFFICIAL_LOCK: CKBComponents.Script = {
  args: '0xedcda9513fa030ce4308e29245a22c022d0443bb',
  codeHash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
  hashType: 'type',
}
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

export const LockCellDep: CKBComponents.CellDep = {
  outPoint: {
    txHash: '0x42bbf1806f8baf8bd6b16c0682157dc717c3d021644aae108e03e452479199b1',
    index: '0x0',
  },
  depType: 'code',
}

export const PixelLock: CKBComponents.Script = {
  codeHash: '0xe959ac726354858d598c9ea1ceb5f617e409b1b0a4a3baa25aa08b6da7b95091',
  args: '',
  hashType: 'type'
}