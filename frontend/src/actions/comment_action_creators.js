import * as action_types from "./types";

export function addComment({postId, comment} )  {
    return {
        type: action_types.ADD_COMMENT,
        postId,
        comment
    }
}

export function updateComment( {commentId, updatedComment }) {
    return {
        type: action_types.UPDATE_COMMENT,
        commentId,
        updatedComment
    }
}

export function deleteComment( {postId, commentId} ) {
    return {
        type: action_types.DELETE_COMMENT,
        postId,
        commentId
    }
}

export function upVoteComment( commentId ) {
    return {
        type: action_types.UP_VOTE_COMMENT,
        commentId
    }

}

export function downVoteComment( commentId ) {
    return {
        type: action_types.DOWN_VOTE_COMMENT,
        commentId
    }

}

export function addCommentsToStore(comments) {
    return {
        type: action_types.ADD_COMMENTS_TO_STORE,
        comments
    }
}