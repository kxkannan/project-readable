import { combineReducers } from 'redux'

import {
    UP_VOTE_POST,
    DOWN_VOTE_POST,
    EDIT_POST,
    DELETE_POST,
    ADD_POST,
    POST_DETAIL,
    UPDATE_POST
} from '../actions'


const initialPosts = {
      byId: {},
      allIds: [],
      selectedPostId: null,
      edit: false
}

function posts(state = initialPosts, action) {

    let newState = Object.assign({}, state)

    switch (action.type) {
        case ADD_POST:
            action.posts.map( (post) => {
                newState.byId[post.id] = post
                newState.allIds.push(post.id)
                newState.selectedPostId = null
                newState.edit = false
                return newState
            })
            return newState

        case UP_VOTE_POST:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.postId]: {...state.byId[action.postId],
                                       voteScore: state.byId[action.postId].voteScore + 1
                                     }
                }
            }

        case DOWN_VOTE_POST:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.postId]: {...state.byId[action.postId],
                        voteScore: state.byId[action.postId].voteScore - 1
                    }
                }
            }

        case EDIT_POST:
            return {
                ...state,
            }

        case DELETE_POST:
            return {
                ...state,
            }

        case POST_DETAIL:
            console.log("POST_DETAIL action: " + JSON.stringify(action))
            return {
                ...state,
                selectedPostId: action.posts.postId,
                edit: action.posts.edit
            }

        case UPDATE_POST:
            console.log("UPDATE_POST post " + JSON.stringify(action))
            console.log("UPDATE_POST state: " + JSON.stringify(state))
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.postId]: {...state.byId[action.postId],
                                      body: action.body}
                }
            }

        default:
            return state;
    }

}


//function vote(state={}, action) {
//
//    let currentVoteScore = 0
//    let newState = Object.assign({}, state)
//
//    switch (action.type) {
//        case UP_VOTE_POST:
//            //currentVoteScore = state.byId[action.postId].voteScore
//            //newState.byId[action.postId].voteScore = currentVoteScore + 1
//            //return  newState
//            return {
//                ...state,
//                byId[action.postId].voteScore = byId[action.postId].voteScore + 1
//            }
//
//        case DOWN_VOTE_POST:
//            //currentVoteScore = state.byId[action.postId].voteScore
//            //newState.byId[action.postId].voteScore = currentVoteScore - 1
//            //return  newState
//            return {
//                ...state,
//                byId[action.postId].voteScore = byId[action.postId].voteScore - 1
//            }
//
//        case EDIT_POST:
//            return {
//                ...state,
//            }
//
//        case DELETE_POST:
//            return {
//                ...state,
//            }
//
//        default :
//            return state
//    }
//}

//function postDetail(state=initialPosts, action) {
//
//    switch (action.type) {
//        case POST_DETAIL:
//            return {
//                ...state,
//                selectedPostId: action.posts.postId
//            }
//        default:
//            return state
//    }
//
//}

export default combineReducers({
    posts,
    //vote,
    //postDetail
})