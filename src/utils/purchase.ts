import { OFFICIAL_LOCK, SIZE } from './const'
import { bech32Address, scriptToHash } from '@nervosnetwork/ckb-sdk-utils'
import Tranaction from './Transaction'
import { Coordinates, Color } from './Editor'
import { client, SignObj } from './Client'
import { data } from './Data'
import BN from 'bn.js'

export interface Pixel {
  coordinates: Coordinates
  color: Color
}

const intToHex = (int: number | string) => {
  let str = new BN(int).toString(16)
  return '0x' + str
}
export default async (pixel: Pixel) => {
  const accountBtn = document.querySelector('#account') as HTMLDivElement
  if (!accountBtn?.dataset.lock) {
    window.alert('Keyper is not connected')
    return
  }

  try {
    const lock = JSON.parse(accountBtn.dataset.lock)
    const addr = bech32Address(lock.args)

    const sample = data.getSample((pixel.coordinates.x - 1) * 16, (pixel.coordinates.y - 1) * 16)
    if (!sample) {
      window.alert('Sample not found')
      return
    }

    const BASE = 10 ** 8
    const pixelAmount = new BN(sample.capacity).mul(new BN(6)).div(new BN(5))
    const fee = new BN(BASE)
    let interestAmount = new BN(sample.capacity).div(new BN(10))
    if (interestAmount.lt(new BN(61 * BASE))) {
      interestAmount = new BN(61 * BASE)
    }

    const amount = pixelAmount
      .mul(new BN(2))
      .add(fee)
      .add(interestAmount)

    const submitBtn = document.querySelector<HTMLButtonElement>('button[type=submit]')!
    submitBtn.innerText = 'Submitting'
    submitBtn.disabled = true

    const liveCellsRes = await client.getLiveCells(addr, amount.toString())

    if (typeof liveCellsRes.data === 'string') {
      window.alert(liveCellsRes.data)
      submitBtn.innerText = 'Submit'
      submitBtn.disabled = false
      return
    }

    const liveCellsData = liveCellsRes.data.data

    let liveCellCapacity = new BN(0)

    const liveCells = liveCellsData.map((d: any) => {
      liveCellCapacity = liveCellCapacity.add(new BN(d.attributes.capacity))
      return {
        previousOutput: {
          txHash: d.attributes.out_point.tx_hash,
          index: intToHex(d.attributes.out_point.index),
        },
        since: '0x0',
      }
    })

    const releasedPixelOutput: CKBComponents.CellOutput = {
      capacity: intToHex(pixelAmount),
      lock: sample.lock,
    }

    const newPixelOutput: CKBComponents.CellOutput = {
      capacity: intToHex(pixelAmount),
      lock,
      type: sample.type,
    }

    const interestOutput: CKBComponents.CellOutput = {
      capacity: intToHex(interestAmount),
      lock: OFFICIAL_LOCK,
    }

    const changeOutput: CKBComponents.CellOutput = {
      capacity: intToHex(
        liveCellCapacity
          .sub(pixelAmount.mul(new BN(2)))
          .sub(interestAmount)
          .sub(fee),
      ),
      lock: lock,
    }

    const newPixelOutputData: string = `0x${sample.coordinates
      .map(v =>
        intToHex(v / SIZE)
          .slice(2)
          .padStart(2, '0'),
      )
      .join('')}${pixel.color.r.toString(16).padStart(2, '0')}${pixel.color.g
      .toString(16)
      .padStart(2, '0')}${pixel.color.b.toString(16).padStart(2, '0')}`

    const tx = new Tranaction()
    tx.current.inputs = [
      {
        previousOutput: {
          txHash: sample.outPoint.txHash,
          index: intToHex(sample.outPoint.index),
        },
        since: '0x0',
      },
      ...liveCells,
    ]
    tx.current.outputs = [newPixelOutput, interestOutput, releasedPixelOutput, changeOutput]
    tx.current.outputsData = tx.current.outputs.map(() => '0x')
    tx.current.outputsData[0] = newPixelOutputData
    tx.current.witnesses = tx.current.inputs.map(() => '0x')
    tx.current.witnesses[1] = {
      lock: '',
      inputType: '',
      outputType: '',
    }
    const signObj: SignObj = {
      target: scriptToHash(lock),
      tx: tx.current,
      config: {
        index: 1,
        length: tx.current.witnesses.length - 1,
      },
    }
    client.signTx(signObj)

    window.alert('Please sign the transaction in Keyper')
    submitBtn.innerText = 'Submit'
    submitBtn.disabled = false
  } catch (err) {
    window.alert(err.message)
  }
}
