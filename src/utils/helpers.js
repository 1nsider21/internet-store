export const shuffle = (array) => [...array].sort(() => 0.5 - Math.random())

export const buildUrl = (url, params) => {
  let urlWithParams = url

  Object.entries(params).forEach(([key, value], index) => {
    const sign = !index ? '?' : '&'
    urlWithParams += `${sign}${key}=${value}`
  })

  return urlWithParams
}

export const sumBy = (array) => array.reduce((acc, curr) => acc + curr, 0)
