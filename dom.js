// DOM v1.0.0
const DOM = {}
DOM.dataset_obj = {}
DOM.dataset_id = 0

// Select a single element
DOM.el = (query, root = document) => {
  return root.querySelector(query)
}

// Select an array of elements
DOM.els = (query, root = document) => {
  return Array.from(root.querySelectorAll(query))
}

// Select a single element or self
DOM.el_or_self = (query, root = document) => {
  let el = root.querySelector(query)

  if (!el) {
    if (root.classList.contains(DOM.clean_dot(query))) {
      el = root
    }
  }

  return el
}

// Select an array of elements or self
DOM.els_or_self = (query, root = document) => {
  let els = Array.from(root.querySelectorAll(query))

  if (els.length === 0) {
    if (root.classList.contains(DOM.clean_dot(query))) {
      els = [root]
    }
  }

  return els
}

// Clone element
DOM.clone = (el) => {
  return el.cloneNode(true)
}

// Clone element children
DOM.clone_children = (query) => {
  let items = []
  let children = Array.from(DOM.el(query).children)

  for (let c of children) {
    items.push(DOM.clone(c))
  }

  return items
}

// Data set manager
DOM.dataset = (el, value, setvalue) => {
  if (!el) {
    return
  }

  let id = el.dataset.dataset_id

  if (!id) {
    id = DOM.dataset_id
    DOM.dataset_id += 1
    el.dataset.dataset_id = id
    DOM.dataset_obj[id] = {}
  }

  if (setvalue !== undefined) {
    DOM.dataset_obj[id][value] = setvalue
  }
  else {
    return DOM.dataset_obj[id][value]
  }
}

// Create an html element
DOM.create = (type, classes = ``, id = ``) => {
  let el = document.createElement(type)

  if (classes) {
    let classlist = classes.split(` `).filter(x => x != ``)

    for (let cls of classlist) {
      el.classList.add(cls)
    }
  }

  if (id) {
    el.id = id
  }

  return el
}

// Add an event listener
DOM.ev = (element, event, callback, extra) => {
  element.addEventListener(event, callback, extra)
}

// Add multiple event listeners
DOM.evs = (element, events, callback, extra) => {
  for (let event of events) {
    element.addEventListener(event, callback, extra)
  }
}

// Like jQuery's nextAll
DOM.next_all = function* (e, selector) {
  while (e = e.nextElementSibling) {
    if (e.matches(selector)) {
      yield e;
    }
  }
}

// Get item index
DOM.index = (el) => {
  return Array.from(el.parentNode.children).indexOf(el)
}

// Check if it contains any of these classes
DOM.class = (el, classes) => {
  el = DOM.element(el)

  for (let cls of classes) {
    if (el.classList.contains(DOM.clean_dot(cls))) {
      return true
    }
  }

  return false
}

// Check if it contains any of these queries up the hierarchy
DOM.parent = (el, queries) => {
  el = DOM.element(el)

  for (let query of queries) {
    let parent = el.closest(query)

    if (parent) {
      return parent
    }
  }

  return undefined
}

// Remove dot from classes
DOM.clean_dot = (query) => {
  return query.replace(`.`, ``)
}

// Show an element
DOM.show = (el, num = 1) => {
  el = DOM.element(el)
  el.classList.remove(DOM.hidden(num))
}

// Hide an element
DOM.hide = (el, num = 1) => {
  el = DOM.element(el)
  el.classList.add(DOM.hidden(num))
}

// Get hidden class
DOM.hidden = (num = 1) => {
  let cls = `hidden`

  if (num > 1) {
    cls += `_${num}`
  }

  return cls
}

// Resolve the element
DOM.element = (el) => {
  if (typeof el === `string`) {
    return DOM.el(el)
  }

  return el
}