import { createSignal, onMount } from 'solid-js'
import './App.css'
import { InterfaceView } from './components/taskbar'

const [progressBar, setProgressBar]: any = createSignal([])
let activeIntervals: any = {}
const initProgressBar = (title: any, time: any) => {
  let i = 0
  const randomId = Math.floor(Math.random() * 1000)
  const tempProg = new Array(25).fill(false)
  setProgressBar([
    ...progressBar(),
    {
      id: randomId,
      title,
      percent: 0,
      prog: [],
    },
  ])
  const interval = setInterval(() => {
    tempProg[i] = true
    i++
    const percent = Math.round((i / tempProg.length) * 100)
    setProgressBar((prevProgress: any) =>
      prevProgress.map((progress: any) =>
        progress.id === randomId
          ? {
              ...progress,
              percent: percent,
              prog: tempProg,
            }
          : progress
      )
    )
  }, time / tempProg.length)
  activeIntervals[randomId] = interval
}
const cancelProgressBar = () => {
  for (const id in activeIntervals) {
    clearInterval(activeIntervals[id])
  }
  activeIntervals = {}
  setProgressBar([])
}

const App = () => {
  function receivedNuiMessage(event: any) {
    var item = event.data
    if (item.TaskBar) {
      if (item.TaskBar.display) {
        initProgressBar(item.TaskBar.label, item.TaskBar.duration)
      } else {
        cancelProgressBar()
      }
    }
    if (item.runProgress === true) {
      initProgressBar(item.name, 2000)
    }
    if (item.runUpdate === true) {
      initProgressBar(item.name, item.Length)
    }
    if (item.closeFail === true) {
      cancelProgressBar()
    }
    if (item.closeProgress === true) {
      cancelProgressBar()
    }
  }
  onMount(() => {
    window.addEventListener('message', receivedNuiMessage)
  })
  return (
    <InterfaceView 
      progressBar={progressBar}
    />
  )
}

export default App
