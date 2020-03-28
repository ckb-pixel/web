import axios, { AxiosInstance } from 'axios'
import { WS_URL, WS_PREFIX, UDT_ORIGIN, SERVER_URL, PIXEL_CELLS_PATH, SNAPSHOTS_PATH, LIVE_CELLS_PATH, IPO_PATH } from './const'
import { data } from './Data'
import { cellToSample, recordToSample } from './transformers'

// target: scriptToHash(lock),
// tx: rawTx,
// config: {index: 1, length: rawTx.witnesses.length-1}
export type SignObj = {
  target: string // scriptToHash(lock)
  tx: object, // rawTx
  config: {
    index: number, // 1
    length: number // rawTx.witnesses.length - 1
  }
}

export default class Client {
  #ws: WebSocket|undefined = undefined
  #server: AxiosInstance
  constructor(){
    this.#server = axios.create({
      baseURL: SERVER_URL,
    })

    const accountElm = document.querySelector('#account')
    accountElm?.addEventListener('click', () => {
      this.getAccounts()
    })
  }

  get server (){
    return this.#server
  }

  get ws() {
    return this.#ws
  }

  public getLiveCells = (address: string, amount: string) => {
    return this.#server.get(`${LIVE_CELLS_PATH}${address}?need_capacity=${amount}`)
  }

  public getSnapshots = () => {
    return this.#server.get(SNAPSHOTS_PATH)
    .then(res => {
      if (res?.data?.data?.length) {
        const recordingList = res.data.data
        return recordingList.map((recording: any) => {
          return recordToSample(recording)
        })
      } else {
        return []
      }
    }).catch(err => {
      console.error(err)
      return []
    })
  }

  public getCurrentPixels = () => {
    return this.#server.get(PIXEL_CELLS_PATH)
    .then(res => {
      if (res?.data?.data?.length) {
        const cells = res.data.data
        return cells.map(cellToSample)
      } else {
        return []
      }
    }).then(samples => {
      data.update(samples)
    })
  }

  public getIpoInfo = () => {
    return this.#server.get(IPO_PATH).then(res => res.data.data?.[0])
  }

  public getAccounts = () => {
    const msg = `42/keyper,["api", {"data": {"origin": "${UDT_ORIGIN}", "payload": {"method": "ALL_LOCKS"}}, "type":"query"}]`
    this.send(msg)
  }
  public signTx = (signObj: SignObj) => {
    const signObjStr = JSON.stringify(signObj)
    const msg = `42/keyper,["api", {"data": {"origin": "${UDT_ORIGIN}", "payload": ${signObjStr}}, "type":"sign"}]`
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

  private handleMsg = async (msg:any[]) => {
    const [type, ...content] = msg
    if (type !== 'api') return
    console.log(content)
    if (content[0]?.query === "ALL_LOCKS") {
      const accounts = content[0].payload
      const account = accounts[0]
      if (account) {
        const { hash, meta: { name, script, deps }} = account
        const accountBtn = document.querySelector<HTMLDivElement>('#account')
        if (accountBtn) {
          accountBtn.innerText = `Connected`
          accountBtn.dataset.hash = hash
          accountBtn.dataset.lock = JSON.stringify(script)
        }
      } else {
        window.alert('No Account Found')
      }
    }
  }
}

export const client = new Client()
