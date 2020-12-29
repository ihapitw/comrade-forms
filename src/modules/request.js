export function formRequest({ url = '/', method = 'POST', data }) {
  let request = new XMLHttpRequest()
  request.open(method, url)
  request.send(data)

  return new Promise((resolve, reject) => {
    request.onreadystatechange = () => {
      let response = null
      try {
        response = JSON.parse(request.response)
      } catch (err) {
        response = request.response
      }
      if (
        request.readyState === XMLHttpRequest.DONE &&
        request.status === 200
      ) {
        resolve({
          status: request.status,
          data: response
        })
      } else if (request.readyState === XMLHttpRequest.DONE) {
        reject({
          status: request.status,
          data: response
        })
      }
    }
  })
}
