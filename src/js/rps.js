/**
 *
 * @param {string} playerChoice The choice that the player made. Rock, paper or scissors.
 * @param {number} windowId The id of the rps window.
 */
export function playGame (playerChoice, windowId) {
  const choices = ['Rock', 'Paper', 'Scissors']
  const computerChoice = choices[Math.floor(Math.random() * choices.length)]
  console.log(`Player chose: ${playerChoice}`)
  console.log(`Computer chose: ${computerChoice}`)

  const winnerText = document.getElementById(`winner-text-${windowId}`)
  const scoreText = document.getElementById(`score-text-${windowId}`)

  let scores = scoreText.textContent.split('<br>')
  scores = scores[0].split(':')
  let playerScore = parseInt(scores[1].split('computer'))
  let computerScore = parseInt(scores[2].trim())

  if (playerChoice === computerChoice) {
    winnerText.textContent = 'It is a tie!'
  } else if (
    (playerChoice === 'Rock' && computerChoice === 'Scissors') ||
    (playerChoice === 'Paper' && computerChoice === 'Rock') ||
    (playerChoice === 'Scissors' && computerChoice === 'Paper')
  ) {
    playerScore++
    winnerText.textContent = 'Player won!'
  } else {
    computerScore++
    winnerText.textContent = 'Computer won!'
  }
  scoreText.innerHTML = `Player: ${playerScore} <br> Computer: ${computerScore}`
}

/**
 *
 * @param {number} windowId The id of the rps window.
 * @returns {HTMLElement} Returns html code to be injected to the window,
 * aswell as eventlisteners for the icons within the window
 */
export function generateRPSContent (windowId) {
  const rpsContent = `
  <div class="rps-container">
    <div class="game-result">
      <p id="message-${windowId}">Click one of the icons to start! </p>
      <p id="winner-text-${windowId}"></p>
      <p id="score-text-${windowId}">Player: 0 <br> Computer: 0</p>
    </div>
    
    <div class="icons-container">
      <img id="rock-${windowId}" src="../imgs/rock.png" alt="Rock">
      <img id="paper-${windowId}" src="../imgs/paper.png" alt="Paper">
      <img id="scissors-${windowId}" src="../imgs/scissors.png" alt="Scissors">
    </div>  
  </div>
  `

  setTimeout(() => {
    const rockImage = document.getElementById(`rock-${windowId}`)
    const paperImage = document.getElementById(`paper-${windowId}`)
    const scissorsImage = document.getElementById(`scissors-${windowId}`)

    rockImage.addEventListener('click', () => playGame('Rock', windowId))
    paperImage.addEventListener('click', () => playGame('Paper', windowId))
    scissorsImage.addEventListener('click', () => playGame('Scissors', windowId))
  }, 0)

  return rpsContent
}
