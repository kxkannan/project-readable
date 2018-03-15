import { combineReducers } from 'redux'
import comments from './comments_reducer'

import * as action_types  from '../actions/types'

const initialPosts = {
    posts: {
        byId: {},
    },
    selectedPostId: null,
    edit: false,
    categories: [],
    comments: [],
    sortOrder: null
}

function posts(state = initialPosts, action) {

    console.log("posts reducer called")

    switch (action.type) {
        case action_types.ADD_POST:
            let newState = Object.assign({}, state)
            action.posts.map( (post) => {
                newState.posts.byId[post.id] = post
                newState.selectedPostId = state.selectedPostId
                newState.edit = state.edit
                newState.comments = state.comments
                newState.sortOrder =  null
                if (!newState.categories.includes(post.category)) {
                    newState.categories.push(post.category)
                }
                return newState
            })
            return newState

        case action_types.UP_VOTE_POST:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    byId: {
                        ...state.posts.byId,
                        [action.postId]: {
                            ...state.posts.byId[action.postId],
                            voteScore: state.posts.byId[action.postId].voteScore + 1
                        }
                    }
                }
            }

        case action_types.DOWN_VOTE_POST:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    byId: {
                        ...state.posts.byId,
                        [action.postId]: {
                            ...state.posts.byId[action.postId],
                            voteScore: state.posts.byId[action.postId].voteScore - 1
                        }
                    }
                }
            }

        case action_types.EDIT_POST:
            return {
                ...state,
            }

        case action_types.DELETE_POST:
            return {
                ...state,
                posts: {...state.posts,
                    byId: { ...state.posts.byId,
                           [action.postId]: { ...state.posts.byId[action.postId],
                                               deleted: true
                        }
                    }
                }
            }

        case action_types.POST_DETAIL:
            return {
                posts: {...state.posts},
                selectedPostId: action.posts.postId,
                edit: action.posts.edit,
                categories: state.categories,
                comments: state.comments,
                sortOrder: state.sortOrder
            }

        case action_types.UPDATE_POST:
            return {
                posts: {...state.posts,
                      byId: {...state.posts.byId,
                          [action.postId]: {...state.posts.byId[action.postId],
                                             title: action.title,
                                             body: action.body}
                      }
                },
                selectedPostId: state.selectedPostId,
                edit: state.edit,
                categories: state.categories,
                comments: state.comments,
                sortOrder: state.sortOrder
            }

        case action_types.SORT_POSTS:
            let sortOrder = state.sortOrder
            let postsById = {"byId": {}}
            let newPosts =  {}

            if (!sortOrder || sortOrder === "ASC") {
                newPosts = Object.keys(state.posts.byId).map((key) => {
                    return state.posts.byId[key]
                }).sort((a, b) => {
                    return action.sortKey.sortBy === "votes" ? (b.voteScore - a.voteScore) : (b.timestamp - a.timestamp)
                })
                sortOrder = "DESC"
            }
            else {
                newPosts = Object.keys(state.posts.byId).map((key) => {
                    return state.posts.byId[key] }).sort((a, b) => {
                    return action.sortKey.sortBy === "votes" ? (a.voteScore - b.voteScore) : (a.timestamp - b.timestamp)
                })
                sortOrder = "ASC"
            }

            newPosts.map ( (data) => {
                let key = data[Object.keys(data)[0]]
                return  postsById["byId"][key] = data
            } )

            return {
                ...state,
                sortOrder: sortOrder,
                posts: {...state.posts,
                    byId: postsById["byId"] }
            }


        default:
            return state;
    }

}


export default combineReducers({
    posts,
    comments
})