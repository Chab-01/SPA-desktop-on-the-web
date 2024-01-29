/**
 *
 * @param {number} windowId Id of the memory window.
 */
export function startMemory (windowId) {
  let attempts = 0
  let guessOne = null
  let guessTwo = null

  const backSidePath = '../imgs/image0.png'
  const images4x4 = [
    { id: 0, path: '../imgs/image1.png' },
    { id: 1, path: '../imgs/image2.png' },
    { id: 2, path: '../imgs/image3.png' },
    { id: 3, path: '../imgs/image4.png' },
    { id: 4, path: '../imgs/image5.png' },
    { id: 5, path: '../imgs/image6.png' },
    { id: 6, path: '../imgs/image7.png' },
    { id: 7, path: '../imgs/image8.png' },
    { id: 8, path: '../imgs/image1.png' },
    { id: 9, path: '../imgs/image2.png' },
    { id: 10, path: '../imgs/image3.png' },
    { id: 11, path: '../imgs/image4.png' },
    { id: 12, path: '../imgs/image5.png' },
    { id: 13, path: '../imgs/image6.png' },
    { id: 14, path: '../imgs/image7.png' },
    { id: 15, path: '../imgs/image8.png' }
  ]

  const images3x4 = [
    { id: 0, path: '../imgs/image1.png' },
    { id: 1, path: '../imgs/image2.png' },
    { id: 2, path: '../imgs/image3.png' },
    { id: 3, path: '../imgs/image4.png' },
    { id: 4, path: '../imgs/image5.png' },
    { id: 5, path: '../imgs/image6.png' },
    { id: 8, path: '../imgs/image1.png' },
    { id: 9, path: '../imgs/image2.png' },
    { id: 10, path: '../imgs/image3.png' },
    { id: 11, path: '../imgs/image4.png' },
    { id: 12, path: '../imgs/image5.png' },
    { id: 13, path: '../imgs/image6.png' }
  ]

  const images2x4 = [
    { id: 0, path: '../imgs/image1.png' },
    { id: 1, path: '../imgs/image2.png' },
    { id: 2, path: '../imgs/image3.png' },
    { id: 3, path: '../imgs/image4.png' },
    { id: 8, path: '../imgs/image1.png' },
    { id: 9, path: '../imgs/image2.png' },
    { id: 10, path: '../imgs/image3.png' },
    { id: 11, path: '../imgs/image4.png' }
  ]

  const images2x2 = [
    { id: 0, path: '../imgs/image1.png' },
    { id: 1, path: '../imgs/image2.png' },
    { id: 8, path: '../imgs/image1.png' },
    { id: 9, path: '../imgs/image2.png' }
  ]

  const largeButton = document.querySelector(`.large-${windowId}`)
  const mediumButton = document.querySelector(`.medium-${windowId}`)
  const smallButton = document.querySelector(`.small-${windowId}`)
  const extraButton = document.querySelector(`.extra-${windowId}`)

  largeButton.addEventListener('click', function () {
    largeButtonPressed()
  })

  mediumButton.addEventListener('click', function () {
    mediumButtonPressed()
  })

  smallButton.addEventListener('click', function () {
    smallButtonPressed()
  })

  extraButton.addEventListener('click', function () {
    extraButtonPressed()
  })

  /**
   *
   * @param {HTMLElement} parentWindow The html element in which to add keyboard eventlistener.
   */
  function addKeyboardNavigationListener (parentWindow) {
    let position = 0
    let previouslySelected = null

    parentWindow.addEventListener('keydown', (e) => {
      const allCards = document.querySelectorAll(`.card-${windowId}`)
      if (e.key === 'ArrowRight') {
        position += 1
      } else if (e.key === 'ArrowLeft') {
        position -= 1
      } else if (e.key === 'ArrowUp') {
        position -= 4
      } else if (e.key === 'ArrowDown') {
        position += 4
      } else if (e.key === 'Enter' && previouslySelected) {
        console.log('ENTER')
      }
      if (position < 0) {
        position = 0
      } else if (position > allCards.length - 1) {
        position = allCards.length - 1
      }
      const selected = allCards[position]
      selected.focus()
      if (previouslySelected) {
        previouslySelected.classList.remove('selected')
      }

      selected.classList.add('selected')
      previouslySelected = selected
    })
  }

  /**
   *
   * @param {HTMLElement} image The image.
   * @param {HTMLElement} gridContainer The container that contains the grid.
   * @returns {HTMLElement} returns the image element.
   */
  function createImageElement (image, gridContainer) {
    const img = document.createElement('img')
    img.className = `card-${windowId}`
    img.src = backSidePath
    img.id = `id-${windowId}-${image.id}`
    img.style = 'width:65px; height:65px'
    img.alt = image.id
    img.tabIndex = 0
    gridContainer.appendChild(img)
    return img
  }

  /**
   *
   * @param {HTMLElement} img The image to add eventlistener to.
   * @param {HTMLElement} image The image object.
   * @param {HTMLElement} gridContainer Container that holds the grid and images.
   * @param {Array} images An array of images.
   */
  function addImageEventListeners (img, image, gridContainer, images) {
    img.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        img.src = image.path
        if (!guessOne) {
          guessOne = image
        } else if (!guessTwo && guessOne && guessOne.id !== image.id) {
          guessTwo = image
          attempts++
          setTimeout(function () {
            const img2Id = images.find((image) => image.id === guessOne.id).id
            const img2 = document.querySelector(`#id-${windowId}-${img2Id}`)
            if (guessOne.path === guessTwo.path) {
              console.log('MATCH!')
              gridContainer.removeChild(img)
              gridContainer.removeChild(img2)
              if (!gridContainer.hasChildNodes()) {
                gridContainer.innerHTML = `Number of attempts: ${attempts}`
              }
            } else {
              img.src = backSidePath
              img2.src = backSidePath
              console.log('NOT MATCH')
            }
            guessOne = null
            guessTwo = null
          }, 1000)
        }
      }
    })

    img.addEventListener('click', function () {
      img.src = image.path
      if (!guessOne) {
        guessOne = image
      } else if (!guessTwo && guessOne && guessOne.id !== image.id) {
        guessTwo = image
        attempts++
        setTimeout(function () {
          const img2Id = images.find((image) => image.id === guessOne.id).id
          const img2 = document.querySelector(`#id-${windowId}-${img2Id}`)
          if (guessOne.path === guessTwo.path) {
            console.log('MATCH!')
            gridContainer.removeChild(img)
            gridContainer.removeChild(img2)
            if (!gridContainer.hasChildNodes()) {
              gridContainer.innerHTML = `Number of attempts: ${attempts}`
            }
          } else {
            img.src = backSidePath
            img2.src = backSidePath
            console.log('NOT MATCH')
          }
          guessOne = null
          guessTwo = null
        }, 1000)
      }
    })
  }

  /**
   * Generates the content for the 4x4 game.
   */
  function largeButtonPressed () {
    const images = shuffleArray([...images4x4])
    const gameContainer = document.querySelector(`#game-container-${windowId}`)
    const gridContainer = createGridContainer('memory_4x4')
    gameContainer.appendChild(gridContainer)
    const parentWindow = document.querySelector(`.custom-window-${windowId}`)
    parentWindow.tabIndex = 0

    addKeyboardNavigationListener(parentWindow)

    images.forEach((image) => {
      const img = createImageElement(image, gridContainer)
      addImageEventListeners(img, image, gridContainer, images)
    })
  }

  /**
   * Generates the content for the 3x4 game.
   */
  function extraButtonPressed () {
    const images = shuffleArray([...images3x4])
    const gameContainer = document.querySelector(`#game-container-${windowId}`)
    const gridContainer = createGridContainer('memory_4x4')
    gameContainer.appendChild(gridContainer)
    const parentWindow = document.querySelector(`.custom-window-${windowId}`)
    parentWindow.tabIndex = 0

    addKeyboardNavigationListener(parentWindow)

    images.forEach((image) => {
      const img = createImageElement(image, gridContainer)
      addImageEventListeners(img, image, gridContainer, images)
    })
  }  

  /**
   * Generates the content for the 2x4 game.
   */
  function mediumButtonPressed () {
    const images = shuffleArray([...images2x4])
    const gameContainer = document.querySelector(`#game-container-${windowId}`)
    const gridContainer = createGridContainer('memory_2x4')
    gameContainer.appendChild(gridContainer)
    const parentWindow = document.querySelector(`.custom-window-${windowId}`)
    parentWindow.tabIndex = 0

    addKeyboardNavigationListener(parentWindow)

    for (let i = 0; i < images.length; i++) {
      const img = createImageElement(images[i], gridContainer)
      addImageEventListeners(img, images[i], gridContainer, images)
    }
  }

  /**
   * Generates the content for the 2x2 game.
   */
  function smallButtonPressed () {
    const images = shuffleArray([...images2x2])
    const gameContainer = document.querySelector(`#game-container-${windowId}`)
    const gridContainer = createGridContainer('memory_2x2')
    gameContainer.appendChild(gridContainer)
    const parentWindow = document.querySelector(`.custom-window-${windowId}`)
    parentWindow.tabIndex = 0

    addKeyboardNavigationListener(parentWindow)

    for (let i = 0; i < images.length; i++) {
      const img = createImageElement(images[i], gridContainer)
      addImageEventListeners(img, images[i], gridContainer, images)
    }
  }

  /**
   *
   * @param {string} className Class name for the created grid.
   * @returns {HTMLElement} returns the gridcontainer element.
   */
  function createGridContainer (className) {
    const gridContainer = document.createElement('div')
    gridContainer.className = className
    return gridContainer
  }

  /**
   *
   * @param {Array} array Shuffles an array randomly.
   * @returns {Array} Retunrs a shuffled array.
   */
  function shuffleArray (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }
}

/**
 *
 * @param {number} windowId The id for the memory window.
 * @returns {HTMLElement} Returns html code to be injected in the custom window.
 */
export function generateMemoryContent (windowId) {
  return `
    <div class='memory-container-${windowId}'>
      <div class='size-selector-${windowId}'>
        <button class='large-${windowId}'>4x4</button>
        <button class='extra-${windowId}'>3x4</button>
        <button class='medium-${windowId}'>2x4</button>
        <button class='small-${windowId}'>2x2</button>
      </div>
      <div id='game-container-${windowId}'></div>
    </div>
  `
}
