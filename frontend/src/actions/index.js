export const UP_VOTE_POST   = 'UP_VOTE_POST'
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST'
export const EDIT_POST      = 'EDIT_POST'
export const DELETE_POST    = 'DELETE_POST'
export const ADD_POST       = 'ADD_POST'

export function upVotePost ({ postId }) {
    return {
        type: UP_VOTE_POST,
        postId
    }
}

export function downVotePost ({ postId }) {
    return {
        type: DOWN_VOTE_POST,
        postId
    }
}

export function editPost ( postId ) {
    return {
        type: EDIT_POST,
        postId
    }
}

export function deletePost ( postId ) {
    return {
        type: DELETE_POST,
        postId
    }
}

export function addPost(posts) {
    console.log("addPost: " + JSON.stringify(posts))
    let retVal = {
        type: ADD_POST,
        posts
    }
    console.log("retVal from addPost: " + JSON.stringify(retVal))
    return retVal
}
