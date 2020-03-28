import axios, { AxiosInstance } from 'axios'
import { WS_URL, WS_PREFIX, UDT_ORIGIN, SERVER_URL, PIXEL_CELLS_PATH } from './const'
import { data } from './Data'

export type SignObj = any

export default class Client {
  #ws: WebSocket|undefined = undefined
  #server: AxiosInstance
  constructor(){
    this.#server = axios.create({
      baseURL: SERVER_URL,
    })

    // const accountElm = document.querySelector('#account')
    // accountElm?.addEventListener('click', () => {
    //   this.getAccounts()
    // })
  }

  get server (){
    return this.#server
  }

  get ws() {
    return this.#ws
  }

  public getSnapshots = () => {
    return this.#server.get('snapshots')
  }

  public getCurrentPixels = () => {
    return this.#server.get(PIXEL_CELLS_PATH)
    .then(res => {
      if (res?.data?.data?.length) {
        const cells = res.data.data
        return cells.map((cell: any) => ({
          capacity: cell.attributes.capacity,
          lock: {
            args: cell.attributes.lock.args,
            codeHash: cell.attributes.lock.code_hash,
            hashType: cell.attributes.lock.hash_type,
          },
          outPoint:{
            index: cell.attributes.out_point.index,
            txHash: cell.attributes.out_point.tx_hash
          },
          coordinates: [
            16 * +`0x${cell.attributes.output_data.substr(2, 2)}`,
            16 * +`0x${cell.attributes.output_data.substr(4, 2)}`,
          ],
          color: [
            +`0x${cell.attributes.output_data.substr(6, 2)}`,
            +`0x${cell.attributes.output_data.substr(8, 2)}`,
            +`0x${cell.attributes.output_data.substr(10, 2)}`,
          ]
        }))
      } else {
        return []
      }
    }).then(samples => {
      data.update(samples)
    })
  }

  public getIpoInfo = () => {
    return this.#server.get('ipo')
  }

  public getAccounts = () => {
    const msg = `42/keyper,["api", {"data": {"origin": "${UDT_ORIGIN}", "payload": {"method": "ALL_LOCKS"}}, "type":"query"}]`
    this.send(msg)
  }

  public signTx = (signObj: SignObj) => {
    const msg = `42/keyper,["api", {"data": {"origin": "${UDT_ORIGIN}", "payload":${JSON.stringify(signObj)}}, "type":"sign"}]`
    this.#ws!.send(msg)
  }

  public send = async (msg: string) => {
    if (!this.isReady()){
      await this.connect()
    }
    this.#ws!.send(msg)
  }

  public connect = async () => {
    try {
      await new Promise((resolve, reject) => {
        this.#ws = new WebSocket(WS_URL)
        this.#ws.onopen = () => { resolve() }
        this.#ws.onerror = () => {
          window.alert('Failed to connect Keyper')
          reject()
        }
      })

      if (this.#ws) {
        this.registerEvents()
      }

      return
    }
    catch (err) {
      return console.error(err)
    }

  }

  public close = () => {
    this.isReady() && this.#ws?.close()
  }

  private isReady = () => {
    return this.#ws?.readyState === WebSocket.OPEN
  }

  private registerEvents = () => {
    this.#ws!.addEventListener('open', () => {
      console.info('Connected to Keyper')
    })

    this.#ws!.addEventListener('close', () => {
      console.info('Disconnected to Keyper')
      document.querySelector<HTMLDivElement>('#account')!.innerText = `Connected to Keyper`
    })

    this.#ws!.addEventListener('error', (event) => {
      console.error(event)
    })

    this.#ws!.addEventListener('message', (event) => {
      if (event.data.startsWith(WS_PREFIX)){
        const msg = event.data.slice(WS_PREFIX.length)
        try {
          const content:any[] = JSON.parse(msg)
          this.handleMsg(content)
        } catch (err) {
          console.error(err)
        }
      }
    })
  }

  private handleMsg = (msg:any[]) => {
    const [type, ...content] = msg
    if (type !== 'api') return
    if (content[0]?.query === "ALL_LOCKS") {
      // const accounts = content[0].payload
      // const account = accounts[0]
      // if (account) {
      //   const {hash, meta: {name, script, deps}}=account
      //   document.querySelector<HTMLDivElement>('#account')!.innerText = `Connected as ${hash}`
      // } else {
      //   document.querySelector<HTMLDivElement>('#account')!.innerText = `No Account Found`
      // }
    }
  }
}

export const client = new Client()
