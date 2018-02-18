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
        res
    })

export const all_posts = () =>
fetch(`${api}/posts`, { headers })
    .then((res) => {
    console.log("api : " + JSON.stringify(api))
    console.log("all_posts response for api /posts : " +  " res : " + JSON.stringify(res))
       res
}).catch((err) => {
    console.log("all_posts error " + JSON.stringify(err));
})
