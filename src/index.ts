console.log('This is script')
import { editor } from './utils/Editor'

window.onload = () => {
  ;(window as any).editor = editor
}
