import { combineReducers } from 'redux'

import {
    UP_VOTE_POST,
    DOWN_VOTE_POST,
    EDIT_POST,
    DELETE_POST,
    ADD_POST,
    POST_DETAIL,
    UPDATE_POST,
    ADD_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT,
    UP_VOTE_COMMENT,
    DOWN_VOTE_COMMENT,
    SORT_POSTS
} from '../actions'


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

    switch (action.type) {
        case ADD_POST:
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

        case UP_VOTE_POST:
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

        case DOWN_VOTE_POST:
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

        case EDIT_POST:
            return {
                ...state,
            }

        case DELETE_POST:
            console.log("DELETE_POST state: " + JSON.stringify(state))
            console.log("DELETE_POST action: " + JSON.stringify(action))
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

        case POST_DETAIL:
            return {
                posts: {...state.posts},
                selectedPostId: action.posts.postId,
                edit: action.posts.edit,
                categories: state.categories,
                comments: state.comments,
                sortOrder: state.sortOrder
            }

        case UPDATE_POST:
            console.log("UPDAT_POST action: " + JSON.stringify(action))
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

        case ADD_COMMENT:
            return {
                posts: {...state.posts,
                       byId: {
                           ...state.posts.byId,
                           [action.postId]: {...state.posts.byId[action.postId],
                                             commentCount: state.posts.byId[action.postId].commentCount + 1
                                            }
                       }
                },
                selectedPostId: state.selectedPostId,
                edit: state.edit,
                categories: state.categories,
                comments: {...state.comments,
                           byId: {
                               ...state.comments.byId,
                               [action.comment.id]: action.comment
                           }
                }
            }

        case UPDATE_COMMENT:
            return {
               ...state,
               comments: {...state.comments,
                          byId: {
                              ...state.comments.byId,
                              [action.commentId]: {...state.comments.byId[action.commentId],
                                                   comment: action.updatedComment}
                          }}
            }

        case DELETE_COMMENT:
            console.log("DELETE_COMMENT state comments.byId: " + JSON.stringify(state.comments.byId))
            console.log("DELETE_COMMENT action: " + JSON.stringify(action))
//            let newComments =  {}
 //           Object.keys(state.comments.byId).filter( (commentId) => {
  //              return ( commentId !== action.commentId ) ?
   //                 newComments[commentId] = state.comments.byId[commentId] : null
    //        })

     //       console.log("newComments: " + JSON.stringify(newComments))



            return {
                ...state,
                posts: {
                    ...state.posts,
                    byId: {
                        ...state.posts.byId,
                        [action.postId]: {
                                            ...state.posts.byId[action.postId],
                                            commentCount: state.posts.byId[action.postId].commentCount - 1,
                                         }
                    }
                },
                comments: { ...state.comments,
                            byId: {...state.comments.byId,
                                   [action.commentId]: {...state.comments.byId[action.commentId],
                                                         deleted: true
                                                       }
                            }
                }
            }

        case UP_VOTE_COMMENT:
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

        case DOWN_VOTE_COMMENT:
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

        case SORT_POSTS:
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
                                            console.log("key: " + key + "  inner data: " + JSON.stringify(data))
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
    posts
})