import axios, { AxiosInstance } from 'axios'
import { WS_URL, WS_PREFIX, UDT_ORIGIN, SERVER_URL } from './const'
import mock from './mock'

export type SignObj = any

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

  public getSnapshots = () => {
    // return this.#server.get('snapshots')
    return Promise.resolve(Array.from({length: 10}, () => mock))
  }

  public getCurrentPixels = () => {
    return this.#server.get('current-pixels')
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
      const accounts = content[0].payload
      const account = accounts[0]
      if (account) {
        const {hash, meta: {name, script, deps}}=account
        document.querySelector<HTMLDivElement>('#account')!.innerText = `Connected as ${hash}`
      } else {
        document.querySelector<HTMLDivElement>('#account')!.innerText = `No Account Found`
      }
    }
  }
}

export const client = new Client()
