// Shaper functions

// Add whitespace before and after each item
const _alignCenter = (items) => {
  const maxWidth = Math.max(...items.map((i) => i.length))
  return items.map((item) => [
    Array(Math.floor((maxWidth - item.length) / 2)).join(' '),
    item,
    Array(Math.ceil((maxWidth - item.length) / 2)).join(' '),
  ].join('')).join("\n")
}

// Add whitespace before each item
const _alignRight = (items) => {
  const maxWidth = Math.max(...items.map((i) => i.length))
  return items.map((item) => [
    Array(Math.floor(maxWidth - item.length) + 1).join(' '),
    item,
  ].join('')).join("\n")
}

// Add whitespace after each item
const _alignLeft = (items) => {
  const maxWidth = Math.max(...items.map((i) => i.length))
  return items.map((item) => [
    item,
    Array(Math.floor(maxWidth - item.length) + 1).join(' '),
  ].join('')).join("\n")
}

// Sort from shortest to longest word
const _pyramidSort = (items, inverse) => {
  const sortFn = inverse
    ? (x, y) =>  x.length < y.length ? 1 : -1
    : (x, y) =>  x.length > y.length ? 1 : -1
  items.sort(sortFn)
  return items
}

// Sort from longest to shortest word, starting from center and moving out
const _diamondSort = (items, inverse) => {
  const sortFn = inverse
    ? (x, y) =>  x.length < y.length ? 1 : -1
    : (x, y) =>  x.length > y.length ? 1 : -1
  const sortedItems = items.sort(sortFn)
  const result = Array(items.length)
  sortedItems.forEach((item, i) => {
    if (i % 2 === 0) {
      result[i / 2] = item
    } else {
      result[items.length - ((i + 1) / 2)] = item
    }
  })
  return result
}

// Shaper functions
const arrowUp = (items) => _alignCenter(_pyramidSort(items))
const arrowDown = (items) => _alignCenter(_pyramidSort(items, true))
const arrowRight = (items) => _alignLeft(_diamondSort(items))
const arrowLeft = (items) => _alignRight(_diamondSort(items))
const bottomLeft = (items) => _alignLeft(_pyramidSort(items))
const bottomRight = (items) => _alignRight(_pyramidSort(items))
const topLeft = (items) => _alignLeft(_pyramidSort(items, true))
const topRight = (items) => _alignRight(_pyramidSort(items, true))
const diamond = (items) => _alignCenter(_diamondSort(items))
const hourglass = (items) => _alignCenter(_diamondSort(items, true))
const leftConcave = (items) => _alignLeft(_diamondSort(items, true))
const rightConcave = (items) => _alignRight(_diamondSort(items, true))

const SHAPE_FUNCTION_INDEX = {
  'arrow-up': arrowUp,
  'arrow-down': arrowDown,
  'arrow-right': arrowRight,
  'arrow-left': arrowLeft,
  'bottom-right': bottomRight,
  'bottom-left': bottomLeft,
  'top-left': topLeft,
  'top-right': topRight,
  'diamond': diamond,
  'hourglass': hourglass,
  'left-concave': leftConcave,
  'right-concave': rightConcave,
}

// Use this to look up shaper functions
const getShaper = (shape) => SHAPE_FUNCTION_INDEX[shape]