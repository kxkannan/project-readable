const api = "http://localhost:4001"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': 'kk-react-nd'
}

export const categories = () =>
  fetch(`${api}/categories`, { headers })
      .then(res => res.json())
      .then(data => data.categories)


export const posts = (category) =>
fetch(`${api}/${category}/posts`, { headers })
    .then((res) => {
        console.log(" response for api /:category/posts : " + category + " res : " + JSON.stringify(res))
        res.json()
    })

export const all_posts = () =>
fetch(`${api}/posts`, { headers })
    .then((res) => res.json() )