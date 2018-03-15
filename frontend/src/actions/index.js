import * as action_types from "./types";

export function upVotePost ({ postId }) {
    return {
        type: action_types.UP_VOTE_POST,
        postId
    }
}

export function downVotePost ({ postId }) {
    return {
        type: action_types.DOWN_VOTE_POST,
        postId
    }
}

export function editPost ( postId ) {
    return {
        type: action_types.EDIT_POST,
        postId
    }
}

export function deletePost ( {postId} ) {
    return {
        type: action_types.DELETE_POST,
        postId
    }
}

export function addPost(posts) {
    return {
        type: action_types.ADD_POST,
        posts
    }
}

export function showPostDetail(posts) {
    return {
        type: action_types.POST_DETAIL,
        posts
    }
}

export function updatePost({postId, title, body}) {
    return {
        type: action_types.UPDATE_POST,
        postId,
        title,
        body
    }
}

export function sortPosts( sortKey ) {
    return {
        type: action_types.SORT_POSTS,
        sortKey
    }
}




