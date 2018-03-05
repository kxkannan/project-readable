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
  posts: {
      byId: {},
      allIds: []
  }
}

function posts(state = initialPosts, action) {

    switch (action.type) {
        case ADD_POST:
            const { post } = action

            let newState = Object.assign({}, initialPosts)
            newState.posts.byId[Object.values(action)[0]] = action
            newState.posts.allIds.push([Object.values(action)[0]])

            return {
                ...state,
            }
        default:
            return state;
    }

}


function vote(state = [], action) {
    const { voteScore } = action

    switch (action.type) {
        case UP_VOTE_POST:
            return {
                ...state,
                [voteScore]:  voteScore + 1
            }
        case DOWN_VOTE_POST:
            return {
                ...state,
                [voteScore]:  voteScore - 1
            }
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
    posts
})