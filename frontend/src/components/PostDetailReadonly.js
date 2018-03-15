import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { updatePost } from "../actions";
import Comment from './Comment'
import CommentList from './CommentList'
import LineSeparator from "./LineSeparator";
import * as CategoriesAPI from '../CategoriesAPI';
import { showPostDetail, deletePost } from "../actions";
import FaCaretUp from 'react-icons/lib/fa/caret-up'
import FaCaretDown from 'react-icons/lib/fa/caret-down'
import * as actions from "../actions";



class PostDetailReadonly extends Component {

    editPost = (postId) => {
        this.props.postDetail({postId: postId, edit: true})
    }

    deletePost = (postId) => {
        this.props.deletePost({postId: postId})
        CategoriesAPI.deletePost(postId).then((response) => {
            console.log("Deleting post from server for " + postId)
        })
        this.props.history.push('/')
    }

    upVote = (postId) => {
        this.props.voteUp({postId: postId, posts: this.props.posts })
        CategoriesAPI.postVote(postId, {option: "upVote"}).then((response) => {
            console.log("Called server for upVotePost for " + postId)
        })
    }

    downVote = (postId) => {
        this.props.voteDown({postId: postId, posts: this.props.posts })
        CategoriesAPI.postVote(postId, {option: "downVote"}).then((response) => {
            console.log("Called server for downVotePost for " + postId)
        })
    }


    render() {
        const { posts, selectedPostId } = this.props

        let selectedPost = {}
        if (posts && selectedPostId && posts.byId[selectedPostId] && !posts.byId[selectedPostId].deleted ) {
            selectedPost = posts.byId[selectedPostId]
        }

        return (
        <table>
            <tbody>
            <tr>
                <td>&nbsp;</td>
            </tr>
            <tr className="showPostTitle">
                <td>
                    <span className="showPostTitle">{selectedPost.title}</span>
                    <span className="showAuthor">({selectedPost.author})</span>
                </td>
                <td></td>
            </tr>
            <tr className="showSubtext">
                <td className="showSubtext">
                    <span>{selectedPost.voteScore} votes | </span>
                    <span>{new Date(selectedPost.timestamp).toDateString()} {new Date(selectedPost.timestamp).toLocaleTimeString()} |</span>
                    <span>{selectedPost.commentCount} comments | </span>
                    <span onClick={() => this.upVote(selectedPostId)}>Vote Up <FaCaretUp size="14"/> | </span>
                    <span onClick={() => this.downVote(selectedPostId)}>Vote Down <FaCaretDown size="14"/> | </span>
                    <span>
                          <Link to={'/' + selectedPost.category + '/' + selectedPostId}>
                            <span onClick={() => this.editPost(selectedPostId)}>Edit |</span>
                          </Link>
                     </span>
                    <span><button onClick={() => this.deletePost(selectedPostId)}>Delete</button></span>
                </td>
            </tr>
            <tr className="bodyContainer">
                <td>
                    <p className="showPostBody">{selectedPost.body}</p>
                </td>
            </tr>
            </tbody>
            <Comment/>
            <LineSeparator/>
            <CommentList/>
        </table>
       )
    }

}

function mapStateToProps( state ) {
    return {
        posts: state.posts.posts,
        selectedPostId: state.posts.selectedPostId,
        comments: state.posts.comments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        voteUp: (data) => dispatch(actions.upVotePost(data)),
        voteDown: (data) => dispatch(actions.downVotePost(data)),
        updatePost: (data) => dispatch(updatePost(data)),
        postDetail: (data) => dispatch(showPostDetail(data)),
        deletePost: (data) => dispatch(deletePost(data))
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(PostDetailReadonly)