const api = "http://localhost:4001"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': 'kk-react-nd',
    'Content-Type': 'application/json'
}

export const categories = () =>
  fetch(`${api}/categories`, { headers })
      .then(res => res.json())
      .then(data => data.categories)


export const posts = (category) =>
fetch(`${api}/${category}/posts`, { headers })
    .then((res) => {
        res.json()
    })

export const all_posts = () =>
fetch(`${api}/posts`, { headers })
    .then((res) => res.json() )

export const comments = (postId) =>
    fetch(`${api}/posts/` + postId + `/comments`, { headers })
        .then((res) => res.json() )

export const postVote = (postId, data) =>
    fetch(`${api}/posts/` + postId, {body: JSON.stringify(data),
                                     method: 'post',
                                     headers: headers })
        .then((res) => res.json())

export const addPost = (data) =>
    fetch(`${api}/posts`, {body: JSON.stringify(data),
                            method: 'post',
                            headers: headers })
        .then((res) => res.json())

export const getPost = (data) =>
    fetch(`${api}/posts`, {body: JSON.stringify(data),
        method: 'get',
        headers: headers })
        .then((res) => res.json())


export const editPost = (postId, data) =>
    fetch(`${api}/posts/` + postId, {body: JSON.stringify(data),
                                     method: 'put',
                                     headers: headers })
        .then((res) => res.json())

export const deletePost = (postId) =>
    fetch(`${api}/posts/` + postId, {headers: headers,
                                     method: 'DELETE'})
        .then( (res) => res.json())

export const addComment = (data) =>
    fetch(`${api}/comments`, {body: JSON.stringify(data),
        method: 'post',
        headers: headers })
        .then((res) => res.json())

export const commentVote = (commentId, data) =>
    fetch(`${api}/comments/` + commentId, {body: JSON.stringify(data),
        method: 'post',
        headers: headers })
        .then((res) => res.json())

export const deleteComment = (commentId) =>
    fetch(`${api}/comments/` + commentId, { method: 'delete',
                                            headers: headers })
        .then((res) => res.json())



