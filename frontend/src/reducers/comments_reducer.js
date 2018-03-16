import * as action_types from "../actions/types";

const initialComments = {
    comments: []
}

export default function comments(state=initialComments, action) {

    switch (action.type) {
        case action_types.ADD_COMMENT:
            return {
                comments: {...state.comments,
                    byId: {
                        ...state.comments.byId,
                        [action.comment.id]: action.comment
                    }
                }
            }

        case action_types.ADD_COMMENTS_TO_STORE:
            let newComments = {"byId": {}}
            action.comments.map( comment => {
                return (newComments.byId[comment.id] = comment)
            })

            return{
                ...state,
                comments: newComments
            }

        case action_types.UPDATE_COMMENT:
            return {
                ...state,
                comments: {...state.comments,
                    byId: {
                        ...state.comments.byId,
                        [action.commentId]: {...state.comments.byId[action.commentId],
                            comment: action.updatedComment}
                    }}
            }

        case action_types.DELETE_COMMENT:
            return {
                ...state,
                comments: { ...state.comments,
                    byId: {...state.comments.byId,
                        [action.commentId]: {...state.comments.byId[action.commentId],
                            deleted: true
                        }
                    }
                }
            }

        case action_types.UP_VOTE_COMMENT:
            return {
                ...state,
                comments: {...state.comments,
                    byId: {
                        ...state.comments.byId,
                        [action.commentId]: {...state.comments.byId[action.commentId],
                            voteScore: state.comments.byId[action.commentId].voteScore + 1
                        }
                    }}
            }

        case action_types.DOWN_VOTE_COMMENT:
            return {
                ...state,
                comments: {...state.comments,
                    byId: {
                        ...state.comments.byId,
                        [action.commentId]: {...state.comments.byId[action.commentId],
                            voteScore: state.comments.byId[action.commentId].voteScore - 1
                        }
                    }}
            }

        default:
            return state
    }
}

