export function formRequest({ url = '/', method = 'POST', data }) {
  let request = new XMLHttpRequest()
  request.open(method, url)
  request.send(data)

  return new Promise((resolve, reject) => {
    request.onreadystatechange = () => {
      if (
        request.readyState === XMLHttpRequest.DONE &&
        request.status === 200
      ) {
        resolve({
          status: request.status,
          data: request.response
        })
      } else if (request.readyState === XMLHttpRequest.DONE) {
        reject({
          status: request.status,
          data: request.response
        })
      }
    }
  })
}
