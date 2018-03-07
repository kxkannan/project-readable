import { combineReducers } from 'redux'

import {
    UP_VOTE_POST,
    DOWN_VOTE_POST,
    EDIT_POST,
    DELETE_POST,
    ADD_POST,
} from '../actions'


const initialPosts = {
      byId: {},
      allIds: []
}

function posts(state = initialPosts, action) {

    switch (action.type) {
        case ADD_POST:
            let newState = Object.assign({}, initialPosts)
            action.posts.map( (post) => {
                newState.byId[post.id] = post
                newState.allIds.push(post.id)
                return newState
            })
            return newState

        default:
            return state;
    }

}


function vote(state=initialPosts, action) {

    let currentVoteScore = 0
    let newState = Object.assign({}, state)

    switch (action.type) {
        case UP_VOTE_POST:
            currentVoteScore = state.byId[action.postId].voteScore
            newState.byId[action.postId].voteScore = currentVoteScore + 1
            return  newState

        case DOWN_VOTE_POST:
            currentVoteScore = state.byId[action.postId].voteScore
            newState.byId[action.postId].voteScore = currentVoteScore - 1
            return  newState

        case EDIT_POST:
            return {
                ...state,
            }

        case DELETE_POST:
            return {
                ...state,
            }

        default :
            return state
    }
}

export default combineReducers({
    posts,
    vote
})