export const UP_VOTE_POST      = 'UP_VOTE_POST'
export const DOWN_VOTE_POST    = 'DOWN_VOTE_POST'
export const EDIT_POST         = 'EDIT_POST'
export const DELETE_POST       = 'DELETE_POST'
export const ADD_POST          = 'ADD_POST'
export const POST_DETAIL       = 'POST_DETAIL'
export const UPDATE_POST       = 'UPDATE_POST'
export const ADD_COMMENT       = 'ADD_COMMENT'
export const UPDATE_COMMENT    = 'UPDATE_COMMENT'
export const DELETE_COMMENT    = 'DELETE_COMMENT'
export const UP_VOTE_COMMENT   = 'UP_VOTE_COMMENT'
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT'
export const SORT_POSTS        = 'SORT_POST'

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

export function deletePost ( {postId} ) {
    return {
        type: DELETE_POST,
        postId
    }
}

export function addPost(posts) {
    return {
        type: ADD_POST,
        posts
    }
}

export function showPostDetail(posts) {
    return {
        type: POST_DETAIL,
        posts
    }
}

export function updatePost({postId, title, body}) {
    return {
        type: UPDATE_POST,
        postId,
        title,
        body
    }
}

export function addComment( {postId, comment} )  {
   return {
       type: ADD_COMMENT,
       postId,
       comment
   }
}

export function updateComment( {commentId, updatedComment }) {
    return {
        type: UPDATE_COMMENT,
        commentId,
        updatedComment
    }
}

export function deleteComment( {postId, commentId} ) {
    return {
        type: DELETE_COMMENT,
        postId,
        commentId
    }
}

export function upVoteComment( commentId ) {
    return {
        type: UP_VOTE_COMMENT,
        commentId
    }

}

export function downVoteComment( commentId ) {
    return {
        type: DOWN_VOTE_COMMENT,
        commentId
    }

}

export function sortPosts( sortKey ) {
    return {
        type: SORT_POSTS,
        sortKey
    }
}


