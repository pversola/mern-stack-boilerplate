import cookie from 'js-cookie'

// set in cookie
export const setCookie = (key, value) => {
  if (window !== 'undefined') {
    cookie.set(key, value, {
      expires: 1
    })
  }
}

// remove from cookie
export const removeCookie = (key, value) => {
  if (window !== 'undefined') {
    cookie.remove(key, {
      expires: 1
    })
  }
}

// get from cookie such as stored token
// will be useful when  we need to make request to server with token
export const getCookie = (key) => {
  if (window !== 'undefined') {
    return cookie.get(key)
  }
}
