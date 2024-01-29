/**
 *
 * @param {number} windowId The id of the chat window.
 */
export function startChat (windowId) {
  let userName = localStorage.getItem('userName')
  if (!userName) {
    userName = prompt('Please enter your username:')
    localStorage.setItem('userName', userName)
  }

  const address = 'wss://courselab.lnu.se/message-app/socket'
  const apiKey = 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
  const messages = []

  const socket = new WebSocket(address)

  const messageContainers = document.querySelectorAll(`.message-container-${windowId}`)
  const messageInputs = document.querySelectorAll('.message-input')
  const sendButtons = document.querySelectorAll('.send-button')

  messageContainers.forEach((container) => {
    container.style.flexGrow = '1'
    container.style.maxHeight = '300px'
    container.style.overflowY = 'auto'
  })

  socket.onmessage = function (event) {
    const message = JSON.parse(event.data)
    if (message.type === 'message') {
      messages.push(message)
      if (messages.length > 20) {
        messages.shift()
      }
      updateMessagesDisplay()
    }
  }

  for (let i = 0; i < sendButtons.length; i++) {
    sendButtons[i].addEventListener('click', function () {
      sendMessage(i)
    })

    messageInputs[i].addEventListener('keydown', function (event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        sendMessage(i)
      }
    })
  }

  /**
   *
   * @param {number} index The index of the message.
   */
  function sendMessage (index) {
    const message = messageInputs[index].value.trim()
    console.log('clicked send')
    if (message) {
      socket.send(
        JSON.stringify({
          type: 'message',
          data: message,
          username: userName,
          channel: 'webprogA3',
          key: apiKey
        })
      )
      messageInputs[index].value = ''
      updateMessagesDisplay()
    }
  }

  /**
   * Updates the display of messages and ensures the container stays scrollable and shows
   * which user sent.
   */
  function updateMessagesDisplay () {
    for (let i = 0; i < messageContainers.length; i++) {
      messageContainers[i].innerHTML = messages
        .map((msg) => {
          const isCurrentUser = msg.username === userName
          const backgroundColor = isCurrentUser ? 'blue' : 'green'
          const borderRadius = isCurrentUser ? '10px 0 10px 10px' : '0 10px 10px 10px'
          return `<p style="background-color: ${backgroundColor};
                          border-radius: ${borderRadius};
                          padding: 5px;
                          margin: 5px 0;
                          max-width: 90%; /* Set your desired max-width value */
                          overflow: hidden;
                          word-wrap: break-word;
                          "><b>${msg.username}:</b> ${msg.data}</p>`
        })
        .join('')
    }
  }
}

/**
 *
 * @param {number} windowId The id of the chat window.
 * @returns {HTMLElement} Returns html content to be injected in the custom window.
 */
export function generateChatContent (windowId) {
  const chatContent = `
    <div class='chat-container'>
      <div class='message-container-${windowId}'></div>
      <div class='text-area'>
        <textarea class='message-input' placeholder='Type your message...'></textarea>
        <button class='send-button'>Send</button>
      </div>
    </div>
  `
  return chatContent
}
