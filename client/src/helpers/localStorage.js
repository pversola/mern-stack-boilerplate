// set in localstorage
export const setLocalStorage = (key, value) => {
  if (window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

// set in localstorage
export const getLocalStorage = (key) => {
  if (window !== 'undefined') {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key))
    }
  }
}

// remove from localstorage
export const removeLocalStorage = (key) => {
  if (window !== 'undefined') {
    localStorage.removeItem(key)
  }
}
