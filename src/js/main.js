import { generateRPSContent } from './rps.js'
import { generateChatContent, startChat } from './chat.js'
import { generateMemoryContent, startMemory } from './memory.js'

let windowId = 0

/**
 *
 * @param {HTMLElement} windowElement The window element to make draggable.
 */
function makeWindowDraggable (windowElement) {
  let isDragging = false
  let offsetX
  let offsetY

  windowElement.addEventListener('mousedown', function (e) {
    isDragging = true
    offsetX = e.clientX - windowElement.getBoundingClientRect().left
    offsetY = e.clientY - windowElement.getBoundingClientRect().top

    const existingWindows = document.querySelectorAll('.custom-window')
    const maxZIndex = Math.max(...Array.from(existingWindows).map((w) => parseInt(w.style.zIndex) || 0))
    windowElement.style.zIndex = maxZIndex + 1
    document.addEventListener('mousemove', mousemoveHandler)
    document.addEventListener('mouseup', mouseupHandler)
  })

  /**
   *
   * @param {Event} e Mouse coordinates.
   */
  function mousemoveHandler (e) {
    if (isDragging) {
      const x = e.clientX - offsetX
      const y = e.clientY - offsetY
      windowElement.style.left = x + 'px'
      windowElement.style.top = y + 'px'
    }
  }

  /**
   * Handles mouse.
   */
  function mouseupHandler () {
    isDragging = false
    document.removeEventListener('mousemove', mousemoveHandler)
    document.removeEventListener('mouseup', mouseupHandler)
  }
}

/**
 *
 * @param {string} title The title of the newly created window.
 */
function createCustomWindow (title) {
  windowId++
  const newWindow = document.createElement('div')
  newWindow.className = `custom-window custom-window-${windowId}`
  newWindow.id = windowId
  const windowTitle = document.createElement('div')
  windowTitle.className = 'window-title'
  windowTitle.textContent = title

  const closeButton = document.createElement('button')
  closeButton.className = 'close-button'
  closeButton.textContent = 'X'
  closeButton.addEventListener('click', function () {
    newWindow.parentNode.removeChild(newWindow)
    console.log('CLOSED')
  })

  windowTitle.appendChild(closeButton)
  newWindow.appendChild(windowTitle)

  const contentContainer = document.createElement('div')
  contentContainer.className = 'content-container'

  if (title.toLowerCase() === 'rps') {
    const rpsCSS = document.createElement('link')
    rpsCSS.rel = 'stylesheet'
    rpsCSS.href = 'css/rps.css'
    document.head.appendChild(rpsCSS)
    contentContainer.innerHTML += generateRPSContent(newWindow.id)
  } else if (title.toLowerCase() === 'chat') {
    const chatCSS = document.createElement('link')
    chatCSS.rel = 'stylesheet'
    chatCSS.href = 'css/chat.css'
    document.head.appendChild(chatCSS)
    contentContainer.innerHTML += generateChatContent(newWindow.id)
  } else if (title.toLowerCase() === 'memory') {
    const memoryCSS = document.createElement('link')
    memoryCSS.rel = 'stylesheet'
    memoryCSS.href = 'css/memory.css'
    document.head.appendChild(memoryCSS)
    contentContainer.innerHTML += generateMemoryContent(newWindow.id)
  }

  newWindow.appendChild(contentContainer)
  makeWindowDraggable(newWindow)
  const existingWindows = document.querySelectorAll('.custom-window')
  const maxZIndex = Math.max(...Array.from(existingWindows).map((w) => parseInt(w.style.zIndex) || 0))
  newWindow.style.zIndex = maxZIndex + 1
  const distanceBetweenWindows = 15
  let offsetX, offsetY

  if (existingWindows.length > 0) {
    const lastWindow = existingWindows[existingWindows.length - 1]
    const lastOffsetX = parseInt(lastWindow.style.left)
    const lastOffsetY = parseInt(lastWindow.style.top)
    offsetX = lastOffsetX + distanceBetweenWindows
    offsetY = lastOffsetY + distanceBetweenWindows
  } else {
    offsetX = 30
    offsetY = 30
  }

  newWindow.style.left = offsetX + 'px'
  newWindow.style.top = offsetY + 'px'
  document.getElementById('desktop').appendChild(newWindow)
}

const windowBar = document.querySelector('.window-bar')
const icons = windowBar.querySelectorAll('.window-bar div')

/**
 *
 * @param {Event} event Gets the title of the clicked icon.
 */
function iconClickHandler (event) {
  const clickedIconTitle = event.currentTarget.getAttribute('title')
  if (clickedIconTitle.toLowerCase() === 'chat') {
    createCustomWindow(clickedIconTitle)
    startChat(windowId)
  } else if (clickedIconTitle.toLowerCase() === 'rps') {
    createCustomWindow(clickedIconTitle)
  } else if (clickedIconTitle.toLowerCase() === 'memory') {
    createCustomWindow(clickedIconTitle)
    startMemory(windowId)
  }
}

icons.forEach(function (icon) {
  icon.addEventListener('click', iconClickHandler)
})
