export default async function get(path, complete) {
  fetch(import.meta.env.VITE_API_URL + path)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      complete(data)
    })
}
