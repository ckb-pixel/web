import { rawTransactionToHash } from '@nervosnetwork/ckb-sdk-utils'
import { TokenCellDep, PixelCellDep } from './const'
export interface CkbTransaction {
  hash: string
  version: '0x0'
  cellDeps: CKBComponents.CellDep[]
  headerDeps: []
  inputs: CKBComponents.CellInput[]
  outputs: CKBComponents.CellOutput[]
  outputsData: string[]
  witnesses: CKBComponents.Witness[]
}

export interface TransactionParams {
  cellDeps?: CKBComponents.CellDep[]
  inputs?: CKBComponents.CellInput[]
  outputs?: CKBComponents.CellOutput[]
  outputsData?: string[]
}

export default class Transaction {
  #current: CkbTransaction = {
    hash: '',
    version: '0x0',
    cellDeps: [],
    headerDeps: [],
    inputs: [],
    outputs: [],
    outputsData: [],
    witnesses: []
  }

  constructor({cellDeps = [TokenCellDep, PixelCellDep], inputs, outputs, outputsData}: TransactionParams = {cellDeps: [TokenCellDep, PixelCellDep]}){
    if (cellDeps?.length) {
      this.#current.cellDeps = cellDeps
    }
    if (inputs?.length) {
      this.#current.inputs = inputs
    }
    if (outputs?.length) {
      this.#current.outputs = outputs
    }
    if (outputsData?.length) {
      this.#current.outputsData = outputsData
    }
  }

  get current(){
    return this.#current
  }
  public hash = () => {
    const hash = rawTransactionToHash(this.#current)
  }
}
