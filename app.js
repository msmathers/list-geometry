// DOM IDs for event bindings
const MENU_ID = 'shape-menu'
const INPUT_TEXTAREA_ID = 'input-textarea'
const OUTPUT_CONTAINER_ID = 'output-container'

// Currently selected shape
let SHAPE = 'diamond'

// Update the output. Read text from input, apply shaper. 
const syncInputOutput = (input, output) => {
  const items = input.value.trim().split("\n").map((i) => i.trim())
  const shaper = getShaper(SHAPE)
  output.innerHTML = shaper(items)
}

// When a user changes the input, update the output.
const bindInput = (input, output) => {
  input.addEventListener('input', () => syncInputOutput(input, output))
}

// When a user clicks on the shape menu, update current shape & output.
const bindMenu = (menu, input, output) => {
  Array.from(menu.children).forEach((shape) => {
    shape.addEventListener('click', () => {
      Array.from(menu.children).forEach((i) => {
        i.classList.remove('active')
      })
      shape.classList.add('active')
      SHAPE = shape.dataset.shapeType
      syncInputOutput(input, output)
    })
  })
}

// Initialize app
(function() {
  const input = document.getElementById(INPUT_TEXTAREA_ID)
  const output = document.getElementById(OUTPUT_CONTAINER_ID)
  const menu = document.getElementById(MENU_ID)
  bindMenu(menu, input, output)
  bindInput(input, output)
  syncInputOutput(input, output)
  input.focus()
})()