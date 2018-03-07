import { combineReducers } from 'redux'

import {
    UP_VOTE_POST,
    DOWN_VOTE_POST,
    EDIT_POST,
    DELETE_POST,
    ADD_POST,
} from '../actions'


//"id": "8xf0y6ziyjabvozdd253nd",
//    "timestamp": 1467166872634,
//    "title": "Udacity is the best place to learn React",
//    "body": "Everyone says so after all.",
//    "author": "thingtwo",
//    "category": "react",
//    "voteScore": 6,
//    "deleted": false,
//    "commentCount": 2

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

    console.log("reducer vote state: " + JSON.stringify(state))
    console.log("reducer vote: " + JSON.stringify(action))
    console.log("reducer vote postId: " + JSON.stringify(action.postId))
    if (state.byId[action.postId]) {
        console.log("voteScore " + JSON.stringify(state.byId[action.postId].voteScore))
    }

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