export default function fetchData(page: number, tags: string): any {
  return fetch(`http://localhost:4000?tags=${tags}`, { // in order to resolve cors issue, I build a service run on port 4000
  })
  .then(response => {
    console.log(response)
    return response.json()
  })
  // .then(data => console.log('daa',data))
  .catch(error => {
    console.log(error)
    return {
      error: 'Fetch data fail'
    }
  })
}
